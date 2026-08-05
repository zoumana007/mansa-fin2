import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const migrationUrl = new URL(
  "../../../database/prisma/migrations/20260805050000_add_cash_fee_rules/migration.sql",
  import.meta.url,
);

void test("cash fee rules are versioned, governed and Ledger-linked", async () => {
  const migration = await readFile(migrationUrl, "utf8");
  assert.match(migration, /cash_fee_rules_operation_type_country_code_currency_code_en_key/);
  assert.match(migration, /cash_fee_rules_one_active_context_key/);
  assert.match(migration, /cash_fee_rules_values_valid/);
  assert.match(migration, /cash_fee_rules_immutable/);
  assert.match(migration, /fee_revenue_ledger_account_id/);
  assert.match(migration, /commission_expense_account_id/);
  assert.match(migration, /ALTER TABLE "cash_deposits"[\s\S]*"fee_rule_id"/);
  assert.match(migration, /ALTER TABLE "cash_withdrawal_authorizations"[\s\S]*"fee_rule_version"/);
  assert.match(migration, /ALTER TABLE "cash_withdrawals"[\s\S]*"agent_commission_amount"/);
  assert.match(migration, /cash_deposits_fee_values_valid/);
  assert.match(migration, /cash_withdrawals_fee_values_valid/);
  assert.match(migration, /agent\.fee_rule\.manage/);
  assert.doesNotMatch(migration, /DROP\s+(TABLE|COLUMN|TYPE)/i);
});
