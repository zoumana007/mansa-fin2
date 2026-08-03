/* eslint-disable @typescript-eslint/no-floating-promises -- node:test registers tests synchronously. */
import assert from "node:assert/strict";
import { test } from "node:test";

import { validateEnvironment } from "../src/config/environment.js";

test("environment validation rejects short secrets", () => {
  assert.throws(() =>
    validateEnvironment({
      DATABASE_URL: "postgresql://localhost/mansa",
      ACCESS_TOKEN_SECRET: "short",
    }),
  );
});

test("environment validation accepts explicit secure values", () => {
  const environment = validateEnvironment({
    DATABASE_URL: "postgresql://localhost:5432/mansa".padEnd(32, "/"),
    ACCESS_TOKEN_SECRET: "a".repeat(32),
    TOKEN_HASH_SECRET: "b".repeat(32),
    PORT: "3001",
  });
  assert.equal(environment.PORT, 3001);
});
