import charactersJson from "@/generated/characters.json";
import locationsJson from "@/generated/locations.json";
import timelineJson from "@/generated/timeline.json";
import glossaryJson from "@/generated/glossary.json";
import factionsJson from "@/generated/factions.json";
import themesJson from "@/generated/themes.json";
import type { CollectionId, CollectionMeta, WorldSheet } from "@/types/world";

export const collectionMeta: CollectionMeta[] = [
  {
    id: "characters",
    title: "Characters",
    path: "/characters",
    description: "People in the story — what is known so far.",
  },
  {
    id: "locations",
    title: "Locations",
    path: "/locations",
    description: "Places, shores, and rooms the story moves through.",
  },
  {
    id: "timeline",
    title: "Timeline",
    path: "/timeline",
    description: "What is known to have happened, in order.",
  },
  {
    id: "glossary",
    title: "Glossary",
    path: "/glossary",
    description: "Terms, objects, and river lore worth tracking.",
  },
  {
    id: "factions",
    title: "Factions",
    path: "/factions",
    description: "Groups and shared aims around the river.",
  },
  {
    id: "themes",
    title: "Themes",
    path: "/themes",
    description: "Recurring motifs — water, memory, silence, and more.",
  },
];

const byId: Record<CollectionId, WorldSheet[]> = {
  characters: charactersJson as WorldSheet[],
  locations: locationsJson as WorldSheet[],
  timeline: timelineJson as WorldSheet[],
  glossary: glossaryJson as WorldSheet[],
  factions: factionsJson as WorldSheet[],
  themes: themesJson as WorldSheet[],
};

export function getCollectionMeta(id: CollectionId): CollectionMeta {
  const meta = collectionMeta.find((entry) => entry.id === id);
  if (!meta) {
    throw new Error(`Unknown collection: ${id}`);
  }
  return meta;
}

export function getSheets(id: CollectionId): WorldSheet[] {
  return byId[id];
}

export function getSheetBySlug(
  id: CollectionId,
  slug: string,
): WorldSheet | undefined {
  return byId[id].find((sheet) => sheet.slug === slug);
}

export function getAdjacentSheets(
  id: CollectionId,
  slug: string,
): { prev?: WorldSheet; next?: WorldSheet } {
  const sheets = byId[id];
  const index = sheets.findIndex((sheet) => sheet.slug === slug);
  if (index === -1) return {};

  return {
    prev: index > 0 ? sheets[index - 1] : undefined,
    next: index < sheets.length - 1 ? sheets[index + 1] : undefined,
  };
}
