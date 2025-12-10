import { notFound } from "next/navigation";
import { Suspense } from "react";
import { WikiArticleSkeleton } from "@/components/wiki-article-skeleton";
import WikiArticleViewer from "@/components/wiki-article-viewer";
import { authorizeUserToEditArticle } from "@/db/authz";
import { getArticleById } from "@/lib/data/articles";
import { stackServerApp } from "@/stack/server";

interface ViewArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

async function ArticleContent({ id }: { id: string }) {
  let canEdit = false;
  try {
    const user = await stackServerApp.getUser();
    if (user) {
      canEdit = await authorizeUserToEditArticle(user.id, +id);
    }
  } catch (_err) {
    canEdit = false;
  }

  const article = await getArticleById(+id);

  if (!article) {
    notFound();
  }

  return <WikiArticleViewer article={article} canEdit={canEdit} />;
}

export default async function ViewArticlePage({
  params,
}: ViewArticlePageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<WikiArticleSkeleton />}>
      <ArticleContent id={id} />
    </Suspense>
  );
}
