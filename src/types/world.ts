export type CollectionId =
  | "characters"
  | "locations"
  | "timeline"
  | "glossary"
  | "factions"
  | "themes";

export type WorldSheet = {
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

export type CollectionMeta = {
  id: CollectionId;
  title: string;
  path: string;
  description: string;
};
