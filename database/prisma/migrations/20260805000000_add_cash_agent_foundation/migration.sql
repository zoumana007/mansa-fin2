CREATE TYPE "CashAgentType" AS ENUM ('STANDARD', 'PREMIUM', 'PARTNER_BRANCH', 'MANSA_BRANCH');
CREATE TYPE "CashAgentStatus" AS ENUM ('PENDING_APPROVAL', 'ACTIVE', 'SUSPENDED', 'CLOSED');
CREATE TYPE "CashAgentFloatStatus" AS ENUM ('ACTIVE', 'SUSPENDED', 'CLOSED');

CREATE TABLE "cash_agents" (
  "id" UUID NOT NULL,
  "public_reference" VARCHAR(50) NOT NULL,
  "owner_user_id" UUID NOT NULL,
  "type" "CashAgentType" NOT NULL DEFAULT 'STANDARD',
  "status" "CashAgentStatus" NOT NULL DEFAULT 'PENDING_APPROVAL',
  "country_code" CHAR(2) NOT NULL,
  "environment" VARCHAR(30) NOT NULL,
  "status_reason" VARCHAR(500),
  "version" INTEGER NOT NULL DEFAULT 1,
  "activated_at" TIMESTAMPTZ(6),
  "suspended_at" TIMESTAMPTZ(6),
  "closed_at" TIMESTAMPTZ(6),
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL,
  CONSTRAINT "cash_agents_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "cash_agent_float_accounts" (
  "id" UUID NOT NULL,
  "cash_agent_id" UUID NOT NULL,
  "ledger_account_id" UUID NOT NULL,
  "currency_code" CHAR(3) NOT NULL,
  "status" "CashAgentFloatStatus" NOT NULL DEFAULT 'ACTIVE',
  "minimum_amount" BIGINT NOT NULL DEFAULT 0,
  "maximum_amount" BIGINT,
  "alert_threshold_amount" BIGINT NOT NULL DEFAULT 0,
  "version" INTEGER NOT NULL DEFAULT 1,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL,
  CONSTRAINT "cash_agent_float_accounts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "cash_network_audit" (
  "id" UUID NOT NULL,
  "cash_agent_id" UUID NOT NULL,
  "actor_user_id" UUID,
  "action" VARCHAR(150) NOT NULL,
  "reason" VARCHAR(500),
  "previous_value" JSONB,
  "new_value" JSONB,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "cash_network_audit_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "cash_agents_public_reference_key" ON "cash_agents"("public_reference");
CREATE UNIQUE INDEX "cash_agents_owner_user_id_key" ON "cash_agents"("owner_user_id");
CREATE INDEX "cash_agents_status_country_code_environment_idx" ON "cash_agents"("status", "country_code", "environment");
CREATE UNIQUE INDEX "cash_agent_float_accounts_ledger_account_id_key" ON "cash_agent_float_accounts"("ledger_account_id");
CREATE UNIQUE INDEX "cash_agent_float_accounts_cash_agent_id_currency_code_key" ON "cash_agent_float_accounts"("cash_agent_id", "currency_code");
CREATE INDEX "cash_agent_float_accounts_cash_agent_id_status_idx" ON "cash_agent_float_accounts"("cash_agent_id", "status");
CREATE INDEX "cash_network_audit_cash_agent_id_created_at_idx" ON "cash_network_audit"("cash_agent_id", "created_at");
CREATE INDEX "cash_network_audit_actor_user_id_created_at_idx" ON "cash_network_audit"("actor_user_id", "created_at");

ALTER TABLE "cash_agents" ADD CONSTRAINT "cash_agents_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_agent_float_accounts" ADD CONSTRAINT "cash_agent_float_accounts_cash_agent_id_fkey" FOREIGN KEY ("cash_agent_id") REFERENCES "cash_agents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_agent_float_accounts" ADD CONSTRAINT "cash_agent_float_accounts_ledger_account_id_fkey" FOREIGN KEY ("ledger_account_id") REFERENCES "ledger_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_network_audit" ADD CONSTRAINT "cash_network_audit_cash_agent_id_fkey" FOREIGN KEY ("cash_agent_id") REFERENCES "cash_agents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_network_audit" ADD CONSTRAINT "cash_network_audit_actor_user_id_fkey" FOREIGN KEY ("actor_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- PrismaUnsupportedStart
ALTER TABLE "cash_agent_float_accounts" ADD CONSTRAINT "cash_agent_float_amounts_valid" CHECK ("minimum_amount" >= 0 AND "alert_threshold_amount" >= 0 AND ("maximum_amount" IS NULL OR "maximum_amount" >= "minimum_amount"));
CREATE TRIGGER cash_network_audit_immutable
BEFORE UPDATE OR DELETE ON "cash_network_audit"
FOR EACH ROW EXECUTE FUNCTION protect_wallet_audit();
-- PrismaUnsupportedEnd

INSERT INTO "permissions" ("id", "code", "description", "critical") VALUES
  ('00000000-0000-4000-8000-000000000941', 'agent.read', 'Consulter les agents', true),
  ('00000000-0000-4000-8000-000000000942', 'agent.manage', 'Créer et administrer les agents', true),
  ('00000000-0000-4000-8000-000000000943', 'agent.float.read', 'Consulter son float Agent', false),
  ('00000000-0000-4000-8000-000000000944', 'agent.audit.read', 'Consulter l’audit Cash Network', true);
