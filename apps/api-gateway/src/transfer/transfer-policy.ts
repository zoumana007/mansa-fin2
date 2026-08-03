export function isKycEligible(
  status: string | undefined,
  expiresAt: Date | null | undefined,
  now = new Date(),
): boolean {
  return status === "APPROVED" && (expiresAt == null || expiresAt > now);
}
