export function maskFamilyName(value: string): string {
  const text = value.trim();
  if (text.length <= 1) return "*";
  return `${text.charAt(0)}${"*".repeat(Math.min(text.length - 1, 8))}`;
}
