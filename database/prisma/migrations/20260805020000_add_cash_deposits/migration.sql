CREATE TYPE "CashOperationStatus" AS ENUM ('CREATED', 'VALIDATING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REVERSED');

CREATE TABLE "cash_deposits" (
  "id" UUID NOT NULL,
  "public_reference" VARCHAR(50) NOT NULL,
  "cash_agent_id" UUID NOT NULL,
  "cash_register_id" UUID NOT NULL,
  "customer_wallet_id" UUID NOT NULL,
  "initiated_by_user_id" UUID NOT NULL,
  "ledger_transaction_id" UUID,
  "status" "CashOperationStatus" NOT NULL DEFAULT 'CREATED',
  "amount" BIGINT NOT NULL,
  "currency_code" CHAR(3) NOT NULL,
  "country_code" CHAR(2) NOT NULL,
  "environment" VARCHAR(30) NOT NULL,
  "idempotency_key" VARCHAR(150) NOT NULL,
  "request_hash" CHAR(64) NOT NULL,
  "description" VARCHAR(500) NOT NULL,
  "completed_at" TIMESTAMPTZ(6),
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL,
  CONSTRAINT "cash_deposits_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "cash_deposits_public_reference_key" ON "cash_deposits"("public_reference");
CREATE UNIQUE INDEX "cash_deposits_ledger_transaction_id_key" ON "cash_deposits"("ledger_transaction_id");
CREATE UNIQUE INDEX "cash_deposits_environment_idempotency_key_key" ON "cash_deposits"("environment", "idempotency_key");
CREATE INDEX "cash_deposits_cash_agent_id_created_at_idx" ON "cash_deposits"("cash_agent_id", "created_at");
CREATE INDEX "cash_deposits_customer_wallet_id_created_at_idx" ON "cash_deposits"("customer_wallet_id", "created_at");
CREATE INDEX "cash_deposits_status_created_at_idx" ON "cash_deposits"("status", "created_at");

ALTER TABLE "cash_deposits" ADD CONSTRAINT "cash_deposits_cash_agent_id_fkey" FOREIGN KEY ("cash_agent_id") REFERENCES "cash_agents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_deposits" ADD CONSTRAINT "cash_deposits_cash_register_id_fkey" FOREIGN KEY ("cash_register_id") REFERENCES "cash_agent_cash_registers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_deposits" ADD CONSTRAINT "cash_deposits_customer_wallet_id_fkey" FOREIGN KEY ("customer_wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_deposits" ADD CONSTRAINT "cash_deposits_initiated_by_user_id_fkey" FOREIGN KEY ("initiated_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_deposits" ADD CONSTRAINT "cash_deposits_ledger_transaction_id_fkey" FOREIGN KEY ("ledger_transaction_id") REFERENCES "ledger_transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- PrismaUnsupportedStart
ALTER TABLE "cash_deposits" ADD CONSTRAINT "cash_deposits_amount_positive" CHECK ("amount" > 0);
CREATE TRIGGER cash_deposits_immutable BEFORE UPDATE OR DELETE ON "cash_deposits" FOR EACH ROW WHEN (OLD."status" = 'COMPLETED') EXECUTE FUNCTION protect_wallet_audit();
UPDATE "ledger_accounts" SET "type" = 'LIABILITY', "normal_balance" = 'CREDIT' WHERE "subtype" = 'AGENT_FLOAT';
-- PrismaUnsupportedEnd

INSERT INTO "permissions" ("id", "code", "description", "critical") VALUES
  ('00000000-0000-4000-8000-000000000948', 'agent.deposit.create', 'Créer un dépôt d’espèces Agent', true),
  ('00000000-0000-4000-8000-000000000949', 'agent.transaction.read', 'Consulter les opérations Agent', true);
