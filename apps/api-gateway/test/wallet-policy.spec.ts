/* eslint-disable @typescript-eslint/no-floating-promises -- node:test registers tests synchronously. */
import assert from "node:assert/strict";
import { test } from "node:test";

import { canTransitionWallet } from "../src/wallet/wallet-policy.js";

test("wallet allows controlled operational status transitions", () => {
  assert.equal(canTransitionWallet("PENDING", "ACTIVE"), true);
  assert.equal(canTransitionWallet("ACTIVE", "FROZEN"), true);
  assert.equal(canTransitionWallet("FROZEN", "ACTIVE"), true);
});

test("wallet closure is terminal and same-state updates are rejected", () => {
  assert.equal(canTransitionWallet("CLOSED", "ACTIVE"), false);
  assert.equal(canTransitionWallet("CLOSED", "CLOSED"), false);
  assert.equal(canTransitionWallet("ACTIVE", "ACTIVE"), false);
});
