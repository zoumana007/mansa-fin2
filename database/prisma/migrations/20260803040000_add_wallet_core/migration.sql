CREATE TYPE "WalletOwnerType" AS ENUM ('USER', 'AGENT', 'MERCHANT', 'BUSINESS', 'INSTITUTION');
CREATE TYPE "WalletType" AS ENUM ('MAIN', 'SECONDARY', 'PROFESSIONAL', 'SAVINGS', 'CHILD', 'STUDENT', 'INVESTMENT');
CREATE TYPE "WalletStatus" AS ENUM ('PENDING', 'ACTIVE', 'LIMITED', 'SUSPENDED', 'FROZEN', 'CLOSED');
CREATE TYPE "WalletVerificationLevel" AS ENUM ('UNVERIFIED', 'BASIC', 'VERIFIED', 'ENHANCED');

CREATE TABLE "wallets" (
    "id" UUID NOT NULL,
    "public_reference" VARCHAR(50) NOT NULL,
    "owner_type" "WalletOwnerType" NOT NULL,
    "owner_id" VARCHAR(100) NOT NULL,
    "owner_user_id" UUID,
    "type" "WalletType" NOT NULL,
    "currency_code" CHAR(3) NOT NULL,
    "country_code" CHAR(2) NOT NULL,
    "environment" VARCHAR(30) NOT NULL,
    "status" "WalletStatus" NOT NULL DEFAULT 'PENDING',
    "verification_level" "WalletVerificationLevel" NOT NULL DEFAULT 'UNVERIFIED',
    "ledger_account_id" UUID NOT NULL,
    "limits" JSONB,
    "status_reason" VARCHAR(500),
    "frozen_at" TIMESTAMPTZ(6),
    "closed_at" TIMESTAMPTZ(6),
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "wallet_audit" (
    "id" UUID NOT NULL,
    "wallet_id" UUID NOT NULL,
    "actor_user_id" UUID,
    "action" VARCHAR(150) NOT NULL,
    "reason" VARCHAR(500),
    "previous_value" JSONB,
    "new_value" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "wallet_audit_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "wallets_public_reference_key" ON "wallets"("public_reference");
CREATE UNIQUE INDEX "wallets_ledger_account_id_key" ON "wallets"("ledger_account_id");
CREATE UNIQUE INDEX "wallets_owner_type_owner_id_type_currency_code_environment_key" ON "wallets"("owner_type", "owner_id", "type", "currency_code", "environment");
CREATE INDEX "wallets_owner_user_id_status_idx" ON "wallets"("owner_user_id", "status");
CREATE INDEX "wallets_country_code_currency_code_environment_status_idx" ON "wallets"("country_code", "currency_code", "environment", "status");
CREATE INDEX "wallet_audit_wallet_id_created_at_idx" ON "wallet_audit"("wallet_id", "created_at");
CREATE INDEX "wallet_audit_actor_user_id_created_at_idx" ON "wallet_audit"("actor_user_id", "created_at");

ALTER TABLE "wallets" ADD CONSTRAINT "wallets_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_ledger_account_id_fkey" FOREIGN KEY ("ledger_account_id") REFERENCES "ledger_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "wallet_audit" ADD CONSTRAINT "wallet_audit_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "wallet_audit" ADD CONSTRAINT "wallet_audit_actor_user_id_fkey" FOREIGN KEY ("actor_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- PrismaUnsupportedStart
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_currency_format" CHECK ("currency_code" ~ '^[A-Z]{3}$');
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_country_format" CHECK ("country_code" ~ '^[A-Z]{2}$');

CREATE OR REPLACE FUNCTION protect_wallet_audit() RETURNS trigger AS $$
BEGIN
  RAISE EXCEPTION 'wallet audit records are immutable';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER wallet_audit_immutable BEFORE UPDATE OR DELETE ON "wallet_audit"
FOR EACH ROW EXECUTE FUNCTION protect_wallet_audit();
-- PrismaUnsupportedEnd

INSERT INTO "permissions" ("id", "code", "description", "critical") VALUES
('00000000-0000-4000-8000-000000000701', 'wallet.self.create', 'Créer son propre wallet', true),
('00000000-0000-4000-8000-000000000702', 'wallet.self.read', 'Consulter ses wallets et soldes', true),
('00000000-0000-4000-8000-000000000703', 'wallet.read', 'Consulter les wallets en administration', true),
('00000000-0000-4000-8000-000000000704', 'wallet.status.manage', 'Limiter, suspendre, geler ou fermer un wallet', true),
('00000000-0000-4000-8000-000000000705', 'wallet.audit.read', 'Consulter l’audit des wallets', true);
