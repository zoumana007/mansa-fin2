export type CommerceAction = "confirm_payment" | "refund" | "view_cached_catalog";

export function isCommerceActionAllowedOffline(action: CommerceAction): boolean {
  return action === "view_cached_catalog";
}
