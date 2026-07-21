import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { ChapterPage } from "@/pages/chapter";
import { CollectionIndexPage } from "@/pages/collection-index";
import { HomePage } from "@/pages/home";
import { SheetDetailPage } from "@/pages/sheet-detail";
import { WorldPage } from "@/pages/world";
import type { CollectionId } from "@/types/world";

const collections: CollectionId[] = [
  "characters",
  "locations",
  "timeline",
  "glossary",
  "factions",
  "themes",
];

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="chapter/:slug" element={<ChapterPage />} />
            <Route path="world" element={<WorldPage />} />
            {collections.map((id) => (
              <Route key={id} path={id} element={<CollectionIndexPage collectionId={id} />} />
            ))}
            {collections.map((id) => (
              <Route
                key={`${id}-detail`}
                path={`${id}/:slug`}
                element={<SheetDetailPage collectionId={id} />}
              />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
