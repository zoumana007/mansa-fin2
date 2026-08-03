/* eslint-disable @typescript-eslint/no-floating-promises -- node:test registers tests synchronously. */
import assert from "node:assert/strict";
import { test } from "node:test";

import { assertBalanced, calculateBalance } from "../src/ledger/ledger-policy.js";

test("ledger accepts a balanced transaction with multiple credits", () => {
  assert.doesNotThrow(() => {
    assertBalanced([
      { direction: "DEBIT", amount: "10100" },
      { direction: "CREDIT", amount: "10000" },
      { direction: "CREDIT", amount: "100" },
    ]);
  });
});

test("ledger rejects unbalanced, zero and negative amounts", () => {
  assert.throws(() => {
    assertBalanced([
      { direction: "DEBIT", amount: "100" },
      { direction: "CREDIT", amount: "99" },
    ]);
  });
  assert.throws(() => {
    assertBalanced([
      { direction: "DEBIT", amount: "0" },
      { direction: "CREDIT", amount: "0" },
    ]);
  });
  assert.throws(() => {
    assertBalanced([
      { direction: "DEBIT", amount: "-10" },
      { direction: "CREDIT", amount: "-10" },
    ]);
  });
});

test("ledger reconstructs debit-normal and credit-normal balances", () => {
  assert.equal(calculateBalance("DEBIT", 150n, 25n), 125n);
  assert.equal(calculateBalance("CREDIT", 25n, 150n), 125n);
});
