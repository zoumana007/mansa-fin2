export function hasEveryPermission(
  granted: ReadonlySet<string>,
  required: readonly string[],
): boolean {
  return required.length > 0 && required.every((permission) => granted.has(permission));
}
