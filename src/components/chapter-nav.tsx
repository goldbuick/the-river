import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Chapter } from "@/types/chapters";
import { Button } from "@/components/ui/button";

type ChapterNavProps = {
  prev?: Chapter;
  next?: Chapter;
};

export function ChapterNav({ prev, next }: ChapterNavProps) {
  return (
    <nav
      aria-label="Chapter navigation"
      className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6"
    >
      {prev ? (
        <Button variant="outline" asChild>
          <Link to={`/chapter/${prev.slug}`}>
            <ChevronLeft aria-hidden="true" />
            {prev.title}
          </Link>
        </Button>
      ) : (
        <span />
      )}

      {next ? (
        <Button variant="outline" asChild className="ml-auto">
          <Link to={`/chapter/${next.slug}`}>
            {next.title}
            <ChevronRight aria-hidden="true" />
          </Link>
        </Button>
      ) : null}
    </nav>
  );
}
