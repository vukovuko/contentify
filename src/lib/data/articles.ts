import { desc, eq } from "drizzle-orm";
import { usersSync } from "drizzle-orm/neon";
import { cache } from "react";
import redis from "@/cache";
import db from "@/db/index";
import { articles } from "@/db/schema";

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// The list view selects only a subset of Article fields and adds the author's
// resolved name. Use a dedicated type for the list response.
export type ArticleList = {
  id: number;
  title: string;
  createdAt: string;
  summary: string | null;
  content: string;
  author: string | null;
  authorId: string | null;
  imageUrl?: string | null;
};

export const getArticles = cache(async (): Promise<ArticleList[]> => {
  const cached = await redis.get<ArticleList[]>("articles:all");
  if (cached) {
    return cached;
  }

  const response = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      summary: articles.summary,
      content: articles.content,
      author: usersSync.name,
      authorId: articles.authorId,
    })
    .from(articles)
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id))
    .orderBy(desc(articles.updatedAt));

  const formatted = response.map((article) => ({
    ...article,
    createdAt: formatDate(article.createdAt),
  }));

  // Store cache as JSON so we can retrieve a typed array later
  try {
    await redis.set("articles:all", JSON.stringify(formatted), {
      ex: 60,
    });
  } catch (err) {
    console.warn("Failed to set articles cache", err);
  }
  return formatted as ArticleList[];
});

export type ArticleWithAuthor = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  imageUrl?: string | null;
  author: string | null;
};

export async function getArticleById(id: number) {
  const response = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      content: articles.content,
      author: usersSync.name,
      imageUrl: articles.imageUrl,
    })
    .from(articles)
    .where(eq(articles.id, id))
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id));

  if (!response[0]) return null;

  return {
    ...response[0],
    createdAt: formatDate(response[0].createdAt),
  } as ArticleWithAuthor;
}
