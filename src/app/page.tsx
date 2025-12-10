import { Suspense } from "react";
import { WikiCard } from "@/components/ui/wiki-card";
import { WikiCardSkeletonGrid } from "@/components/ui/wiki-card-skeleton";
import { getArticles } from "@/lib/data/articles";

async function ArticleList() {
  const articles = await getArticles();
  return (
    <>
      {articles.map(({ title, id, createdAt, content, author }) => (
        <WikiCard
          title={title}
          author={author ? author : "Unknown"}
          date={createdAt}
          summary={content.substring(0, 200)}
          href={`/wiki/${id}`}
          key={id}
        />
      ))}
    </>
  );
}

export default function Home() {
  return (
    <div>
      <main className="max-w-2xl mx-auto mt-10 flex flex-col gap-6">
        <Suspense fallback={<WikiCardSkeletonGrid count={3} />}>
          <ArticleList />
        </Suspense>
      </main>
    </div>
  );
}
