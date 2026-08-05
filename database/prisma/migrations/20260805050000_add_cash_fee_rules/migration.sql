CREATE TYPE "CashFeeOperationType" AS ENUM ('DEPOSIT', 'WITHDRAWAL');
CREATE TYPE "CashFeeRuleStatus" AS ENUM ('DRAFT', 'ACTIVE', 'RETIRED');

CREATE TABLE "cash_fee_rules" (
  "id" UUID NOT NULL,
  "public_reference" VARCHAR(50) NOT NULL,
  "operation_type" "CashFeeOperationType" NOT NULL,
  "status" "CashFeeRuleStatus" NOT NULL DEFAULT 'DRAFT',
  "country_code" CHAR(2) NOT NULL,
  "currency_code" CHAR(3) NOT NULL,
  "environment" VARCHAR(30) NOT NULL,
  "rule_version" INTEGER NOT NULL,
  "fixed_fee_amount" BIGINT NOT NULL DEFAULT 0,
  "variable_fee_bps" INTEGER NOT NULL DEFAULT 0,
  "minimum_fee_amount" BIGINT,
  "maximum_fee_amount" BIGINT,
  "agent_commission_bps" INTEGER NOT NULL DEFAULT 0,
  "fee_revenue_ledger_account_id" UUID NOT NULL,
  "commission_expense_account_id" UUID NOT NULL,
  "effective_from" TIMESTAMPTZ(6) NOT NULL,
  "effective_to" TIMESTAMPTZ(6),
  "reason" VARCHAR(500) NOT NULL,
  "created_by_user_id" UUID NOT NULL,
  "approved_by_user_id" UUID,
  "approved_at" TIMESTAMPTZ(6),
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "cash_fee_rules_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "cash_fee_rules_public_reference_key" ON "cash_fee_rules"("public_reference");
CREATE INDEX "cash_fee_rules_operation_type_country_code_currency_code_en_idx" ON "cash_fee_rules"("operation_type", "country_code", "currency_code", "environment", "status", "effective_from");
CREATE UNIQUE INDEX "cash_fee_rules_operation_type_country_code_currency_code_en_key" ON "cash_fee_rules"("operation_type", "country_code", "currency_code", "environment", "rule_version");

ALTER TABLE "cash_fee_rules" ADD CONSTRAINT "cash_fee_rules_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_fee_rules" ADD CONSTRAINT "cash_fee_rules_approved_by_user_id_fkey" FOREIGN KEY ("approved_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_fee_rules" ADD CONSTRAINT "cash_fee_rules_fee_revenue_ledger_account_id_fkey" FOREIGN KEY ("fee_revenue_ledger_account_id") REFERENCES "ledger_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_fee_rules" ADD CONSTRAINT "cash_fee_rules_commission_expense_account_id_fkey" FOREIGN KEY ("commission_expense_account_id") REFERENCES "ledger_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "cash_deposits"
  ADD COLUMN "fee_rule_id" UUID,
  ADD COLUMN "fee_rule_version" INTEGER,
  ADD COLUMN "fee_amount" BIGINT NOT NULL DEFAULT 0,
  ADD COLUMN "agent_commission_amount" BIGINT NOT NULL DEFAULT 0;
ALTER TABLE "cash_withdrawal_authorizations"
  ADD COLUMN "fee_rule_id" UUID,
  ADD COLUMN "fee_rule_version" INTEGER,
  ADD COLUMN "fee_amount" BIGINT NOT NULL DEFAULT 0,
  ADD COLUMN "agent_commission_amount" BIGINT NOT NULL DEFAULT 0;
ALTER TABLE "cash_withdrawals"
  ADD COLUMN "fee_rule_id" UUID,
  ADD COLUMN "fee_rule_version" INTEGER,
  ADD COLUMN "fee_amount" BIGINT NOT NULL DEFAULT 0,
  ADD COLUMN "agent_commission_amount" BIGINT NOT NULL DEFAULT 0;
ALTER TABLE "cash_deposits" ADD CONSTRAINT "cash_deposits_fee_rule_id_fkey" FOREIGN KEY ("fee_rule_id") REFERENCES "cash_fee_rules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_withdrawal_authorizations" ADD CONSTRAINT "cash_withdrawal_authorizations_fee_rule_id_fkey" FOREIGN KEY ("fee_rule_id") REFERENCES "cash_fee_rules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "cash_withdrawals" ADD CONSTRAINT "cash_withdrawals_fee_rule_id_fkey" FOREIGN KEY ("fee_rule_id") REFERENCES "cash_fee_rules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- PrismaUnsupportedStart
ALTER TABLE "cash_fee_rules" ADD CONSTRAINT "cash_fee_rules_values_valid" CHECK (
  "rule_version" > 0 AND "fixed_fee_amount" >= 0 AND
  "variable_fee_bps" BETWEEN 0 AND 10000 AND
  "agent_commission_bps" BETWEEN 0 AND 10000 AND
  ("minimum_fee_amount" IS NULL OR "minimum_fee_amount" >= 0) AND
  ("maximum_fee_amount" IS NULL OR "maximum_fee_amount" >= 0) AND
  ("minimum_fee_amount" IS NULL OR "maximum_fee_amount" IS NULL OR "minimum_fee_amount" <= "maximum_fee_amount") AND
  ("effective_to" IS NULL OR "effective_to" > "effective_from")
);
ALTER TABLE "cash_deposits" ADD CONSTRAINT "cash_deposits_fee_values_valid" CHECK ("fee_amount" >= 0 AND "agent_commission_amount" >= 0 AND "agent_commission_amount" <= "fee_amount");
ALTER TABLE "cash_withdrawal_authorizations" ADD CONSTRAINT "cash_withdrawal_authorizations_fee_values_valid" CHECK ("fee_amount" >= 0 AND "agent_commission_amount" >= 0 AND "agent_commission_amount" <= "fee_amount");
ALTER TABLE "cash_withdrawals" ADD CONSTRAINT "cash_withdrawals_fee_values_valid" CHECK ("fee_amount" >= 0 AND "agent_commission_amount" >= 0 AND "agent_commission_amount" <= "fee_amount");
CREATE UNIQUE INDEX "cash_fee_rules_one_active_context_key" ON "cash_fee_rules"("operation_type", "country_code", "currency_code", "environment") WHERE "status" = 'ACTIVE';
CREATE FUNCTION protect_cash_fee_rule() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN RAISE EXCEPTION 'cash fee rules are immutable'; END IF;
  IF OLD."status" <> 'DRAFT' AND ROW(NEW."operation_type", NEW."country_code", NEW."currency_code", NEW."environment", NEW."rule_version", NEW."fixed_fee_amount", NEW."variable_fee_bps", NEW."minimum_fee_amount", NEW."maximum_fee_amount", NEW."agent_commission_bps", NEW."fee_revenue_ledger_account_id", NEW."commission_expense_account_id", NEW."effective_from", NEW."reason", NEW."created_by_user_id") IS DISTINCT FROM ROW(OLD."operation_type", OLD."country_code", OLD."currency_code", OLD."environment", OLD."rule_version", OLD."fixed_fee_amount", OLD."variable_fee_bps", OLD."minimum_fee_amount", OLD."maximum_fee_amount", OLD."agent_commission_bps", OLD."fee_revenue_ledger_account_id", OLD."commission_expense_account_id", OLD."effective_from", OLD."reason", OLD."created_by_user_id") THEN
    RAISE EXCEPTION 'approved cash fee rule values are immutable';
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER cash_fee_rules_immutable BEFORE UPDATE OR DELETE ON "cash_fee_rules" FOR EACH ROW EXECUTE FUNCTION protect_cash_fee_rule();
-- PrismaUnsupportedEnd

INSERT INTO "permissions" ("id", "code", "description", "critical") VALUES
  ('00000000-0000-4000-8000-000000000952', 'agent.fee_rule.read', 'Consulter les règles de frais Agent', true),
  ('00000000-0000-4000-8000-000000000953', 'agent.fee_rule.manage', 'Créer et approuver les règles de frais Agent', true),
  ('00000000-0000-4000-8000-000000000954', 'agent.fee.quote', 'Simuler les frais d’une opération Agent', false);
