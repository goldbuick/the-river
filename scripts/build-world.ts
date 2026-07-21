import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { z } from "zod";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const contentRoot = path.join(rootDir, "content");
const generatedDir = path.join(rootDir, "src", "generated");

const production = process.argv.includes("--production");

const BaseFrontmatterSchema = z.object({
  name: z.string().min(1),
  order: z.number().int().positive(),
  draft: z.boolean().default(false),
  summary: z.string().optional(),
});

const CharacterFrontmatterSchema = BaseFrontmatterSchema.extend({
  role: z.string().min(1),
  aliases: z.array(z.string()).optional(),
});

const LocationFrontmatterSchema = BaseFrontmatterSchema.extend({
  kind: z.string().min(1),
});

const TimelineFrontmatterSchema = BaseFrontmatterSchema.extend({
  when: z.string().optional(),
});

const GlossaryFrontmatterSchema = BaseFrontmatterSchema.extend({
  category: z.string().optional(),
});

const FactionFrontmatterSchema = BaseFrontmatterSchema.extend({
  stance: z.string().optional(),
});

const ThemeFrontmatterSchema = BaseFrontmatterSchema;

type CollectionId =
  | "characters"
  | "locations"
  | "timeline"
  | "glossary"
  | "factions"
  | "themes";

type SheetOutput = {
  slug: string;
  name: string;
  order: number;
  draft: boolean;
  summary?: string;
  content: string;
  role?: string;
  aliases?: string[];
  kind?: string;
  when?: string;
  category?: string;
  stance?: string;
};

const collections: {
  id: CollectionId;
  schema: z.ZodType<{
    name: string;
    order: number;
    draft: boolean;
    summary?: string;
    role?: string;
    aliases?: string[];
    kind?: string;
    when?: string;
    category?: string;
    stance?: string;
  }>;
}[] = [
  { id: "characters", schema: CharacterFrontmatterSchema },
  { id: "locations", schema: LocationFrontmatterSchema },
  { id: "timeline", schema: TimelineFrontmatterSchema },
  { id: "glossary", schema: GlossaryFrontmatterSchema },
  { id: "factions", schema: FactionFrontmatterSchema },
  { id: "themes", schema: ThemeFrontmatterSchema },
];

function slugFromFilename(filename: string): string {
  return path.basename(filename, path.extname(filename));
}

function buildCollection(
  id: CollectionId,
  schema: (typeof collections)[number]["schema"],
): SheetOutput[] {
  const collectionDir = path.join(contentRoot, id);

  if (!fs.existsSync(collectionDir)) {
    fs.mkdirSync(collectionDir, { recursive: true });
    return [];
  }

  const files = fs
    .readdirSync(collectionDir)
    .filter((name) => name.endsWith(".md") && !name.startsWith("_"))
    .sort();

  const sheets: SheetOutput[] = [];

  for (const file of files) {
    const filePath = path.join(collectionDir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(raw);
    const frontmatter = schema.parse(data);

    if (production && frontmatter.draft) {
      continue;
    }

    sheets.push({
      slug: slugFromFilename(file),
      name: frontmatter.name,
      order: frontmatter.order,
      draft: frontmatter.draft,
      summary: frontmatter.summary,
      content: content.trim(),
      role: frontmatter.role,
      aliases: frontmatter.aliases,
      kind: frontmatter.kind,
      when: frontmatter.when,
      category: frontmatter.category,
      stance: frontmatter.stance,
    });
  }

  sheets.sort((a, b) => a.order - b.order);
  return sheets;
}

fs.mkdirSync(generatedDir, { recursive: true });

for (const collection of collections) {
  const sheets = buildCollection(collection.id, collection.schema);
  const outputPath = path.join(generatedDir, `${collection.id}.json`);
  fs.writeFileSync(outputPath, `${JSON.stringify(sheets, null, 2)}\n`, "utf8");
  console.log(
    `Wrote ${sheets.length} ${collection.id} sheet(s) to ${path.relative(rootDir, outputPath)}${production ? " (production)" : ""}`,
  );
}
