"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import summarizeArticle from "@/ai/summarize";
import redis from "@/cache";
import { authorizeUserToEditArticle } from "@/db/authz";
import db from "@/db/index";
import {
  articles,
  type CreateArticleInput,
  createArticleSchema,
  type UpdateArticleInput,
  updateArticleSchema,
} from "@/db/schema";
import { stackServerApp } from "@/stack/server";

export async function createArticle(input: CreateArticleInput) {
  const user = await stackServerApp.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const data = createArticleSchema.parse(input);

  const summary = await summarizeArticle(data.title, data.content);

  const [result] = await db
    .insert(articles)
    .values({
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl,
      slug: `${Date.now()}`,
      published: true,
      authorId: user.id,
      summary,
    })
    .returning({ id: articles.id });

  redis.del("articles:all");

  return { success: true, id: result?.id };
}

export async function updateArticle(id: string, input: UpdateArticleInput) {
  const user = await stackServerApp.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!(await authorizeUserToEditArticle(user.id, +id))) {
    throw new Error("Forbidden");
  }

  const data = updateArticleSchema.parse(input);

  const summary = await summarizeArticle(data.title || "", data.content || "");

  await db
    .update(articles)
    .set({
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl || undefined,
      summary,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(articles.id, +id));

  redis.del("articles:all");

  return { success: true };
}

export async function deleteArticle(id: string) {
  const user = await stackServerApp.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!(await authorizeUserToEditArticle(user.id, +id))) {
    throw new Error("Forbidden");
  }

  await db.delete(articles).where(eq(articles.id, +id));

  redis.del("articles:all");

  return { success: true };
}

export async function deleteArticleForm(formData: FormData): Promise<void> {
  const id = formData.get("id");
  if (!id) {
    throw new Error("Missing article id");
  }

  await deleteArticle(String(id));
  redirect("/");
}
