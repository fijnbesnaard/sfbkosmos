import { buildSearchIndex } from "@/lib/search-index";
import type { SearchItem } from "@/types/search";
import Fuse from "fuse.js";
import Link from "next/link";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

const FUSE_OPTIONS: Fuse.IFuseOptions<SearchItem> = {
  keys: [
    { name: "title", weight: 3 },
    { name: "tags", weight: 2 },
    { name: "body", weight: 1 },
    { name: "meta", weight: 0.5 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
  includeScore: true,
};

const COLLECTION_ORDER = [
  "manuals",
  "how_tos",
  "ambitions",
  "intentions",
  "learning",
  "workouts",
  "quotes",
];

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const index = await buildSearchIndex();

  let results: SearchItem[] = [];
  if (query.length >= 2) {
    const fuse = new Fuse(index, FUSE_OPTIONS);
    results = fuse.search(query).map((r) => r.item);
  }

  const grouped = results.reduce<Record<string, SearchItem[]>>((acc, item) => {
    if (!acc[item.collection]) acc[item.collection] = [];
    acc[item.collection].push(item);
    return acc;
  }, {});

  const sortedGroups = COLLECTION_ORDER.filter((c) => grouped[c]);

  return (
    <main className="max-w-4xl mx-auto p-8">
      <header className="mb-12 border-b border-dark/10 dark:border-light/10 pb-8">
        <h1 className="text-4xl font-heading font-bold mb-4 uppercase text-dark dark:text-light">
          Search
        </h1>
        {query && (
          <p className="text-dark/60 dark:text-light/60 text-lg">
            {results.length} result{results.length !== 1 ? "s" : ""} for{" "}
            <span className="font-semibold text-dark dark:text-light">
              &ldquo;{query}&rdquo;
            </span>
          </p>
        )}
      </header>

      {/* No query */}
      {!query && (
        <p className="text-dark/50 dark:text-light/50">
          Press{" "}
          <kbd className="text-[11px] px-1.5 py-0.5 rounded border border-dark/20 dark:border-light/20 font-mono">
            ⌘K
          </kbd>{" "}
          to open the search modal, or enter a query in the URL with{" "}
          <code className="text-sm">?q=your+query</code>.
        </p>
      )}

      {/* No results */}
      {query && results.length === 0 && (
        <p className="text-dark/50 dark:text-light/50">
          No results found for &ldquo;{query}&rdquo;. Try a different term.
        </p>
      )}

      {/* Grouped results */}
      {sortedGroups.map((collectionKey) => {
        const group = grouped[collectionKey];
        const label = group[0].collectionLabel;
        return (
          <section key={collectionKey} className="mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-dark/40 dark:text-light/40 mb-4 font-heading">
              {label}{" "}
              <span className="font-body font-normal text-dark/30 dark:text-light/30">
                ({group.length})
              </span>
            </h2>
            <div className="space-y-3">
              {group.map((item) => (
                <article
                  key={item.id}
                  className="border border-dark/10 dark:border-light/10 rounded-xl p-5
                             hover:border-blue/40 hover:bg-blue/5 transition-all duration-200"
                >
                  <Link href={item.href} className="block group">
                    <h3 className="text-xl font-heading font-bold uppercase text-dark dark:text-light
                                   group-hover:text-blue transition-colors duration-200 mb-1">
                      {item.title}
                    </h3>
                    {item.meta && (
                      <p className="text-sm text-dark/50 dark:text-light/50 mb-2">
                        {item.meta}
                      </p>
                    )}
                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 bg-dark/5 dark:bg-light/5
                                       text-dark/60 dark:text-light/60 text-xs rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
