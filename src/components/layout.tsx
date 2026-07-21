import { Link, Outlet } from "react-router-dom";
import { BookOpen, Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Layout() {
  const { theme, setTheme } = useTheme();
  const isDark = theme !== "light";

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-heading font-semibold tracking-[1.5px] uppercase transition-colors hover:text-primary"
            >
              <BookOpen className="size-5 text-smui-frost-2" aria-hidden="true" />
              The River
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                to="/world"
                className="text-label tracking-[1.5px] text-muted-foreground uppercase transition-colors hover:text-primary"
              >
                World
              </Link>
            </nav>
          </div>

          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-6 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto w-full max-w-3xl px-6 py-4">
          <Separator className="mb-4" />
          <p className="text-label tracking-[1.5px] text-muted-foreground uppercase">
            A story in progress
          </p>
        </div>
      </footer>
    </div>
  );
}
