/* eslint-disable @typescript-eslint/no-floating-promises -- node:test registers tests synchronously. */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const migrationUrl = new URL(
  "../../../database/prisma/migrations/20260803040000_add_wallet_core/migration.sql",
  import.meta.url,
);

test("wallet migration keeps balances in Ledger and protects audit records", async () => {
  const migration = await readFile(migrationUrl, "utf8");
  assert.doesNotMatch(migration, /"balance"/);
  assert.match(migration, /wallets_ledger_account_id_fkey/);
  assert.match(migration, /wallets_owner_type_owner_id_type_currency_code_environment_key/);
  assert.match(migration, /wallet_audit_immutable/);
});
