import { Card, CardContent } from "@/components/ui/card";

export function WikiArticleSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-16 animate-pulse rounded bg-muted" />
        <div className="h-4 w-4 animate-pulse rounded bg-muted" />
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />
      </div>

      {/* Title */}
      <div className="mb-6">
        <div className="h-10 w-3/4 animate-pulse rounded bg-muted mb-4" />
        <div className="flex gap-4">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
        </div>
      </div>

      {/* Content Card */}
      <Card>
        <CardContent className="pt-6">
          {/* Image placeholder */}
          <div className="h-64 w-full animate-pulse rounded-lg bg-muted mb-8" />

          {/* Content lines */}
          <div className="space-y-4">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8">
        <div className="h-10 w-32 animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
