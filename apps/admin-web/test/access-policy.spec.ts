import assert from "node:assert/strict";
import test from "node:test";
import { canAccessAdmin, visibleAdminSections } from "../src/auth/access-policy";

void test("admin access requires authentication and MFA", () => {
  assert.equal(
    canAccessAdmin({ authenticated: true, mfaVerified: false, permissions: new Set() }),
    false,
  );
  assert.equal(
    canAccessAdmin({ authenticated: true, mfaVerified: true, permissions: new Set() }),
    true,
  );
});

void test("admin navigation is deny-by-default", () => {
  assert.deepEqual(
    visibleAdminSections({
      authenticated: false,
      mfaVerified: false,
      permissions: new Set(["admin.dashboard.read"]),
    }),
    [],
  );
  assert.deepEqual(
    visibleAdminSections({
      authenticated: true,
      mfaVerified: true,
      permissions: new Set(["admin.dashboard.read"]),
    }),
    ["Tableau de bord"],
  );
});
