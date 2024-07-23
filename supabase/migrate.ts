import { migrate } from "drizzle-orm/postgres-js/migrator";
import { config } from "dotenv";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

config({ path: ".env" });

async function main() {
  const migrationClient = postgres(process.env.DATABASE_URL!, {
    max: 1,
  });
  const migrationDB = drizzle(migrationClient);
  await migrate(migrationDB, {
    migrationsFolder: "./supabase/migrations",
  });
  await migrationClient.end();
}

main();
