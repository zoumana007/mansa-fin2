import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const migrationUrl = new URL(
  "../../../database/prisma/migrations/20260805040000_add_cash_withdrawals/migration.sql",
  import.meta.url,
);

void test("cash withdrawals require a unique authorization and immutable Ledger result", async () => {
  const migration = await readFile(migrationUrl, "utf8");
  assert.match(migration, /cash_withdrawals_authorization_id_key/);
  assert.match(migration, /cash_withdrawals_environment_idempotency_key_key/);
  assert.match(migration, /cash_withdrawals_amount_positive/);
  assert.match(migration, /cash_withdrawals_immutable/);
  assert.match(migration, /ledger_transaction_id/);
  assert.doesNotMatch(migration, /DROP\s+(TABLE|COLUMN|TYPE)/i);
});
