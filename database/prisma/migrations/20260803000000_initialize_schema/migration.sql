-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "database_schema_versions" (
    "id" UUID NOT NULL,
    "version" VARCHAR(100) NOT NULL,
    "checksum" VARCHAR(64) NOT NULL,
    "description" TEXT,
    "applied_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "database_schema_versions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "database_schema_versions_version_key" ON "database_schema_versions"("version");
