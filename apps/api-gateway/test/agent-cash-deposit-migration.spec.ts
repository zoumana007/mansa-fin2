import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const migrationUrl = new URL(
  "../../../database/prisma/migrations/20260805020000_add_cash_deposits/migration.sql",
  import.meta.url,
);

void test("Cash deposits are positive, idempotent, immutable and linked to Ledger", async () => {
  const migration = await readFile(migrationUrl, "utf8");
  assert.match(migration, /cash_deposits_environment_idempotency_key_key/);
  assert.match(migration, /cash_deposits_amount_positive/);
  assert.match(migration, /cash_deposits_immutable/);
  assert.match(migration, /ledger_transaction_id/);
  assert.match(migration, /agent\.deposit\.create/);
  assert.doesNotMatch(migration, /DROP\s+(TABLE|COLUMN|TYPE)/i);
});
