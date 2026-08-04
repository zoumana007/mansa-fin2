import assert from "node:assert/strict";
import test from "node:test";
import { isCommerceActionAllowedOffline } from "../src/utils/offline-policy";

void test("offline mode never confirms payments or refunds", () => {
  assert.equal(isCommerceActionAllowedOffline("confirm_payment"), false);
  assert.equal(isCommerceActionAllowedOffline("refund"), false);
});

void test("offline mode only exposes cached catalog data", () => {
  assert.equal(isCommerceActionAllowedOffline("view_cached_catalog"), true);
});
