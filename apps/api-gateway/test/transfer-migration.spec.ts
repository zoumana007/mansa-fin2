import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const migration = new URL(
  "../../../database/prisma/migrations/20260803080000_add_mansa_transfers/migration.sql",
  import.meta.url,
);

void test("transfer migration enforces amount and immutable audit", async () => {
  const sql = await readFile(migration, "utf8");
  assert.match(sql, /transfers_amount_positive/);
  assert.match(sql, /transfer_audit_immutable/);
  assert.match(sql, /transfer\.self\.create/);
});
