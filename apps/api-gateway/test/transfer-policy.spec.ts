import assert from "node:assert/strict";
import test from "node:test";
import { isKycEligible } from "../src/transfer/transfer-policy.js";

void test("accepts an approved KYC without expiry", () => {
  assert.equal(isKycEligible("APPROVED", null), true);
});
void test("rejects an expired approved KYC", () => {
  assert.equal(isKycEligible("APPROVED", new Date("2026-01-01"), new Date("2026-01-02")), false);
});
void test("rejects a non-approved KYC", () => {
  assert.equal(isKycEligible("SUBMITTED", null), false);
});
