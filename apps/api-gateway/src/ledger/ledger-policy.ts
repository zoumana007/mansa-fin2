export interface LedgerEntryInput {
  amount: string;
  direction: "CREDIT" | "DEBIT";
}

export function assertBalanced(entries: readonly LedgerEntryInput[]): void {
  if (entries.length < 2) throw new Error("A ledger transaction requires at least two entries");
  let debits = 0n;
  let credits = 0n;
  for (const entry of entries) {
    if (!/^[1-9]\d*$/.test(entry.amount))
      throw new Error("Ledger amounts must be positive integers");
    const amount = BigInt(entry.amount);
    if (entry.direction === "DEBIT") debits += amount;
    else credits += amount;
  }
  if (debits !== credits) throw new Error("Ledger transaction is not balanced");
}

export function calculateBalance(
  normalBalance: "CREDIT" | "DEBIT",
  debits: bigint,
  credits: bigint,
): bigint {
  return normalBalance === "DEBIT" ? debits - credits : credits - debits;
}
