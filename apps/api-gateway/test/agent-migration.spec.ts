import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const migrationUrl = new URL(
  "../../../database/prisma/migrations/20260805000000_add_cash_agent_foundation/migration.sql",
  import.meta.url,
);

void test("Cash Agent migration separates float and protects its audit", async () => {
  const migration = await readFile(migrationUrl, "utf8");
  assert.match(migration, /cash_agent_float_accounts/);
  assert.match(migration, /ledger_account_id/);
  assert.match(migration, /cash_agent_float_accounts_cash_agent_id_currency_code_key/);
  assert.match(migration, /cash_network_audit_immutable/);
  assert.match(migration, /agent\.float\.read/);
  assert.doesNotMatch(migration, /DROP\s+(TABLE|COLUMN|TYPE)/i);
});
