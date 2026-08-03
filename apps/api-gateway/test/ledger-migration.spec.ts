/* eslint-disable @typescript-eslint/no-floating-promises -- node:test registers tests synchronously. */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const migrationUrl = new URL(
  "../../../database/prisma/migrations/20260803030000_add_ledger_core/migration.sql",
  import.meta.url,
);

test("ledger migration protects financial invariants in PostgreSQL", async () => {
  const migration = await readFile(migrationUrl, "utf8");
  assert.match(migration, /ledger_entries_amount_positive/);
  assert.match(migration, /ledger_entries_immutable/);
  assert.match(migration, /ledger_transactions_immutable/);
  assert.match(migration, /ledger_transaction_posting_check/);
  assert.match(migration, /debit_total <> credit_total/);
});
