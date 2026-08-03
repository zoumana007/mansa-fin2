export function hasSufficientBalance(credits: bigint, debits: bigint, amount: bigint): boolean {
  return amount > 0n && credits - debits >= amount;
}
