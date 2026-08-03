import assert from "node:assert/strict";
import test from "node:test";
import { isExpired, isMandatoryCategory } from "../src/notification/notification-policy.js";

void test("detects expired notifications", () => {
  assert.equal(isExpired(new Date("2026-01-01"), new Date("2026-01-02")), true);
  assert.equal(isExpired(null, new Date("2026-01-02")), false);
});

void test("keeps security, transaction and compliance notifications mandatory", () => {
  assert.equal(isMandatoryCategory("SECURITY"), true);
  assert.equal(isMandatoryCategory("TRANSACTION"), true);
  assert.equal(isMandatoryCategory("PROMOTION"), false);
});
