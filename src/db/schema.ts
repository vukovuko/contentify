import { usersSync } from "drizzle-orm/neon";
import { boolean, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  summary: text("summary"),
  imageUrl: text("image_url"),
  published: boolean("published").default(false).notNull(),
  authorId: text("author_id")
    .notNull()
    .references(() => usersSync.id),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
});

const schema = { articles };
export default schema;

// Drizzle type inference
export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;

// Zod validation schemas
export const insertArticleSchema = createInsertSchema(articles);
export const selectArticleSchema = createSelectSchema(articles);

// Schema for creating articles (user-provided fields only)
export const createArticleSchema = insertArticleSchema
  .pick({
    title: true,
    content: true,
  })
  .extend({
    imageUrl: z.string().url().optional(),
  });

// Schema for updating articles (all fields optional)
export const updateArticleSchema = createArticleSchema.partial();

// Type inference from Zod schemas
export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
