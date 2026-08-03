/* eslint-disable @typescript-eslint/no-floating-promises -- node:test registers tests synchronously. */
import assert from "node:assert/strict";
import { test } from "node:test";
import { hasSufficientBalance } from "../src/payment/payment-policy.js";

test("payment accepts only positive amounts covered by accounting balance", () => {
  assert.equal(hasSufficientBalance(1000n, 200n, 800n), true);
  assert.equal(hasSufficientBalance(1000n, 200n, 801n), false);
  assert.equal(hasSufficientBalance(1000n, 200n, 0n), false);
});
