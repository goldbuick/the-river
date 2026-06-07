export type Chapter = {
  slug: string;
  title: string;
  order: number;
  draft: boolean;
  summary?: string;
  content: string;
};
