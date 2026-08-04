export interface AdminAccessContext {
  authenticated: boolean;
  mfaVerified: boolean;
  permissions: ReadonlySet<string>;
}

export function canAccessAdmin(context: AdminAccessContext): boolean {
  return context.authenticated && context.mfaVerified;
}

export function visibleAdminSections(context: AdminAccessContext): string[] {
  if (!canAccessAdmin(context)) return [];
  const sections = [
    ["Tableau de bord", "admin.dashboard.read"],
    ["Utilisateurs", "admin.users.read"],
    ["KYC", "kyc.read"],
    ["Rôles", "rbac.role.read"],
    ["Audit", "access.audit.read"],
  ] as const;
  return sections
    .filter(([, permission]) => context.permissions.has(permission))
    .map(([label]) => label);
}
