/* eslint-disable @typescript-eslint/no-floating-promises -- node:test registers tests synchronously. */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const migrationUrl = new URL(
  "../../../database/prisma/migrations/20260803050000_add_internal_payments/migration.sql",
  import.meta.url,
);

test("payment migration enforces idempotence, positive amounts and Ledger linkage", async () => {
  const migration = await readFile(migrationUrl, "utf8");
  assert.match(migration, /payments_environment_idempotency_key_key/);
  assert.match(migration, /payments_amount_positive/);
  assert.match(migration, /payments_ledger_transaction_id_fkey/);
  assert.match(migration, /payment_audit_immutable/);
});
