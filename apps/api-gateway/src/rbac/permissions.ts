export const RBAC_PERMISSIONS = {
  permissionRead: "rbac.permission.read",
  roleRead: "rbac.role.read",
  roleCreate: "rbac.role.create",
  assignmentCreate: "rbac.assignment.create",
  assignmentRevoke: "rbac.assignment.revoke",
} as const;

export const RBAC_PERMISSION_CATALOG = Object.values(RBAC_PERMISSIONS);
