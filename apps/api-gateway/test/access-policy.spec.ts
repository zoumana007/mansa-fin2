/* eslint-disable @typescript-eslint/no-floating-promises -- node:test registers tests synchronously. */
import assert from "node:assert/strict";
import { test } from "node:test";

import { hasEveryPermission } from "../src/security/access-policy.js";

test("RBAC denies access when no permission is declared", () => {
  assert.equal(hasEveryPermission(new Set(["rbac.role.read"]), []), false);
});

test("RBAC denies access when one required permission is missing", () => {
  assert.equal(
    hasEveryPermission(new Set(["rbac.role.read"]), ["rbac.role.read", "rbac.role.create"]),
    false,
  );
});

test("RBAC allows access only when every required permission is granted", () => {
  assert.equal(
    hasEveryPermission(new Set(["rbac.role.read", "rbac.role.create"]), [
      "rbac.role.read",
      "rbac.role.create",
    ]),
    true,
  );
});
