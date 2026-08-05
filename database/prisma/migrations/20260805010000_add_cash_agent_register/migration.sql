CREATE TYPE "CashRegisterStatus" AS ENUM ('OPEN', 'CLOSED');
CREATE TYPE "CashDeclarationType" AS ENUM ('OPENING', 'INTERIM', 'CLOSING');

CREATE TABLE "cash_agent_cash_registers" (
  "id" UUID NOT NULL,
  "public_reference" VARCHAR(50) NOT NULL,
  "cash_agent_id" UUID NOT NULL,
  "currency_code" CHAR(3) NOT NULL,
  "status" "CashRegisterStatus" NOT NULL DEFAULT 'OPEN',
  "opening_amount" BIGINT NOT NULL,
  "theoretical_amount" BIGINT NOT NULL,
  "declared_closing_amount" BIGINT,
  "variance_amount" BIGINT,
  "opening_denominations" JSONB,
  "closing_denominations" JSONB,
  "opened_by_user_id" UUID NOT NULL,
  "closed_by_user_id" UUID,
  "closing_reason" VARCHAR(500),
  "version" INTEGER NOT NULL DEFAULT 1,
  "opened_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "closed_at" TIMESTAMPTZ(6),
  CONSTRAINT "cash_agent_cash_registers_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "cash_agent_cash_declarations" (
  "id" UUID NOT NULL,
  "cash_register_id" UUID NOT NULL,
  "declared_by_user_id" UUID NOT NULL,
  "type" "CashDeclarationType" NOT NULL,
  "amount" BIGINT NOT NULL,
  "denominations" JSONB,
  "note" VARCHAR(500),
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "cash_agent_cash_declarations_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "cash_agent_cash_registers_public_reference_key" ON "cash_agent_cash_registers"("public_reference");
CREATE INDEX "cash_agent_cash_registers_cash_agent_id_status_opened_at_idx" ON "cash_agent_cash_registers"("cash_agent_id", "status", "opened_at");
CREATE INDEX "cash_agent_cash_declarations_cash_register_id_created_at_idx" ON "cash_agent_cash_declarations"("cash_register_id", "created_at");
CREATE INDEX "cash_agent_cash_declarations_declared_by_user_id_created_at_idx" ON "cash_agent_cash_declarations"("declared_by_user_id", "created_at");

ALTER TABLE "cash_agent_cash_registers" ADD CONSTRAINT "cash_agent_cash_registers_cash_agent_id_fkey" FOREIGN KEY ("cash_agent_id") REFERENCES "cash_agents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_agent_cash_registers" ADD CONSTRAINT "cash_agent_cash_registers_opened_by_user_id_fkey" FOREIGN KEY ("opened_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_agent_cash_registers" ADD CONSTRAINT "cash_agent_cash_registers_closed_by_user_id_fkey" FOREIGN KEY ("closed_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_agent_cash_declarations" ADD CONSTRAINT "cash_agent_cash_declarations_cash_register_id_fkey" FOREIGN KEY ("cash_register_id") REFERENCES "cash_agent_cash_registers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_agent_cash_declarations" ADD CONSTRAINT "cash_agent_cash_declarations_declared_by_user_id_fkey" FOREIGN KEY ("declared_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- PrismaUnsupportedStart
ALTER TABLE "cash_agent_cash_registers" ADD CONSTRAINT "cash_agent_cash_register_amounts_valid" CHECK ("opening_amount" >= 0 AND "theoretical_amount" >= 0 AND ("declared_closing_amount" IS NULL OR "declared_closing_amount" >= 0));
CREATE UNIQUE INDEX "cash_agent_one_open_register_per_currency" ON "cash_agent_cash_registers"("cash_agent_id", "currency_code") WHERE "status" = 'OPEN';
CREATE TRIGGER cash_agent_cash_declarations_immutable BEFORE UPDATE OR DELETE ON "cash_agent_cash_declarations" FOR EACH ROW EXECUTE FUNCTION protect_wallet_audit();
-- PrismaUnsupportedEnd

INSERT INTO "permissions" ("id", "code", "description", "critical") VALUES
  ('00000000-0000-4000-8000-000000000945', 'agent.cash_register.open', 'Ouvrir une caisse Agent', true),
  ('00000000-0000-4000-8000-000000000946', 'agent.cash_register.close', 'Fermer une caisse Agent', true),
  ('00000000-0000-4000-8000-000000000947', 'agent.cash_register.declare', 'Déclarer la position de caisse Agent', true);
