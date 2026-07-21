import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { SheetNav } from "@/components/sheet-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getAdjacentSheets,
  getCollectionMeta,
  getSheetBySlug,
  getSheets,
} from "@/data/world";
import type { CollectionId } from "@/types/world";

type SheetDetailPageProps = {
  collectionId: CollectionId;
};

function metaLines(collectionId: CollectionId, sheet: NonNullable<ReturnType<typeof getSheetBySlug>>) {
  const lines: string[] = [];
  if (collectionId === "characters" && sheet.role) lines.push(sheet.role);
  if (collectionId === "characters" && sheet.aliases?.length) {
    lines.push(`Also known as ${sheet.aliases.join(", ")}`);
  }
  if (collectionId === "locations" && sheet.kind) lines.push(sheet.kind);
  if (collectionId === "timeline" && sheet.when) lines.push(sheet.when);
  if (collectionId === "glossary" && sheet.category) lines.push(sheet.category);
  if (collectionId === "factions" && sheet.stance) lines.push(sheet.stance);
  return lines;
}

export function SheetDetailPage({ collectionId }: SheetDetailPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const meta = getCollectionMeta(collectionId);

  if (!slug) {
    return <Navigate to={meta.path} replace />;
  }

  const sheet = getSheetBySlug(collectionId, slug);

  if (!sheet) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-ui text-muted-foreground">Sheet not found.</p>
        <Button variant="outline" asChild>
          <Link to={meta.path}>Back to {meta.title.toLowerCase()}</Link>
        </Button>
      </div>
    );
  }

  const { prev, next } = getAdjacentSheets(collectionId, slug);
  const lines = metaLines(collectionId, sheet);
  const sheets = getSheets(collectionId);

  return (
    <article className="flex flex-col gap-6">
      <Button variant="ghost" className="w-fit px-0" asChild>
        <Link to={meta.path}>Back to {meta.title.toLowerCase()}</Link>
      </Button>

      <Card className="border border-border">
        <CardHeader className="gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-label tracking-[1.5px] text-muted-foreground uppercase">
              {meta.title}
            </p>
            {sheet.draft ? (
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
          <CardTitle className="text-heading">{sheet.name}</CardTitle>
          {lines.length > 0 ? (
            <div className="flex flex-col gap-1">
              {lines.map((line) => (
                <p
                  key={line}
                  className="text-label tracking-[1.5px] text-muted-foreground uppercase"
                >
                  {line}
                </p>
              ))}
            </div>
          ) : null}
        </CardHeader>
        <CardContent>
          <div className="prose-river text-ui leading-relaxed text-foreground">
            <ReactMarkdown>{sheet.content}</ReactMarkdown>
          </div>
        </CardContent>
      </Card>

      <SheetNav basePath={meta.path} prev={prev} next={next} />

      <p className="text-label tracking-[1.5px] text-muted-foreground uppercase">
        {sheets.length} {meta.title.toLowerCase()} sheet
        {sheets.length === 1 ? "" : "s"} total
      </p>
    </article>
  );
}
