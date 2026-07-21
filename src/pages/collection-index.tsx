import { Link } from "react-router-dom";

import { SheetList } from "@/components/sheet-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCollectionMeta, getSheets } from "@/data/world";
import type { CollectionId } from "@/types/world";

type CollectionIndexPageProps = {
  collectionId: CollectionId;
};

function sheetEyebrow(collectionId: CollectionId) {
  return (sheet: ReturnType<typeof getSheets>[number]) => {
    if (collectionId === "characters" && sheet.role) return sheet.role;
    if (collectionId === "locations" && sheet.kind) return sheet.kind;
    if (collectionId === "timeline" && sheet.when) return sheet.when;
    if (collectionId === "glossary" && sheet.category) return sheet.category;
    if (collectionId === "factions" && sheet.stance) return sheet.stance;
    return String(sheet.order).padStart(2, "0");
  };
}

export function CollectionIndexPage({ collectionId }: CollectionIndexPageProps) {
  const meta = getCollectionMeta(collectionId);
  const sheets = getSheets(collectionId);

  return (
    <div className="flex flex-col gap-8">
      <Button variant="ghost" className="w-fit px-0" asChild>
        <Link to="/world">Back to world</Link>
      </Button>

      <Card className="border border-border">
        <CardHeader>
          <p className="text-label tracking-[1.5px] text-smui-frost-2 uppercase">
            World
          </p>
          <CardTitle className="text-heading">{meta.title}</CardTitle>
          <CardDescription className="max-w-prose text-ui leading-relaxed">
            {meta.description}
          </CardDescription>
        </CardHeader>
      </Card>

      <SheetList
        sheets={sheets}
        basePath={meta.path}
        emptyHint={`No ${meta.title.toLowerCase()} sheets yet. Add markdown files to content/${collectionId}/.`}
        eyebrow={sheetEyebrow(collectionId)}
      />
    </div>
  );
}
