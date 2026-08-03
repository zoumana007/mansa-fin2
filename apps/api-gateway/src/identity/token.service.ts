import { createHmac, randomBytes } from "node:crypto";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { jwtVerify, SignJWT } from "jose";

import type { Environment } from "../config/environment.js";

@Injectable()
export class TokenService {
  private readonly accessSecret: Uint8Array;
  private readonly hashSecret: string;

  constructor(config: ConfigService<Environment, true>) {
    this.accessSecret = new TextEncoder().encode(
      config.get("ACCESS_TOKEN_SECRET", { infer: true }),
    );
    this.hashSecret = config.get("TOKEN_HASH_SECRET", { infer: true });
  }

  async createAccessToken(
    userId: string,
    sessionId: string,
    countryCode?: string,
  ): Promise<string> {
    const jwt = new SignJWT(
      countryCode === undefined ? { sid: sessionId } : { sid: sessionId, country: countryCode },
    )
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setSubject(userId)
      .setIssuer("mansa-identity")
      .setAudience("mansa-api")
      .setJti(randomBytes(16).toString("hex"))
      .setIssuedAt()
      .setExpirationTime("15m");
    return jwt.sign(this.accessSecret);
  }

  async verifyAccessToken(token: string): Promise<{ userId: string; sessionId: string }> {
    const { payload } = await jwtVerify(token, this.accessSecret, {
      algorithms: ["HS256"],
      issuer: "mansa-identity",
      audience: "mansa-api",
    });
    if (payload.sub === undefined || typeof payload.sid !== "string") {
      throw new Error("Invalid access token claims");
    }
    return { userId: payload.sub, sessionId: payload.sid };
  }

  createRefreshToken(sessionId: string): { token: string; hash: string } {
    const secret = randomBytes(32).toString("base64url");
    return { token: `${sessionId}.${secret}`, hash: this.hash(secret) };
  }

  parseRefreshToken(token: string): { sessionId: string; hash: string } | null {
    const separator = token.indexOf(".");
    if (separator < 1) return null;
    const sessionId = token.slice(0, separator);
    const secret = token.slice(separator + 1);
    if (!/^[0-9a-f-]{36}$/i.test(sessionId) || secret.length < 40) return null;
    return { sessionId, hash: this.hash(secret) };
  }

  hash(value: string): string {
    return createHmac("sha256", this.hashSecret).update(value).digest("hex");
  }
}
