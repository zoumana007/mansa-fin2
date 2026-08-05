import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const migrationUrl = new URL(
  "../../../database/prisma/migrations/20260805010000_add_cash_agent_register/migration.sql",
  import.meta.url,
);

void test("Cash Agent register migration enforces one open register and immutable declarations", async () => {
  const migration = await readFile(migrationUrl, "utf8");
  assert.match(migration, /cash_agent_one_open_register_per_currency/);
  assert.match(migration, /WHERE "status" = 'OPEN'/);
  assert.match(migration, /cash_agent_cash_declarations_immutable/);
  assert.match(migration, /variance_amount/);
  assert.match(migration, /agent\.cash_register\.open/);
  assert.doesNotMatch(migration, /DROP\s+(TABLE|COLUMN|TYPE)/i);
});
