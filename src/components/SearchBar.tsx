"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import type { SearchItem } from "@/types/search";

// Module-level cache — persists across modal opens within one page session
let cachedFuse: Fuse<SearchItem> | null = null;

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

const MAX_RESULTS = 8;

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const loadIndex = useCallback(async () => {
    if (cachedFuse) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/search-index");
      const data: SearchItem[] = await res.json();
      cachedFuse = new Fuse(data, FUSE_OPTIONS);
    } catch (e) {
      console.error("Failed to load search index", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openModal = useCallback(async () => {
    setIsOpen(true);
    setQuery("");
    setResults([]);
    setActiveIndex(0);
    await loadIndex();
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [loadIndex]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setResults([]);
    setActiveIndex(0);
  }, []);

  // Custom event from Navigation drawer
  useEffect(() => {
    const handler = () => openModal();
    window.addEventListener("sfb:open-search", handler);
    return () => window.removeEventListener("sfb:open-search", handler);
  }, [openModal]);

  // Global Cmd+K / Ctrl+K / Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          closeModal();
        } else {
          openModal();
        }
      }
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, openModal, closeModal]);

  // Run search on query change
  useEffect(() => {
    if (!cachedFuse || !query.trim()) {
      setResults([]);
      setTotalCount(0);
      setActiveIndex(0);
      return;
    }
    const fuseResults = cachedFuse.search(query.trim());
    const all = fuseResults.map((r) => r.item);
    setTotalCount(all.length);
    setResults(all.slice(0, MAX_RESULTS));
    setActiveIndex(0);
  }, [query]);

  // Keyboard navigation in results list
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[activeIndex]) {
        router.push(results[activeIndex].href);
        closeModal();
      } else if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        closeModal();
      }
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.children[activeIndex] as HTMLElement;
    activeEl?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[70]"
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="fixed top-[15vh] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-xl z-[80]
                   bg-white/95 dark:bg-dark/95 backdrop-blur-xl
                   border border-dark/10 dark:border-light/10
                   rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-dark/10 dark:border-light/10">
          <svg
            className="w-4 h-4 shrink-0 text-dark/40 dark:text-light/40"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search everything..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-dark dark:text-light text-base outline-none
                       placeholder:text-dark/40 dark:placeholder:text-light/40"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded
                          border border-dark/20 dark:border-light/20
                          text-dark/40 dark:text-light/40 font-mono">
            ESC
          </kbd>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="px-4 py-8 text-center text-sm text-dark/40 dark:text-light/40">
            Loading…
          </div>
        )}

        {/* No results */}
        {!isLoading && query.trim().length >= 2 && results.length === 0 && (
          <div className="px-4 py-8 text-center text-sm text-dark/40 dark:text-light/40">
            No results for{" "}
            <span className="font-semibold text-dark dark:text-light">
              &ldquo;{query}&rdquo;
            </span>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <>
            <ul ref={listRef} role="listbox" className="max-h-80 overflow-y-auto py-2">
              {results.map((item, idx) => (
                <li key={item.id} role="option" aria-selected={idx === activeIndex}>
                  <button
                    onClick={() => {
                      router.push(item.href);
                      closeModal();
                    }}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className={`w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors duration-100 ${
                      idx === activeIndex
                        ? "bg-blue/10"
                        : "hover:bg-dark/5 dark:hover:bg-light/5"
                    }`}
                  >
                    {/* Collection badge */}
                    <span
                      className={`mt-0.5 shrink-0 text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded font-heading ${
                        idx === activeIndex
                          ? "bg-blue/20 text-blue"
                          : "bg-dark/8 dark:bg-light/8 text-dark/50 dark:text-light/50"
                      }`}
                    >
                      {item.collectionLabel}
                    </span>

                    <span className="flex-1 min-w-0">
                      <span
                        className={`block text-sm font-semibold truncate leading-tight ${
                          idx === activeIndex
                            ? "text-blue"
                            : "text-dark dark:text-light"
                        }`}
                      >
                        {item.title}
                      </span>
                      {item.meta && (
                        <span className="block text-xs text-dark/50 dark:text-light/50 truncate mt-0.5">
                          {item.meta}
                        </span>
                      )}
                    </span>

                    {idx === activeIndex && (
                      <svg
                        className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Footer */}
            <div className="border-t border-dark/10 dark:border-light/10 px-4 py-2">
              <button
                onClick={() => {
                  router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                  closeModal();
                }}
                className="w-full text-left text-xs text-dark/50 dark:text-light/50
                           hover:text-blue transition-colors py-1"
              >
                See all {totalCount} result{totalCount !== 1 ? "s" : ""} for &ldquo;
                {query}&rdquo; &rarr;
              </button>
            </div>
          </>
        )}

        {/* Empty state */}
        {!isLoading && !query.trim() && (
          <div className="px-4 py-8 text-center text-sm text-dark/40 dark:text-light/40">
            Type to search across all collections
          </div>
        )}
      </div>
    </>
  );
}
