export function isExpired(expiresAt: Date | null, now = new Date()): boolean {
  return expiresAt !== null && expiresAt <= now;
}

export function isMandatoryCategory(category: string): boolean {
  return ["SECURITY", "TRANSACTION", "COMPLIANCE"].includes(category);
}
