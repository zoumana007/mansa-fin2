import assert from "node:assert/strict";
import test from "node:test";
import { isOperationAllowedOffline } from "../src/utils/offline-policy";
void test("offline mode never authorizes cash operations", () => {
  assert.equal(isOperationAllowedOffline("deposit"), false);
  assert.equal(isOperationAllowedOffline("withdrawal"), false);
});
void test("offline mode only exposes cached activity", () => {
  assert.equal(isOperationAllowedOffline("view_cached_activity"), true);
});
