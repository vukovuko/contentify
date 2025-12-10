import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function WikiCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="h-3 w-16 animate-pulse rounded bg-muted" />
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-5 w-3/5 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent className="py-0">
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-muted" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="h-4 w-24 animate-pulse rounded bg-muted" />
      </CardFooter>
    </Card>
  );
}

export function WikiCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <WikiCardSkeleton key={i} />
      ))}
    </>
  );
}
