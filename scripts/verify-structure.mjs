import { access } from "node:fs/promises";

const requiredPaths = [
  ".github/workflows/ci.yml",
  "apps",
  "docs",
  "infrastructure",
  "package.json",
  "packages",
  "pnpm-workspace.yaml",
  "scripts",
  "services",
  "tests",
  "tools",
  "tsconfig.base.json",
  "turbo.json",
];

/**
 * @param {URL} rootDirectory
 */
export async function verifyRepositoryStructure(rootDirectory) {
  await Promise.all(requiredPaths.map((path) => access(new URL(path, rootDirectory))));
}
