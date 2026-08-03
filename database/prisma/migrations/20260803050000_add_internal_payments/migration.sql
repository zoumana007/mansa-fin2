CREATE TYPE "PaymentType" AS ENUM ('INTERNAL');
CREATE TYPE "PaymentStatus" AS ENUM ('INITIATED', 'PROCESSING', 'COMPLETED', 'FAILED', 'CANCELLED', 'REVERSED');

CREATE TABLE "payments" (
 "id" UUID NOT NULL, "public_reference" VARCHAR(50) NOT NULL, "type" "PaymentType" NOT NULL DEFAULT 'INTERNAL', "status" "PaymentStatus" NOT NULL DEFAULT 'INITIATED',
 "payer_wallet_id" UUID NOT NULL, "payee_wallet_id" UUID NOT NULL, "amount" BIGINT NOT NULL, "fee_amount" BIGINT NOT NULL DEFAULT 0,
 "currency_code" CHAR(3) NOT NULL, "country_code" CHAR(2) NOT NULL, "environment" VARCHAR(30) NOT NULL, "idempotency_key" VARCHAR(150) NOT NULL,
 "request_hash" CHAR(64) NOT NULL, "description" VARCHAR(500) NOT NULL, "initiated_by_user_id" UUID NOT NULL, "ledger_transaction_id" UUID,
 "completed_at" TIMESTAMPTZ(6), "failure_code" VARCHAR(100), "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMPTZ(6) NOT NULL,
 CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "payment_audit" (
 "id" UUID NOT NULL, "payment_id" UUID NOT NULL, "actor_user_id" UUID, "action" VARCHAR(150) NOT NULL, "details" JSONB,
 "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "payment_audit_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "payments_public_reference_key" ON "payments"("public_reference");
CREATE UNIQUE INDEX "payments_ledger_transaction_id_key" ON "payments"("ledger_transaction_id");
CREATE UNIQUE INDEX "payments_environment_idempotency_key_key" ON "payments"("environment", "idempotency_key");
CREATE INDEX "payments_payer_wallet_id_created_at_idx" ON "payments"("payer_wallet_id", "created_at");
CREATE INDEX "payments_payee_wallet_id_created_at_idx" ON "payments"("payee_wallet_id", "created_at");
CREATE INDEX "payments_status_created_at_idx" ON "payments"("status", "created_at");
CREATE INDEX "payment_audit_payment_id_created_at_idx" ON "payment_audit"("payment_id", "created_at");
CREATE INDEX "payment_audit_actor_user_id_created_at_idx" ON "payment_audit"("actor_user_id", "created_at");
ALTER TABLE "payments" ADD CONSTRAINT "payments_payer_wallet_id_fkey" FOREIGN KEY ("payer_wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "payments" ADD CONSTRAINT "payments_payee_wallet_id_fkey" FOREIGN KEY ("payee_wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "payments" ADD CONSTRAINT "payments_initiated_by_user_id_fkey" FOREIGN KEY ("initiated_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "payments" ADD CONSTRAINT "payments_ledger_transaction_id_fkey" FOREIGN KEY ("ledger_transaction_id") REFERENCES "ledger_transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "payment_audit" ADD CONSTRAINT "payment_audit_payment_id_fkey" FOREIGN KEY ("payment_id") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "payment_audit" ADD CONSTRAINT "payment_audit_actor_user_id_fkey" FOREIGN KEY ("actor_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- PrismaUnsupportedStart
ALTER TABLE "payments" ADD CONSTRAINT "payments_amount_positive" CHECK ("amount" > 0 AND "fee_amount" >= 0);
CREATE TRIGGER payment_audit_immutable BEFORE UPDATE OR DELETE ON "payment_audit" FOR EACH ROW EXECUTE FUNCTION protect_wallet_audit();
-- PrismaUnsupportedEnd

INSERT INTO "permissions" ("id", "code", "description", "critical") VALUES
('00000000-0000-4000-8000-000000000801', 'payment.self.create', 'Créer un paiement interne depuis son wallet', true),
('00000000-0000-4000-8000-000000000802', 'payment.self.read', 'Consulter ses paiements', true),
('00000000-0000-4000-8000-000000000803', 'payment.read', 'Consulter les paiements en administration', true),
('00000000-0000-4000-8000-000000000804', 'payment.audit.read', 'Consulter l’audit des paiements', true);
