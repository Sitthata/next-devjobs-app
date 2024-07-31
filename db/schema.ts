import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Define the table for job postings
export const jobPostingsTable = pgTable("job_postings", {
  id: serial("id").primaryKey(),
  company: text("company").notNull(),
  logo: text("logo").notNull(),
  logoBackground: text("logo_background").notNull(),
  position: text("position").notNull(),
  postedAt: timestamp("posted_at").notNull(),
  contract: text("contract").notNull(),
  location: text("location").notNull(),
  website: text("website").notNull(),
  apply: text("apply").notNull(),
  description: text("description").notNull(),
});

// Define the table for requirements
export const requirementsTable = pgTable("requirements", {
  id: serial("id").primaryKey(),
  jobPostingId: integer("job_posting_id")
    .notNull()
    .references(() => jobPostingsTable.id),
  content: text("content").notNull(),
  items: text("items").array().notNull(),
});

// Define the table for roles
export const rolesTable = pgTable("roles", {
  id: serial("id").primaryKey(),
  jobPostingId: integer("job_posting_id")
    .notNull()
    .references(() => jobPostingsTable.id),
  content: text("content").notNull(),
  items: text("items").array().notNull(),
});

export type InsertPost = typeof jobPostingsTable.$inferInsert;
export type SelectPost = typeof jobPostingsTable.$inferSelect;

export type InsertRequirement = typeof requirementsTable.$inferInsert;
export type InsertRole = typeof rolesTable.$inferInsert;
