import assert from "node:assert/strict";
import test from "node:test";

import { calculateCashFee } from "../src/agent/cash-fee-policy.js";

void test("cash fee calculation is deterministic and separates Agent commission", () => {
  const result = calculateCashFee(10_000n, {
    fixedFeeAmount: 100n,
    variableFeeBps: 150,
    minimumFeeAmount: null,
    maximumFeeAmount: null,
    agentCommissionBps: 4_000,
  });
  assert.deepEqual(result, {
    amount: 10_000n,
    feeAmount: 250n,
    agentCommissionAmount: 100n,
    mansaRevenueAmount: 150n,
    totalCustomerDebit: 10_250n,
  });
});

void test("cash fee calculation applies bounds after the fixed and variable components", () => {
  const minimum = calculateCashFee(100n, {
    fixedFeeAmount: 0n,
    variableFeeBps: 100,
    minimumFeeAmount: 25n,
    maximumFeeAmount: 200n,
    agentCommissionBps: 0,
  });
  const maximum = calculateCashFee(100_000n, {
    fixedFeeAmount: 100n,
    variableFeeBps: 500,
    minimumFeeAmount: 25n,
    maximumFeeAmount: 200n,
    agentCommissionBps: 0,
  });
  assert.equal(minimum.feeAmount, 25n);
  assert.equal(maximum.feeAmount, 200n);
});
