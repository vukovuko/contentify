import { FileText, PenLine } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { WikiCard } from "@/components/ui/wiki-card";
import { WikiCardSkeletonGrid } from "@/components/ui/wiki-card-skeleton";
import { getArticles } from "@/lib/data/articles";
import { stackServerApp } from "@/stack/server";

async function ArticleList() {
  const [articles, user] = await Promise.all([
    getArticles(),
    stackServerApp.getUser(),
  ]);

  if (articles.length === 0) {
    return (
      <Empty className="bg-card text-card-foreground rounded-xl border shadow-sm">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileText className="size-5" />
          </EmptyMedia>
          <EmptyTitle>No articles yet</EmptyTitle>
          <EmptyDescription>
            {user
              ? "Be the first to share your knowledge with the community."
              : "Sign in to create and share articles with the community."}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          {user ? (
            <Button asChild>
              <Link href="/wiki/edit/new">
                <PenLine className="size-4 mr-2" />
                Create Article
              </Link>
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href="/handler/sign-in">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/handler/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
        </EmptyContent>
      </Empty>
    );
  }

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
      <main className="max-w-2xl mx-auto mt-10 flex flex-col gap-6 px-4">
        <Suspense fallback={<WikiCardSkeletonGrid count={3} />}>
          <ArticleList />
        </Suspense>
      </main>
    </div>
  );
}
