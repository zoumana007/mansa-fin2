CREATE TABLE "cash_withdrawals" (
  "id" UUID NOT NULL, "public_reference" VARCHAR(50) NOT NULL, "authorization_id" UUID NOT NULL,
  "cash_agent_id" UUID NOT NULL, "cash_register_id" UUID NOT NULL, "customer_wallet_id" UUID NOT NULL,
  "initiated_by_user_id" UUID NOT NULL, "ledger_transaction_id" UUID, "status" "CashOperationStatus" NOT NULL DEFAULT 'CREATED',
  "amount" BIGINT NOT NULL, "currency_code" CHAR(3) NOT NULL, "country_code" CHAR(2) NOT NULL,
  "environment" VARCHAR(30) NOT NULL, "idempotency_key" VARCHAR(150) NOT NULL, "request_hash" CHAR(64) NOT NULL,
  "description" VARCHAR(500) NOT NULL, "completed_at" TIMESTAMPTZ(6),
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMPTZ(6) NOT NULL,
  CONSTRAINT "cash_withdrawals_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "cash_withdrawals_public_reference_key" ON "cash_withdrawals"("public_reference");
CREATE UNIQUE INDEX "cash_withdrawals_authorization_id_key" ON "cash_withdrawals"("authorization_id");
CREATE UNIQUE INDEX "cash_withdrawals_ledger_transaction_id_key" ON "cash_withdrawals"("ledger_transaction_id");
CREATE UNIQUE INDEX "cash_withdrawals_environment_idempotency_key_key" ON "cash_withdrawals"("environment", "idempotency_key");
CREATE INDEX "cash_withdrawals_cash_agent_id_created_at_idx" ON "cash_withdrawals"("cash_agent_id", "created_at");
CREATE INDEX "cash_withdrawals_customer_wallet_id_created_at_idx" ON "cash_withdrawals"("customer_wallet_id", "created_at");
CREATE INDEX "cash_withdrawals_status_created_at_idx" ON "cash_withdrawals"("status", "created_at");
ALTER TABLE "cash_withdrawals" ADD CONSTRAINT "cash_withdrawals_authorization_id_fkey" FOREIGN KEY ("authorization_id") REFERENCES "cash_withdrawal_authorizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_withdrawals" ADD CONSTRAINT "cash_withdrawals_cash_agent_id_fkey" FOREIGN KEY ("cash_agent_id") REFERENCES "cash_agents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_withdrawals" ADD CONSTRAINT "cash_withdrawals_cash_register_id_fkey" FOREIGN KEY ("cash_register_id") REFERENCES "cash_agent_cash_registers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_withdrawals" ADD CONSTRAINT "cash_withdrawals_customer_wallet_id_fkey" FOREIGN KEY ("customer_wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_withdrawals" ADD CONSTRAINT "cash_withdrawals_initiated_by_user_id_fkey" FOREIGN KEY ("initiated_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_withdrawals" ADD CONSTRAINT "cash_withdrawals_ledger_transaction_id_fkey" FOREIGN KEY ("ledger_transaction_id") REFERENCES "ledger_transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
-- PrismaUnsupportedStart
ALTER TABLE "cash_withdrawals" ADD CONSTRAINT "cash_withdrawals_amount_positive" CHECK ("amount" > 0);
CREATE TRIGGER cash_withdrawals_immutable BEFORE UPDATE OR DELETE ON "cash_withdrawals" FOR EACH ROW WHEN (OLD."status" = 'COMPLETED') EXECUTE FUNCTION protect_wallet_audit();
-- PrismaUnsupportedEnd
