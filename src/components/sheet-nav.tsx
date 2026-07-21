import { Link } from "react-router-dom";

import type { WorldSheet } from "@/types/world";
import { Button } from "@/components/ui/button";

type SheetNavProps = {
  basePath: string;
  prev?: WorldSheet;
  next?: WorldSheet;
};

export function SheetNav({ basePath, prev, next }: SheetNavProps) {
  if (!prev && !next) return null;

  return (
    <nav className="flex flex-wrap items-center justify-between gap-3">
      {prev ? (
        <Button variant="outline" asChild>
          <Link to={`${basePath}/${prev.slug}`}>← {prev.name}</Link>
        </Button>
      ) : (
        <span />
      )}
      {next ? (
        <Button variant="outline" asChild>
          <Link to={`${basePath}/${next.slug}`}>{next.name} →</Link>
        </Button>
      ) : null}
    </nav>
  );
}
