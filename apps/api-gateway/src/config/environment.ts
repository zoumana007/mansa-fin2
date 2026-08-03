export interface Environment {
  ACCESS_TOKEN_SECRET: string;
  DATABASE_URL: string;
  TOKEN_HASH_SECRET: string;
  PORT: number;
}

export function validateEnvironment(input: Record<string, unknown>): Environment {
  const secrets = ["ACCESS_TOKEN_SECRET", "TOKEN_HASH_SECRET"] as const;
  for (const key of secrets) {
    if (typeof input[key] !== "string" || input[key].length < 32) {
      throw new Error(`${key} must contain at least 32 characters`);
    }
  }
  if (typeof input.DATABASE_URL !== "string" || input.DATABASE_URL.length === 0) {
    throw new Error("DATABASE_URL is required");
  }

  const port = Number(input.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error("PORT must be a valid TCP port");
  }

  return {
    ACCESS_TOKEN_SECRET: input.ACCESS_TOKEN_SECRET as string,
    DATABASE_URL: input.DATABASE_URL,
    TOKEN_HASH_SECRET: input.TOKEN_HASH_SECRET as string,
    PORT: port,
  };
}
