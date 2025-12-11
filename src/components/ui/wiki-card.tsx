import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WikiCardProps {
  title: string;
  author: string;
  date: string;
  summary: string;
  href?: string;
  onClick?: () => void;
}

export function WikiCard({
  title,
  author,
  date,
  summary,
  href,
  onClick,
}: WikiCardProps) {
  return (
    <Card className={onClick ? "cursor-pointer" : undefined} onClick={onClick}>
      <CardHeader className="pb-2 p-4 sm:p-6 sm:pb-2">
        <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs text-muted-foreground">
          <span className="truncate max-w-[120px] sm:max-w-none">{author}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
        <CardTitle className="text-base sm:text-lg line-clamp-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="py-0 px-4 sm:px-6">
        <CardDescription className="line-clamp-3">{summary}</CardDescription>
      </CardContent>
      <CardFooter className="pt-2 p-4 sm:p-6 sm:pt-2">
        {onClick ? (
          <span className="text-blue-600 text-sm font-medium">
            Read article →
          </span>
        ) : href ? (
          <Link
            href={href}
            className="text-blue-600 hover:underline text-sm font-medium w-fit"
          >
            Read article →
          </Link>
        ) : null}
      </CardFooter>
    </Card>
  );
}
