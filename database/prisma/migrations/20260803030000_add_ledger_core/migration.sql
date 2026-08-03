-- CreateEnum
CREATE TYPE "LedgerAccountOwnerType" AS ENUM ('USER', 'MERCHANT', 'MANSA', 'PARTNER', 'TECHNICAL');
CREATE TYPE "LedgerAccountType" AS ENUM ('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE', 'SUSPENSE', 'SETTLEMENT', 'FEE', 'TAX', 'RESERVE');
CREATE TYPE "LedgerNormalBalance" AS ENUM ('DEBIT', 'CREDIT');
CREATE TYPE "LedgerAccountStatus" AS ENUM ('ACTIVE', 'RESTRICTED', 'CLOSED');
CREATE TYPE "LedgerTransactionStatus" AS ENUM ('DRAFT', 'PREPARED', 'POSTED', 'FAILED', 'CANCELLED', 'REVERSED', 'EXPIRED');
CREATE TYPE "LedgerEntryDirection" AS ENUM ('DEBIT', 'CREDIT');
CREATE TYPE "LedgerEntryStatus" AS ENUM ('PENDING', 'POSTED', 'REVERSED', 'FAILED');

-- CreateTable
CREATE TABLE "ledger_journals" (
    "id" UUID NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ledger_journals_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ledger_accounts" (
    "id" UUID NOT NULL,
    "public_reference" VARCHAR(50) NOT NULL,
    "owner_type" "LedgerAccountOwnerType" NOT NULL,
    "owner_id" VARCHAR(100),
    "type" "LedgerAccountType" NOT NULL,
    "subtype" VARCHAR(100),
    "currency_code" CHAR(3) NOT NULL,
    "country_code" CHAR(2) NOT NULL,
    "environment" VARCHAR(30) NOT NULL,
    "status" "LedgerAccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "normal_balance" "LedgerNormalBalance" NOT NULL,
    "restrictions" JSONB,
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closed_at" TIMESTAMPTZ(6),
    CONSTRAINT "ledger_accounts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ledger_transactions" (
    "id" UUID NOT NULL,
    "journal_id" UUID NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "business_reference" VARCHAR(100),
    "idempotency_key" VARCHAR(150) NOT NULL,
    "request_hash" CHAR(64) NOT NULL,
    "status" "LedgerTransactionStatus" NOT NULL DEFAULT 'DRAFT',
    "currency_code" CHAR(3) NOT NULL,
    "country_code" CHAR(2) NOT NULL,
    "environment" VARCHAR(30) NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "correlation_id" VARCHAR(100),
    "source" VARCHAR(100) NOT NULL,
    "created_by_user_id" UUID NOT NULL,
    "effective_at" TIMESTAMPTZ(6) NOT NULL,
    "posted_at" TIMESTAMPTZ(6),
    "parent_id" UUID,
    "metadata" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ledger_transactions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ledger_entries" (
    "id" UUID NOT NULL,
    "transaction_id" UUID NOT NULL,
    "account_id" UUID NOT NULL,
    "direction" "LedgerEntryDirection" NOT NULL,
    "amount" BIGINT NOT NULL,
    "currency_code" CHAR(3) NOT NULL,
    "sequence" INTEGER NOT NULL,
    "status" "LedgerEntryStatus" NOT NULL DEFAULT 'PENDING',
    "label" VARCHAR(300) NOT NULL,
    "reference" VARCHAR(100),
    "metadata" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ledger_entries_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ledger_audit" (
    "id" UUID NOT NULL,
    "transaction_id" UUID,
    "actor_user_id" UUID,
    "action" VARCHAR(150) NOT NULL,
    "reason" VARCHAR(500),
    "details" JSONB,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ledger_audit_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ledger_journals_code_key" ON "ledger_journals"("code");
CREATE UNIQUE INDEX "ledger_accounts_public_reference_key" ON "ledger_accounts"("public_reference");
CREATE INDEX "ledger_accounts_owner_type_owner_id_status_idx" ON "ledger_accounts"("owner_type", "owner_id", "status");
CREATE INDEX "ledger_accounts_currency_code_country_code_environment_stat_idx" ON "ledger_accounts"("currency_code", "country_code", "environment", "status");
CREATE INDEX "ledger_transactions_business_reference_idx" ON "ledger_transactions"("business_reference");
CREATE INDEX "ledger_transactions_correlation_id_idx" ON "ledger_transactions"("correlation_id");
CREATE INDEX "ledger_transactions_status_created_at_idx" ON "ledger_transactions"("status", "created_at");
CREATE UNIQUE INDEX "ledger_transactions_environment_idempotency_key_key" ON "ledger_transactions"("environment", "idempotency_key");
CREATE INDEX "ledger_entries_account_id_status_created_at_idx" ON "ledger_entries"("account_id", "status", "created_at");
CREATE UNIQUE INDEX "ledger_entries_transaction_id_sequence_key" ON "ledger_entries"("transaction_id", "sequence");
CREATE INDEX "ledger_audit_transaction_id_created_at_idx" ON "ledger_audit"("transaction_id", "created_at");
CREATE INDEX "ledger_audit_actor_user_id_created_at_idx" ON "ledger_audit"("actor_user_id", "created_at");

ALTER TABLE "ledger_transactions" ADD CONSTRAINT "ledger_transactions_journal_id_fkey" FOREIGN KEY ("journal_id") REFERENCES "ledger_journals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ledger_transactions" ADD CONSTRAINT "ledger_transactions_created_by_user_id_fkey" FOREIGN KEY ("created_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ledger_transactions" ADD CONSTRAINT "ledger_transactions_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "ledger_transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ledger_entries" ADD CONSTRAINT "ledger_entries_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "ledger_transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ledger_entries" ADD CONSTRAINT "ledger_entries_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "ledger_accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ledger_audit" ADD CONSTRAINT "ledger_audit_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "ledger_transactions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ledger_audit" ADD CONSTRAINT "ledger_audit_actor_user_id_fkey" FOREIGN KEY ("actor_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- PrismaUnsupportedStart
ALTER TABLE "ledger_entries" ADD CONSTRAINT "ledger_entries_amount_positive" CHECK ("amount" > 0);
ALTER TABLE "ledger_entries" ADD CONSTRAINT "ledger_entries_sequence_positive" CHECK ("sequence" > 0);
ALTER TABLE "ledger_accounts" ADD CONSTRAINT "ledger_accounts_currency_format" CHECK ("currency_code" ~ '^[A-Z]{3}$');
ALTER TABLE "ledger_transactions" ADD CONSTRAINT "ledger_transactions_currency_format" CHECK ("currency_code" ~ '^[A-Z]{3}$');
ALTER TABLE "ledger_entries" ADD CONSTRAINT "ledger_entries_currency_format" CHECK ("currency_code" ~ '^[A-Z]{3}$');

CREATE OR REPLACE FUNCTION protect_posted_ledger_records() RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'DELETE' OR OLD.status = 'POSTED' THEN
    RAISE EXCEPTION 'posted ledger records are immutable';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ledger_entries_immutable BEFORE UPDATE OR DELETE ON "ledger_entries"
FOR EACH ROW EXECUTE FUNCTION protect_posted_ledger_records();
CREATE TRIGGER ledger_transactions_immutable BEFORE UPDATE OR DELETE ON "ledger_transactions"
FOR EACH ROW EXECUTE FUNCTION protect_posted_ledger_records();

CREATE OR REPLACE FUNCTION validate_ledger_posting() RETURNS trigger AS $$
DECLARE
  debit_total NUMERIC;
  credit_total NUMERIC;
  entry_count INTEGER;
  invalid_count INTEGER;
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'POSTED' THEN
    RAISE EXCEPTION 'ledger transaction must be prepared before posting';
  END IF;
  IF TG_OP = 'UPDATE' AND NEW.status = 'POSTED' AND OLD.status <> 'POSTED' THEN
    SELECT COUNT(*),
           COALESCE(SUM(amount) FILTER (WHERE direction = 'DEBIT'), 0),
           COALESCE(SUM(amount) FILTER (WHERE direction = 'CREDIT'), 0),
           COUNT(*) FILTER (WHERE status <> 'POSTED' OR currency_code <> NEW.currency_code)
      INTO entry_count, debit_total, credit_total, invalid_count
      FROM ledger_entries WHERE transaction_id = NEW.id;
    IF entry_count < 2 OR debit_total <> credit_total OR debit_total <= 0 OR invalid_count > 0 THEN
      RAISE EXCEPTION 'ledger transaction is not balanced or contains invalid entries';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ledger_transaction_posting_check BEFORE INSERT OR UPDATE ON "ledger_transactions"
FOR EACH ROW EXECUTE FUNCTION validate_ledger_posting();
-- PrismaUnsupportedEnd

-- SeedReferenceData
INSERT INTO "permissions" ("id", "code", "description", "critical") VALUES
('00000000-0000-4000-8000-000000000601', 'ledger.account.read', 'Consulter les comptes et soldes du ledger', true),
('00000000-0000-4000-8000-000000000602', 'ledger.account.create', 'Créer un compte comptable', true),
('00000000-0000-4000-8000-000000000603', 'ledger.transaction.read', 'Consulter les transactions et écritures du ledger', true),
('00000000-0000-4000-8000-000000000604', 'ledger.transaction.create', 'Comptabiliser une transaction en partie double', true),
('00000000-0000-4000-8000-000000000605', 'ledger.audit.read', 'Consulter l’audit financier', true);

INSERT INTO "ledger_journals" ("id", "code", "name", "description") VALUES
('00000000-0000-4000-8000-000000000610', 'GENERAL', 'Journal général', 'Journal technique du noyau ledger P0-06');
