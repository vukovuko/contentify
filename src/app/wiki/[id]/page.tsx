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
