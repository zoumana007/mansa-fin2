import assert from "node:assert/strict";
import { test } from "node:test";

import { ConfigService } from "@nestjs/config";
import { jwtVerify } from "jose";

import type { Environment } from "../src/config/environment.js";
import { TokenService } from "../src/identity/token.service.js";

const accessSecret = "access-secret".padEnd(32, "-");
const config = new ConfigService<Environment, true>({
  ACCESS_TOKEN_SECRET: accessSecret,
  DATABASE_URL: "postgresql://localhost:5432/mansa",
  TOKEN_HASH_SECRET: "hash-secret".padEnd(32, "-"),
  PORT: 3000,
});
const tokens = new TokenService(config);

await test("refresh tokens expose no stored secret and are parseable", () => {
  const sessionId = "6b1fb7b7-f133-4bb3-bba8-052797577460";
  const refresh = tokens.createRefreshToken(sessionId);
  assert.equal(refresh.hash.length, 64);
  assert.deepEqual(tokens.parseRefreshToken(refresh.token), { sessionId, hash: refresh.hash });
  assert.equal(tokens.parseRefreshToken("invalid"), null);
});

await test("access tokens contain only bounded identity claims", async () => {
  const token = await tokens.createAccessToken(
    "c0b84d6f-0df1-43bb-8e04-7369d6d18029",
    "6b1fb7b7-f133-4bb3-bba8-052797577460",
    "FR",
  );
  const { payload } = await jwtVerify(token, new TextEncoder().encode(accessSecret), {
    issuer: "mansa-identity",
    audience: "mansa-api",
  });
  assert.equal(payload.sid, "6b1fb7b7-f133-4bb3-bba8-052797577460");
  assert.equal(payload.country, "FR");
});
