import assert from "node:assert/strict";
import { test } from "node:test";

import { verifyRepositoryStructure } from "../scripts/verify-structure.mjs";

await test("the P0-02 repository structure is complete", async () => {
  await assert.doesNotReject(verifyRepositoryStructure(new URL("../", import.meta.url)));
});
