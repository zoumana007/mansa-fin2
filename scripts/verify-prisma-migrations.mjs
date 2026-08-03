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
/** @param {string} sql */
const statements = (sql) =>
  sql
    .replaceAll(/-- PrismaUnsupportedStart[\s\S]*?-- PrismaUnsupportedEnd/g, "")
    .split("\n")
    .filter((line) => !line.trimStart().startsWith("--"))
    .join("\n")
    .split(";")
    .map((statement) => statement.replaceAll(/\s+/g, " ").trim())
    .filter(Boolean)
    .filter((statement) => !statement.startsWith('INSERT INTO "permissions"'))
    .filter((statement) => !statement.startsWith('INSERT INTO "ledger_journals"'))
    .sort();

assert.deepEqual(
  statements(migration),
  statements(result.stdout),
  "The migrations must describe exactly the current Prisma schema.",
);
