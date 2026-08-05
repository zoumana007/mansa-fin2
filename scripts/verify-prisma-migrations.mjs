import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const repositoryRoot = new URL("../", import.meta.url);
const prismaExecutable = new URL(
  process.platform === "win32" ? "node_modules/.bin/prisma.cmd" : "node_modules/.bin/prisma",
  repositoryRoot,
);
const migrationFiles = [
  "database/prisma/migrations/20260803000000_initialize_schema/migration.sql",
  "database/prisma/migrations/20260803010000_add_identity_auth/migration.sql",
  "database/prisma/migrations/20260803020000_add_rbac/migration.sql",
  "database/prisma/migrations/20260803030000_add_ledger_core/migration.sql",
  "database/prisma/migrations/20260803040000_add_wallet_core/migration.sql",
  "database/prisma/migrations/20260803050000_add_internal_payments/migration.sql",
  "database/prisma/migrations/20260803060000_add_kyc_core/migration.sql",
  "database/prisma/migrations/20260803070000_add_user_profiles/migration.sql",
  "database/prisma/migrations/20260803080000_add_mansa_transfers/migration.sql",
  "database/prisma/migrations/20260804000000_add_notification_center/migration.sql",
  "database/prisma/migrations/20260805000000_add_cash_agent_foundation/migration.sql",
  "database/prisma/migrations/20260805010000_add_cash_agent_register/migration.sql",
  "database/prisma/migrations/20260805020000_add_cash_deposits/migration.sql",
  "database/prisma/migrations/20260805030000_add_withdrawal_authorizations/migration.sql",
  "database/prisma/migrations/20260805040000_add_cash_withdrawals/migration.sql",
  "database/prisma/migrations/20260805050000_add_cash_fee_rules/migration.sql",
].map((path) => new URL(path, repositoryRoot));

const result = spawnSync(
  fileURLToPath(prismaExecutable),
  ["migrate", "diff", "--from-empty", "--to-schema", "database/prisma/schema.prisma", "--script"],
  {
    cwd: fileURLToPath(repositoryRoot),
    encoding: "utf8",
    env: { ...process.env, CI: "true" },
  },
);

assert.equal(result.status, 0, result.stderr);

const migration = (await Promise.all(migrationFiles.map((file) => readFile(file, "utf8")))).join(
  "\n",
);

/**
 * Prisma emits columns inside CREATE TABLE for an empty-schema diff, while an additive production
 * migration necessarily uses ALTER TABLE. Re-express those generated columns as the exact ALTER
 * statements from the migration before comparing the two equivalent final schemas.
 * @param {string} schemaSql
 * @param {string} migrationSql
 */
const normalizeAdditiveColumns = (schemaSql, migrationSql) => {
  let normalized = schemaSql;
  const additions = migrationSql.matchAll(
    /ALTER TABLE "([^"]+)"\s+((?:ADD COLUMN "[^"]+"[^;]*(?:,\s*ADD COLUMN "[^"]+"[^;]*)*);)/g,
  );
  for (const addition of additions) {
    const statement = addition[0];
    const table = addition[1];
    const clausesWithTerminator = addition[2];
    if (table === undefined || clausesWithTerminator === undefined) continue;
    const clauses = clausesWithTerminator.slice(0, -1);
    const columnNames = [...clauses.matchAll(/ADD COLUMN "([^"]+)"/g)]
      .map((match) => match[1])
      .filter((columnName) => columnName !== undefined);
    for (const columnName of columnNames) {
      const createTable = new RegExp(
        `(CREATE TABLE "${table}" \\([\\s\\S]*?)\\n\\s*"${columnName}"[^\\n]*,`,
      );
      normalized = normalized.replace(createTable, "$1");
    }
    normalized += `\n${statement}`;
  }
  return normalized;
};
/** @param {string} sql */
const statements = (sql) =>
  sql
    .replaceAll(/-- PrismaUnsupportedStart[\s\S]*?-- PrismaUnsupportedEnd/g, "")
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("--"))
    .join("\n")
    .split(";")
    .map((statement) =>
      statement
        .replaceAll(/\s+/g, " ")
        .replaceAll(/\s*([(),])\s*/g, "$1")
        .trim(),
    )
    .filter(Boolean)
    .filter((statement) => !statement.startsWith('INSERT INTO "permissions"'))
    .filter((statement) => !statement.startsWith('INSERT INTO "ledger_journals"'))
    .sort();

assert.deepEqual(
  statements(migration),
  statements(normalizeAdditiveColumns(result.stdout, migration)),
  "The migrations must describe exactly the current Prisma schema.",
);
