import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const migration = new URL(
  "../../../database/prisma/migrations/20260804000000_add_notification_center/migration.sql",
  import.meta.url,
);

void test("notification migration enforces deduplication and immutable audit", async () => {
  const sql = await readFile(migration, "utf8");
  assert.match(sql, /notifications_environment_idempotency_key_key/);
  assert.match(sql, /notifications_read_status_consistent/);
  assert.match(sql, /notification_audit_immutable/);
});
