"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
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
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      startTransition(() => {
        router.push(href);
      });
    }
  };

  return (
    <Card
      className={onClick || href ? "cursor-pointer" : undefined}
      onClick={handleClick}
    >
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
        {(onClick || href) && (
          <span className="text-blue-600 text-sm font-medium">
            Read article →
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
