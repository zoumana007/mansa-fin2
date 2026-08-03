/* eslint-disable @typescript-eslint/no-floating-promises -- node:test registers tests synchronously. */
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
const url = new URL(
  "../../../database/prisma/migrations/20260803060000_add_kyc_core/migration.sql",
  import.meta.url,
);
test("KYC migration keeps reviews auditable without biometric data", async () => {
  const sql = await readFile(url, "utf8");
  assert.match(sql, /kyc_profiles_user_id_key/);
  assert.match(sql, /kyc_audit_immutable/);
  assert.doesNotMatch(sql, /selfie|biometric|document_blob/i);
});
