-- CreateEnum
CREATE TYPE "RoleStatus" AS ENUM ('ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AccessScopeType" AS ENUM ('GLOBAL', 'SELF', 'ORGANIZATION', 'COUNTRY', 'ENVIRONMENT', 'RESOURCE');

-- CreateTable
CREATE TABLE "roles" (
    "id" UUID NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "status" "RoleStatus" NOT NULL DEFAULT 'ACTIVE',
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "permissions" (
    "id" UUID NOT NULL,
    "code" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "critical" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "role_permissions" (
    "role_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

CREATE TABLE "role_assignments" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "scope_type" "AccessScopeType" NOT NULL DEFAULT 'GLOBAL',
    "scope_id" VARCHAR(100),
    "country_code" CHAR(2),
    "environment" VARCHAR(30),
    "reason" VARCHAR(500) NOT NULL,
    "valid_from" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMPTZ(6),
    "revoked_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "role_assignments_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "access_audit" (
    "id" UUID NOT NULL,
    "actor_user_id" UUID,
    "action" VARCHAR(150) NOT NULL,
    "target_type" VARCHAR(100) NOT NULL,
    "target_id" VARCHAR(100),
    "reason" VARCHAR(500),
    "previous_value" JSONB,
    "new_value" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "access_audit_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "roles_code_key" ON "roles"("code");
CREATE INDEX "roles_status_idx" ON "roles"("status");
CREATE UNIQUE INDEX "permissions_code_key" ON "permissions"("code");
CREATE INDEX "role_permissions_permission_id_idx" ON "role_permissions"("permission_id");
CREATE INDEX "role_assignments_user_id_revoked_at_expires_at_idx" ON "role_assignments"("user_id", "revoked_at", "expires_at");
CREATE INDEX "role_assignments_role_id_idx" ON "role_assignments"("role_id");
CREATE INDEX "access_audit_actor_user_id_created_at_idx" ON "access_audit"("actor_user_id", "created_at");
CREATE INDEX "access_audit_target_type_target_id_idx" ON "access_audit"("target_type", "target_id");

ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "role_assignments" ADD CONSTRAINT "role_assignments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "role_assignments" ADD CONSTRAINT "role_assignments_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "access_audit" ADD CONSTRAINT "access_audit_actor_user_id_fkey" FOREIGN KEY ("actor_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- SeedReferenceData
INSERT INTO "permissions" ("id", "code", "description", "critical") VALUES
('00000000-0000-4000-8000-000000000501', 'rbac.permission.read', 'Consulter le catalogue des permissions', false),
('00000000-0000-4000-8000-000000000502', 'rbac.role.read', 'Consulter les rôles', false),
('00000000-0000-4000-8000-000000000503', 'rbac.role.create', 'Créer un rôle et ses permissions', true),
('00000000-0000-4000-8000-000000000504', 'rbac.assignment.create', 'Affecter un rôle à un utilisateur', true),
('00000000-0000-4000-8000-000000000505', 'rbac.assignment.revoke', 'Révoquer une affectation de rôle', true);
