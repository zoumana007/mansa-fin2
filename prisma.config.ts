import "dotenv/config";

import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "database/prisma/schema.prisma",
  migrations: {
    path: "database/prisma/migrations",
  },
  datasource: {
    // Validation and client generation do not connect to PostgreSQL. Database commands fail safely
    // until the environment provides a connection URL.
    url: process.env.DATABASE_URL ?? "",
  },
});
