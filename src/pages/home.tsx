import { chapters } from "@/data/chapters";
import { TableOfContents } from "@/components/table-of-contents";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <section>
        <Card className="card-glow border border-border">
          <CardHeader>
            <p className="text-label tracking-[1.5px] text-smui-frost-2 uppercase">
              Fiction
            </p>
            <CardTitle className="text-stat">The River</CardTitle>
            <CardDescription className="max-w-prose text-ui leading-relaxed">
              A literary work in progress. Chapters are written in markdown, built at dev time,
              and published to GitHub Pages when drafts are ready.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-ui leading-relaxed text-muted-foreground">
              Start with the prologue, or browse the table of contents below.
            </p>
          </CardContent>
        </Card>
      </section>

      <TableOfContents chapters={chapters} />
    </div>
  );
}
