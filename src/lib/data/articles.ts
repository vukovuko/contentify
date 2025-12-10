import { desc, eq } from "drizzle-orm";
import { usersSync } from "drizzle-orm/neon";
import redis from "@/cache";
import db from "@/db/index";
import { articles } from "@/db/schema";

type ArticleListItem = {
  title: string;
  id: number;
  createdAt: string;
  content: string;
  author: string | null;
};

export async function getArticles() {
  const cached = await redis.get<ArticleListItem[]>("articles:all");
  if (cached) {
    return cached;
  }

  const response = await db
    .select({
      title: articles.title,
      id: articles.id,
      createdAt: articles.createdAt,
      content: articles.content,
      author: usersSync.name,
    })
    .from(articles)
    .leftJoin(usersSync, eq(articles.authorId, usersSync.id))
    .orderBy(desc(articles.updatedAt));

  redis.set("articles:all", response, {
    ex: 60,
  });

  return response;
}

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
  return response[0] ? response[0] : null;
}
