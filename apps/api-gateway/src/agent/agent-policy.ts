import type { CashAgentStatus } from "../generated/prisma/client.js";

const transitions: Readonly<Record<CashAgentStatus, readonly CashAgentStatus[]>> = {
  PENDING_APPROVAL: ["ACTIVE", "CLOSED"],
  ACTIVE: ["SUSPENDED", "CLOSED"],
  SUSPENDED: ["ACTIVE", "CLOSED"],
  CLOSED: [],
};

export function canTransitionCashAgent(from: CashAgentStatus, to: CashAgentStatus): boolean {
  return transitions[from].includes(to);
}
