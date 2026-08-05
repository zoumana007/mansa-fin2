export const AGENT_PERMISSIONS = {
  read: "agent.read",
  manage: "agent.manage",
  selfFloatRead: "agent.float.read",
  auditRead: "agent.audit.read",
  cashRegisterOpen: "agent.cash_register.open",
  cashRegisterClose: "agent.cash_register.close",
  cashRegisterDeclare: "agent.cash_register.declare",
  depositCreate: "agent.deposit.create",
  transactionRead: "agent.transaction.read",
} as const;
