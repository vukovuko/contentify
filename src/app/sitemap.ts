import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/data/articles";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const articles = await getArticles();

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/wiki/${article.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...articleUrls,
  ];
}
