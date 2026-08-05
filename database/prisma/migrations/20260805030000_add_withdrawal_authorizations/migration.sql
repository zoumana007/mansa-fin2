CREATE TYPE "WithdrawalAuthorizationStatus" AS ENUM ('ACTIVE', 'CONSUMED', 'EXPIRED', 'CANCELLED');

CREATE TABLE "cash_withdrawal_authorizations" (
  "id" UUID NOT NULL,
  "cash_agent_id" UUID NOT NULL,
  "customer_wallet_id" UUID NOT NULL,
  "customer_user_id" UUID NOT NULL,
  "token_hash" CHAR(64) NOT NULL,
  "status" "WithdrawalAuthorizationStatus" NOT NULL DEFAULT 'ACTIVE',
  "amount" BIGINT NOT NULL,
  "currency_code" CHAR(3) NOT NULL,
  "country_code" CHAR(2) NOT NULL,
  "environment" VARCHAR(30) NOT NULL,
  "expires_at" TIMESTAMPTZ(6) NOT NULL,
  "consumed_at" TIMESTAMPTZ(6),
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "cash_withdrawal_authorizations_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "cash_withdrawal_authorizations_token_hash_key" ON "cash_withdrawal_authorizations"("token_hash");
CREATE INDEX "cash_withdrawal_authorizations_cash_agent_id_status_expires_idx" ON "cash_withdrawal_authorizations"("cash_agent_id", "status", "expires_at");
CREATE INDEX "cash_withdrawal_authorizations_customer_user_id_created_at_idx" ON "cash_withdrawal_authorizations"("customer_user_id", "created_at");
ALTER TABLE "cash_withdrawal_authorizations" ADD CONSTRAINT "cash_withdrawal_authorizations_cash_agent_id_fkey" FOREIGN KEY ("cash_agent_id") REFERENCES "cash_agents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_withdrawal_authorizations" ADD CONSTRAINT "cash_withdrawal_authorizations_customer_wallet_id_fkey" FOREIGN KEY ("customer_wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_withdrawal_authorizations" ADD CONSTRAINT "cash_withdrawal_authorizations_customer_user_id_fkey" FOREIGN KEY ("customer_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- PrismaUnsupportedStart
ALTER TABLE "cash_withdrawal_authorizations" ADD CONSTRAINT "cash_withdrawal_authorizations_amount_positive" CHECK ("amount" > 0);
CREATE TRIGGER cash_withdrawal_authorizations_immutable BEFORE UPDATE OR DELETE ON "cash_withdrawal_authorizations" FOR EACH ROW WHEN (OLD."status" IN ('CONSUMED', 'EXPIRED', 'CANCELLED')) EXECUTE FUNCTION protect_wallet_audit();
-- PrismaUnsupportedEnd

INSERT INTO "permissions" ("id", "code", "description", "critical") VALUES
  ('00000000-0000-4000-8000-000000000950', 'agent.withdrawal.authorize', 'Autoriser un retrait Agent depuis son wallet', true),
  ('00000000-0000-4000-8000-000000000951', 'agent.withdrawal.create', 'Exécuter un retrait Agent autorisé', true);
