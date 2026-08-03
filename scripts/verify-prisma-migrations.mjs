import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const repositoryRoot = new URL("../", import.meta.url);
const prismaExecutable = new URL(
  process.platform === "win32" ? "node_modules/.bin/prisma.cmd" : "node_modules/.bin/prisma",
  repositoryRoot,
);
const migrationFile = new URL(
  "database/prisma/migrations/20260803000000_initialize_schema/migration.sql",
  repositoryRoot,
);

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

const migration = await readFile(migrationFile, "utf8");
assert.equal(
  migration.trim(),
  result.stdout.trim(),
  "The initial migration must exactly match the current Prisma schema.",
);
