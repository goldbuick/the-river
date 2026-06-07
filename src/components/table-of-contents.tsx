import { Link } from "react-router-dom";

import type { Chapter } from "@/types/chapters";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TableOfContentsProps = {
  chapters: Chapter[];
};

function ChapterStatus({ draft }: { draft: boolean }) {
  if (draft) {
    return (
      <Badge className="text-smui-yellow">
        <span className="size-1.5 rounded-full bg-smui-yellow" aria-hidden="true" />
        Draft
      </Badge>
    );
  }

  return (
    <Badge className="text-smui-green">
      <span className="size-1.5 rounded-full bg-smui-green" aria-hidden="true" />
      Published
    </Badge>
  );
}

export function TableOfContents({ chapters }: TableOfContentsProps) {
  if (chapters.length === 0) {
    return (
      <p className="text-ui text-muted-foreground">
        No chapters yet. Add markdown files to <code>content/chapters/</code>.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-label tracking-[1.5px] text-muted-foreground uppercase">Chapters</h2>
      <ul className="flex flex-col gap-3">
        {chapters.map((chapter) => (
          <li key={chapter.slug}>
            <Link to={`/chapter/${chapter.slug}`} className="block">
              <Card className={cn("card-glow border border-border")}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-label tracking-[1.5px] text-muted-foreground uppercase">
                        {String(chapter.order).padStart(2, "0")}
                      </p>
                      <CardTitle>{chapter.title}</CardTitle>
                    </div>
                    <ChapterStatus draft={chapter.draft} />
                  </div>
                  {chapter.summary ? (
                    <CardDescription>{chapter.summary}</CardDescription>
                  ) : null}
                </CardHeader>
                {chapter.summary ? null : <CardContent className="pt-0" />}
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
