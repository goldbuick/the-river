import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { ChapterNav } from "@/components/chapter-nav";
import { chapters, getAdjacentChapters, getChapterBySlug } from "@/data/chapters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ChapterPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-ui text-muted-foreground">Chapter not found.</p>
        <Button variant="outline" asChild>
          <Link to="/">Back to contents</Link>
        </Button>
      </div>
    );
  }

  const { prev, next } = getAdjacentChapters(slug);

  return (
    <article className="flex flex-col gap-6">
      <Button variant="ghost" className="w-fit px-0" asChild>
        <Link to="/">Back to contents</Link>
      </Button>

      <Card className="border border-border">
        <CardHeader className="gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-label tracking-[1.5px] text-muted-foreground uppercase">
              Chapter {String(chapter.order).padStart(2, "0")}
            </p>
            {chapter.draft ? (
              <Badge className="text-smui-yellow">
                <span className="size-1.5 rounded-full bg-smui-yellow" aria-hidden="true" />
                Draft
              </Badge>
            ) : (
              <Badge className="text-smui-green">
                <span className="size-1.5 rounded-full bg-smui-green" aria-hidden="true" />
                Published
              </Badge>
            )}
          </div>
          <CardTitle className="text-heading">{chapter.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose-river text-ui leading-relaxed text-foreground">
            <ReactMarkdown>{chapter.content}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      <ChapterNav prev={prev} next={next} />

      {chapters.length === 0 ? null : (
        <p className="text-label tracking-[1.5px] text-muted-foreground uppercase">
          {chapters.length} chapter{chapters.length === 1 ? "" : "s"} total
        </p>
      )}
    </article>
  );
}
