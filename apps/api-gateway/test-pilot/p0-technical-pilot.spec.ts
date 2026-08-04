import "reflect-metadata";

import { randomUUID } from "node:crypto";
import assert from "node:assert/strict";
import { test } from "node:test";

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "../src/app.module.js";
import { PrismaService } from "../src/database/prisma.service.js";

interface AuthResult {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

interface WalletResult {
  id: string;
  ledgerAccountId: string;
}

interface LedgerAccountResult {
  id: string;
}

interface TransferResult {
  id: string;
  amount: string;
  status: string;
}

interface BalanceResult {
  accountingBalance: string;
}

async function request<T>(
  baseUrl: string,
  path: string,
  options: RequestInit = {},
  expectedStatus = 200,
): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, options);
  const body = await response.text();
  assert.equal(response.status, expectedStatus, `${options.method ?? "GET"} ${path}: ${body}`);
  const payload: unknown = JSON.parse(body);
  return payload as T;
}

function jsonRequest(method: string, body: unknown, accessToken?: string): RequestInit {
  return {
    method,
    headers: {
      "content-type": "application/json",
      ...(accessToken === undefined ? {} : { authorization: `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(body),
  };
}

async function grantPermissions(
  prisma: PrismaService,
  userId: string,
  permissionCodes: readonly string[],
  suffix: string,
): Promise<void> {
  const role = await prisma.role.create({
    data: {
      code: `PILOT_${suffix}`,
      name: `Technical pilot ${suffix}`,
      description: "Ephemeral role for the isolated P0 technical pilot",
    },
  });
  for (const code of permissionCodes) {
    const permission = await prisma.permission.upsert({
      where: { code },
      create: { code, description: "Technical pilot permission" },
      update: {},
    });
    await prisma.rolePermission.create({ data: { roleId: role.id, permissionId: permission.id } });
  }
  await prisma.roleAssignment.create({
    data: {
      userId,
      roleId: role.id,
      scopeType: "GLOBAL",
      reason: "Isolated P0 technical pilot",
    },
  });
}

// The node:test runner owns and awaits the registered test lifecycle.
// eslint-disable-next-line @typescript-eslint/no-floating-promises
test("P0 technical pilot preserves access, idempotency and Ledger invariants", async () => {
  assert.equal(process.env.PILOT_ENVIRONMENT, "test");
  const databaseUrl = new URL(process.env.DATABASE_URL ?? "");
  assert.equal(databaseUrl.pathname, "/mansa_pilot");

  const application = await NestFactory.create(AppModule, { logger: false, abortOnError: false });
  application.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  await application.listen(0, "127.0.0.1");

  const baseUrl = await application.getUrl();
  const prisma = application.get(PrismaService);
  const suffix = randomUUID().replaceAll("-", "").slice(0, 12);

  try {
    const health = await request<{ status: string }>(baseUrl, "/health");
    assert.equal(health.status, "ok");

    const register = (kind: "sender" | "recipient") =>
      request<AuthResult>(
        baseUrl,
        "/v1/auth/register",
        jsonRequest("POST", {
          email: `${kind}.${suffix}@pilot.mansa.invalid`,
          password: "PilotPassword123",
          countryCode: "ML",
          device: {
            identifier: `pilot-${kind}-${suffix}`,
            name: `Pilot ${kind}`,
            operatingSystem: "CI",
            applicationVersion: "0.0.0-pilot",
          },
        }),
        201,
      );

    const [sender, recipient] = await Promise.all([register("sender"), register("recipient")]);

    await request<unknown>(
      baseUrl,
      "/v1/wallets/me",
      jsonRequest(
        "POST",
        { type: "MAIN", currencyCode: "XOF", countryCode: "ML", environment: "test" },
        sender.accessToken,
      ),
      403,
    );

    const selfPermissions = [
      "profile.self.read",
      "profile.self.write",
      "profile.recipient.resolve",
      "wallet.self.create",
      "wallet.self.read",
      "payment.self.create",
      "payment.self.read",
      "transfer.self.create",
      "transfer.self.read",
    ] as const;
    await Promise.all([
      grantPermissions(
        prisma,
        sender.userId,
        [
          ...selfPermissions,
          "ledger.account.create",
          "ledger.account.read",
          "ledger.transaction.create",
          "ledger.transaction.read",
        ],
        `SENDER_${suffix}`,
      ),
      grantPermissions(prisma, recipient.userId, selfPermissions, `RECIPIENT_${suffix}`),
    ]);

    await Promise.all([
      request(
        baseUrl,
        "/v1/profiles/me",
        jsonRequest(
          "PUT",
          { username: `sender_${suffix}`, firstName: "Pilot", lastName: "Sender" },
          sender.accessToken,
        ),
      ),
      request(
        baseUrl,
        "/v1/profiles/me",
        jsonRequest(
          "PUT",
          { username: `recipient_${suffix}`, firstName: "Pilot", lastName: "Recipient" },
          recipient.accessToken,
        ),
      ),
    ]);

    const createWallet = (accessToken: string) =>
      request<WalletResult>(
        baseUrl,
        "/v1/wallets/me",
        jsonRequest(
          "POST",
          { type: "MAIN", currencyCode: "XOF", countryCode: "ML", environment: "test" },
          accessToken,
        ),
        201,
      );
    const [senderWallet, recipientWallet] = await Promise.all([
      createWallet(sender.accessToken),
      createWallet(recipient.accessToken),
    ]);

    await prisma.$transaction([
      prisma.wallet.update({
        where: { id: senderWallet.id },
        data: { status: "ACTIVE", verificationLevel: "VERIFIED" },
      }),
      prisma.wallet.update({
        where: { id: recipientWallet.id },
        data: { status: "ACTIVE", verificationLevel: "VERIFIED" },
      }),
      prisma.kycProfile.create({
        data: {
          userId: sender.userId,
          countryCode: "ML",
          level: "LEVEL_1",
          requestedLevel: "LEVEL_1",
          status: "APPROVED",
        },
      }),
      prisma.kycProfile.create({
        data: {
          userId: recipient.userId,
          countryCode: "ML",
          level: "LEVEL_1",
          requestedLevel: "LEVEL_1",
          status: "APPROVED",
        },
      }),
    ]);

    const fundingAccount = await request<LedgerAccountResult>(
      baseUrl,
      "/v1/ledger/accounts",
      jsonRequest(
        "POST",
        {
          publicReference: `led_acc_pilot_${suffix}`,
          ownerType: "MANSA",
          ownerId: "PILOT",
          type: "ASSET",
          subtype: "PILOT_FUNDING",
          currencyCode: "XOF",
          countryCode: "ML",
          environment: "test",
          normalBalance: "DEBIT",
          reason: "Isolated technical pilot funding",
        },
        sender.accessToken,
      ),
      201,
    );

    await request(
      baseUrl,
      "/v1/ledger/transactions",
      jsonRequest(
        "POST",
        {
          journalCode: "GENERAL",
          type: "PILOT_FUNDING",
          businessReference: `pilot-funding-${suffix}`,
          idempotencyKey: `pilot-funding-${suffix}`,
          currencyCode: "XOF",
          countryCode: "ML",
          environment: "test",
          description: "Isolated technical pilot funding",
          source: "p0-technical-pilot",
          effectiveAt: new Date().toISOString(),
          entries: [
            {
              accountId: fundingAccount.id,
              direction: "DEBIT",
              amount: "1000",
              label: "Pilot funding source",
            },
            {
              accountId: senderWallet.ledgerAccountId,
              direction: "CREDIT",
              amount: "1000",
              label: "Pilot sender funding",
            },
          ],
        },
        sender.accessToken,
      ),
      201,
    );

    const transferInput = {
      senderWalletId: senderWallet.id,
      recipientHandle: `recipient_${suffix}`,
      amount: "250",
      currencyCode: "XOF",
      countryCode: "ML",
      environment: "test",
      idempotencyKey: `pilot-transfer-${suffix}`,
      message: "P0 technical pilot",
    };
    const firstTransfer = await request<TransferResult>(
      baseUrl,
      "/v1/transfers/mansa",
      jsonRequest("POST", transferInput, sender.accessToken),
      201,
    );
    const replayedTransfer = await request<TransferResult>(
      baseUrl,
      "/v1/transfers/mansa",
      jsonRequest("POST", transferInput, sender.accessToken),
      201,
    );
    assert.equal(firstTransfer.id, replayedTransfer.id);
    assert.equal(firstTransfer.status, "COMPLETED");
    assert.equal(firstTransfer.amount, "250");

    await request<unknown>(
      baseUrl,
      "/v1/transfers/mansa",
      jsonRequest("POST", { ...transferInput, amount: "251" }, sender.accessToken),
      409,
    );

    const [senderBalance, recipientBalance] = await Promise.all([
      request<BalanceResult>(baseUrl, `/v1/wallets/me/${senderWallet.id}/balance`, {
        headers: { authorization: `Bearer ${sender.accessToken}` },
      }),
      request<BalanceResult>(baseUrl, `/v1/wallets/me/${recipientWallet.id}/balance`, {
        headers: { authorization: `Bearer ${recipient.accessToken}` },
      }),
    ]);
    assert.equal(senderBalance.accountingBalance, "750");
    assert.equal(recipientBalance.accountingBalance, "250");

    const persistedTransfer = await prisma.transfer.findUniqueOrThrow({
      where: { id: firstTransfer.id },
      select: { payment: { select: { ledgerTransactionId: true } } },
    });
    const ledgerTransactionId = persistedTransfer.payment?.ledgerTransactionId;
    if (ledgerTransactionId == null) assert.fail("Transfer payment must reference the Ledger");
    const entries = await prisma.ledgerEntry.groupBy({
      by: ["direction"],
      where: { transactionId: ledgerTransactionId },
      _sum: { amount: true },
    });
    const total = (direction: "DEBIT" | "CREDIT") => {
      const entry = entries.find((candidate) => candidate.direction === direction);
      return entry === undefined ? 0n : (entry._sum.amount ?? 0n);
    };
    assert.equal(total("DEBIT"), 250n);
    assert.equal(total("CREDIT"), 250n);
  } finally {
    await application.close();
  }
});
