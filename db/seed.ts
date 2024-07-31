import { db } from './index';
import { config } from "dotenv";
import postgres from "postgres";
import {
  InsertPost,
  jobPostingsTable,
  requirementsTable,
  rolesTable,
  InsertRequirement,
  InsertRole
} from "./schema";
import data from "@/starter-code/data.json";

config({ path: ".env.local" });
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env");
}

const client = postgres(process.env.DATABASE_URL!, {
  max: 1,
});

async function main() {
  try {
    await resetData();
    console.log("Seeding...");

    for (const post of data) {
      console.log(`Processing post with company: ${post.company}`);

      const jobPostingData: InsertPost = {
        company: post.company,
        logo: post.logo,
        logoBackground: post.logoBackground,
        position: post.position,
        postedAt: new Date(),
        contract: post.contract,
        location: post.location,
        website: post.website,
        apply: post.apply,
        description: post.description,
      };

      try {
        // Insert job posting
        console.log("Inserting job posting...");
        const jobPostingResult = await db
          .insert(jobPostingsTable)
          .values(jobPostingData)
          .returning();
        const jobPostingId = jobPostingResult[0].id;
        console.log(`Inserted job posting with ID: ${jobPostingId}`);

        const requirementData: InsertRequirement = {
          jobPostingId,
          content: post.requirements.content,
          items: post.requirements.items,
        };
        console.log("Inserting requirements...");
        await db.insert(requirementsTable).values(requirementData);
        console.log("Inserted requirements.");

        const roleData: InsertRole = {
          jobPostingId,
          content: post.role.content,
          items: post.role.items,
        };
        console.log("Inserting roles...");
        await db.insert(rolesTable).values(roleData);
        console.log("Inserted roles.");
      } catch (error) {
        console.error(
          `Error processing post with company: ${post.company}`,
          error
        );
      }
    }

    console.log("Data insertion complete.");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await client.end(); // Close the connection
  }
}

const resetData = async () => {
  try {
    console.log("Resetting data...");
    await db.delete(requirementsTable);
    await db.delete(rolesTable);
    await db.delete(jobPostingsTable);
    console.log("Data reset complete.");
  } catch (error) {
    console.error("Error resetting data:", error);
  }
};

main();
