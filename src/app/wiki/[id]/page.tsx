import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import WikiArticleViewer from "@/components/wiki-article-viewer";
import { authorizeUserToEditArticle } from "@/db/authz";
import { getArticleById } from "@/lib/data/articles";
import { stackServerApp } from "@/stack/server";

interface ViewArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ViewArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(+id);

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.content.substring(0, 160),
    openGraph: {
      title: article.title,
      description: article.content.substring(0, 160),
      type: "article",
      ...(article.imageUrl && { images: [{ url: article.imageUrl }] }),
    },
  };
}

export default async function ViewArticlePage({
  params,
}: ViewArticlePageProps) {
  const { id } = await params;

  const [article, user] = await Promise.all([
    getArticleById(+id),
    stackServerApp.getUser().catch(() => null),
  ]);

  if (!article) {
    notFound();
  }

  const canEdit = user
    ? await authorizeUserToEditArticle(user.id, +id).catch(() => false)
    : false;

  return (
    <ViewTransition name={`article-${id}`} enter="expand">
      <WikiArticleViewer article={article} canEdit={canEdit} />
    </ViewTransition>
  );
}
