import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const migrationUrl = new URL(
  "../../../database/prisma/migrations/20260805030000_add_withdrawal_authorizations/migration.sql",
  import.meta.url,
);

void test("withdrawal authorizations store only a hash and become immutable after use", async () => {
  const migration = await readFile(migrationUrl, "utf8");
  assert.match(migration, /"token_hash" CHAR\(64\) NOT NULL/);
  assert.doesNotMatch(migration, /"token" VARCHAR/);
  assert.match(migration, /cash_withdrawal_authorizations_immutable/);
  assert.match(migration, /agent\.withdrawal\.authorize/);
  assert.doesNotMatch(migration, /DROP\s+(TABLE|COLUMN|TYPE)/i);
});
