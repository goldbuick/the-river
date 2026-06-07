import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { ChapterPage } from "@/pages/chapter";
import { HomePage } from "@/pages/home";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="chapter/:slug" element={<ChapterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
