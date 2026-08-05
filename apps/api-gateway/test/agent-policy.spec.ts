import assert from "node:assert/strict";
import test from "node:test";

import { canTransitionCashAgent } from "../src/agent/agent-policy.js";

void test("Cash Agent activation and suspension follow controlled transitions", () => {
  assert.equal(canTransitionCashAgent("PENDING_APPROVAL", "ACTIVE"), true);
  assert.equal(canTransitionCashAgent("ACTIVE", "SUSPENDED"), true);
  assert.equal(canTransitionCashAgent("SUSPENDED", "ACTIVE"), true);
});

void test("a closed Cash Agent cannot be reactivated", () => {
  assert.equal(canTransitionCashAgent("CLOSED", "ACTIVE"), false);
  assert.equal(canTransitionCashAgent("ACTIVE", "ACTIVE"), false);
});
