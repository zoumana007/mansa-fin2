const transitions = new Map<string, ReadonlySet<string>>([
  ["PENDING", new Set(["ACTIVE", "LIMITED", "SUSPENDED", "FROZEN", "CLOSED"])],
  ["ACTIVE", new Set(["LIMITED", "SUSPENDED", "FROZEN", "CLOSED"])],
  ["LIMITED", new Set(["ACTIVE", "SUSPENDED", "FROZEN", "CLOSED"])],
  ["SUSPENDED", new Set(["ACTIVE", "LIMITED", "FROZEN", "CLOSED"])],
  ["FROZEN", new Set(["ACTIVE", "LIMITED", "SUSPENDED", "CLOSED"])],
  ["CLOSED", new Set()],
]);

export function canTransitionWallet(current: string, next: string): boolean {
  return transitions.get(current)?.has(next) ?? false;
}
