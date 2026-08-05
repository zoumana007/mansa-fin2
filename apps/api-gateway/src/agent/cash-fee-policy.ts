export interface CashFeeCalculationRule {
  fixedFeeAmount: bigint;
  variableFeeBps: number;
  minimumFeeAmount: bigint | null;
  maximumFeeAmount: bigint | null;
  agentCommissionBps: number;
}

export function calculateCashFee(amount: bigint, rule: CashFeeCalculationRule) {
  if (amount <= 0n) throw new RangeError("Amount must be positive");
  if (rule.variableFeeBps < 0 || rule.variableFeeBps > 10_000)
    throw new RangeError("Variable fee rate must be between 0 and 10000 bps");
  if (rule.agentCommissionBps < 0 || rule.agentCommissionBps > 10_000)
    throw new RangeError("Agent commission rate must be between 0 and 10000 bps");

  const proportionalFee = (amount * BigInt(rule.variableFeeBps)) / 10_000n;
  let feeAmount = rule.fixedFeeAmount + proportionalFee;
  if (rule.minimumFeeAmount !== null && feeAmount < rule.minimumFeeAmount)
    feeAmount = rule.minimumFeeAmount;
  if (rule.maximumFeeAmount !== null && feeAmount > rule.maximumFeeAmount)
    feeAmount = rule.maximumFeeAmount;
  const agentCommissionAmount = (feeAmount * BigInt(rule.agentCommissionBps)) / 10_000n;

  return {
    amount,
    feeAmount,
    agentCommissionAmount,
    mansaRevenueAmount: feeAmount - agentCommissionAmount,
    totalCustomerDebit: amount + feeAmount,
  };
}
