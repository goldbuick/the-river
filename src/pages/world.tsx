import { Link } from "react-router-dom";

import { collectionMeta } from "@/data/world";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function WorldPage() {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <Card className="card-glow border border-border">
          <CardHeader>
            <p className="text-label tracking-[1.5px] text-smui-frost-2 uppercase">
              World
            </p>
            <CardTitle className="text-stat">Sheets</CardTitle>
            <CardDescription className="max-w-prose text-ui leading-relaxed">
              Characters, places, chronology, and motifs — public notes for readers and
              for the work of telling the story.
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-label tracking-[1.5px] text-muted-foreground uppercase">
          Collections
        </h2>
        <ul className="flex flex-col gap-3">
          {collectionMeta.map((collection) => (
            <li key={collection.id}>
              <Link to={collection.path} className="block">
                <Card className={cn("card-glow border border-border")}>
                  <CardHeader>
                    <CardTitle>{collection.title}</CardTitle>
                    <CardDescription>{collection.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
