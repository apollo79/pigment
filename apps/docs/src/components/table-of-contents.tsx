import { Link, useLocation } from "@solidjs/router";
import { clsx } from "clsx";
import { Accessor, createEffect, createSignal, For, onCleanup, Suspense } from "solid-js";
import { createServerData$ } from "solid-start/server";

import { mods } from "../root";

interface TocItem {
  depth: number;
  text: string;
  slug: string;
}

function getHeadingsFromToc(tableOfContents: TocItem[]) {
  return tableOfContents.map(({ slug }) => {
    const el = document.getElementById(slug);

    if (!el) {
      return;
    }

    const style = window.getComputedStyle(el);
    const scrollMt = parseFloat(style.scrollMarginTop) + 1;

    const top = window.scrollY + el.getBoundingClientRect().top - scrollMt;

    return { slug, top };
  });
}

function useCurrentSection(tableOfContents: Accessor<TocItem[] | undefined>) {
  const [currentSection, setCurrentSection] = createSignal(tableOfContents()?.[0]?.slug);

  createEffect(() => {
    const toc = tableOfContents();

    if (toc == null || toc.length === 0) {
      return;
    }

    const headings = getHeadingsFromToc(toc);

    function onScroll() {
      const top = window.scrollY;
      let current = headings[0]?.slug;

      for (const heading of headings) {
        if (heading == null) {
          continue;
        }

        if (top >= heading.top) {
          current = heading.slug;
        } else {
          break;
        }
      }

      setCurrentSection(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    onScroll();

    onCleanup(() => {
      // @ts-ignore
      window.removeEventListener("scroll", onScroll, { passive: true });
    });
  });

  return currentSection;
}

export function TableOfContents() {
  const path = useLocation();

  const toc = createServerData$(
    async pathname => {
      const mod = mods[`./routes${pathname}.mdx`] ?? mods[`./routes${pathname}.md`];
      return !mod ? [] : mod.getHeadings().filter(h => h.depth > 1 && h.depth <= 3);
    },
    {
      key: () => path.pathname,
    }
  );

  const currentSection = useCurrentSection(toc);

  return (
    <div class="hidden xl:sticky xl:top-[4.5rem] xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-auto xl:py-4 xl:pe-2">
      <nav aria-labelledby="on-this-page-title" class="w-60">
        <Suspense>
          <h2
            id="on-this-page-title"
            class="font-display text-sm font-medium ms-3 text-slate-900 dark:text-white/90"
          >
            On this page
          </h2>
          <ol class="mt-3 text-sm space-y-1">
            <For each={toc()}>
              {section => (
                <li>
                  <h3>
                    <Link
                      href={`${path.pathname}#${section.slug}`}
                      class={clsx(
                        "block w-full font-sans transition font-normal rounded px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700/20",
                        section.slug === currentSection()
                          ? "text-slate-900 dark:text-slate-300"
                          : "text-slate-600 dark:text-slate-400",
                        section.depth === 3 && "ps-6"
                      )}
                    >
                      {section.text}
                    </Link>
                  </h3>
                </li>
              )}
            </For>
          </ol>
        </Suspense>
      </nav>
    </div>
  );
}
