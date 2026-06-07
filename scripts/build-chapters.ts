import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { z } from "zod";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const chaptersDir = path.join(rootDir, "content", "chapters");
const outputPath = path.join(rootDir, "src", "generated", "chapters.json");

const production = process.argv.includes("--production");

const FrontmatterSchema = z.object({
  title: z.string().min(1),
  order: z.number().int().positive(),
  draft: z.boolean().default(false),
  summary: z.string().optional(),
});

type ChapterOutput = {
  slug: string;
  title: string;
  order: number;
  draft: boolean;
  summary?: string;
  content: string;
};

function slugFromFilename(filename: string): string {
  return path.basename(filename, path.extname(filename));
}

function buildChapters(): ChapterOutput[] {
  if (!fs.existsSync(chaptersDir)) {
    throw new Error(`Chapters directory not found: ${chaptersDir}`);
  }

  const files = fs
    .readdirSync(chaptersDir)
    .filter((name) => name.endsWith(".md"))
    .sort();

  const chapters: ChapterOutput[] = [];

  for (const file of files) {
    const filePath = path.join(chaptersDir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const frontmatter = FrontmatterSchema.parse(data);

    if (production && frontmatter.draft) {
      continue;
    }

    chapters.push({
      slug: slugFromFilename(file),
      title: frontmatter.title,
      order: frontmatter.order,
      draft: frontmatter.draft,
      summary: frontmatter.summary,
      content: content.trim(),
    });
  }

  chapters.sort((a, b) => a.order - b.order);
  return chapters;
}

const chapters = buildChapters();
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(chapters, null, 2)}\n`, "utf8");

console.log(
  `Wrote ${chapters.length} chapter(s) to ${path.relative(rootDir, outputPath)}${production ? " (production)" : ""}`,
);
