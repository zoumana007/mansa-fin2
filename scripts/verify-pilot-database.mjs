const databaseUrl = process.env.DATABASE_URL;
const pilotEnvironment = process.env.PILOT_ENVIRONMENT;

if (pilotEnvironment !== "test") {
  throw new Error("PILOT_ENVIRONMENT must be exactly 'test'");
}

if (databaseUrl === undefined) {
  throw new Error("DATABASE_URL is required for the technical pilot");
}

const parsed = new URL(databaseUrl);
const localHosts = new Set(["127.0.0.1", "localhost", "::1"]);
const databaseName = parsed.pathname.replace(/^\//, "");

if (parsed.protocol !== "postgresql:" && parsed.protocol !== "postgres:") {
  throw new Error("The technical pilot requires PostgreSQL");
}

if (!localHosts.has(parsed.hostname) || databaseName !== "mansa_pilot") {
  throw new Error("The technical pilot is restricted to the local mansa_pilot database");
}

console.log("Pilot database safety gate passed");
