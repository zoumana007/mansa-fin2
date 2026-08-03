export type AgentOperation = "deposit" | "withdrawal" | "view_cached_activity";
export function isOperationAllowedOffline(operation: AgentOperation): boolean {
  return operation === "view_cached_activity";
}
