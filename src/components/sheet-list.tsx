import { Link } from "react-router-dom";

import type { WorldSheet } from "@/types/world";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type SheetListProps = {
  sheets: WorldSheet[];
  basePath: string;
  emptyHint: string;
  eyebrow?: (sheet: WorldSheet) => string | undefined;
};

function SheetStatus({ draft }: { draft: boolean }) {
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

export function SheetList({
  sheets,
  basePath,
  emptyHint,
  eyebrow,
}: SheetListProps) {
  if (sheets.length === 0) {
    return <p className="text-ui text-muted-foreground">{emptyHint}</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {sheets.map((sheet) => {
        const label = eyebrow?.(sheet);
        return (
          <li key={sheet.slug}>
            <Link to={`${basePath}/${sheet.slug}`} className="block">
              <Card className={cn("card-glow border border-border")}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      {label ? (
                        <p className="text-label tracking-[1.5px] text-muted-foreground uppercase">
                          {label}
                        </p>
                      ) : (
                        <p className="text-label tracking-[1.5px] text-muted-foreground uppercase">
                          {String(sheet.order).padStart(2, "0")}
                        </p>
                      )}
                      <CardTitle>{sheet.name}</CardTitle>
                    </div>
                    <SheetStatus draft={sheet.draft} />
                  </div>
                  {sheet.summary ? (
                    <CardDescription>{sheet.summary}</CardDescription>
                  ) : null}
                </CardHeader>
              </Card>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
