import chaptersJson from "@/generated/chapters.json";
import type { Chapter } from "@/types/chapters";

export const chapters = chaptersJson as Chapter[];

export function getChapterBySlug(slug: string): Chapter | undefined {
  return chapters.find((chapter) => chapter.slug === slug);
}

export function getAdjacentChapters(slug: string): {
  prev?: Chapter;
  next?: Chapter;
} {
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  if (index === -1) return {};

  return {
    prev: index > 0 ? chapters[index - 1] : undefined,
    next: index < chapters.length - 1 ? chapters[index + 1] : undefined,
  };
}
