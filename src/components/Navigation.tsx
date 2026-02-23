"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ambitions", label: "Ambitions" },
  { href: "/intentions", label: "Intentions" },
  { href: "/learning", label: "Learning" },
  { href: "/workouts", label: "Workouts" },
  { href: "/how-tos", label: "How To's" },
  { href: "/quotes", label: "Quotes" },
  { href: "/manuals", label: "Manuals" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Hamburger Button - Top Left */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-60 px-2.5 py-1 bg-dark dark:bg-light backdrop-blur-md text-light dark:text-dark rounded-lg border border-dark/10 dark:border-light/10 hover:scale-105 transition-all active:scale-95 group flex items-center justify-center min-w-[36px] h-6"
        aria-label="Toggle Menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </>
          ) : (
            <>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </>
          )}
        </svg>

        {/* Tooltip */}
        <span className="absolute left-full ml-3 px-2 py-1 rounded bg-dark dark:bg-light text-light dark:text-dark text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-sans">
          {isOpen ? "Close Menu" : "Site Menu"}
        </span>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Drawer */}
      <nav
        className={`fixed top-0 left-0 h-full w-80 bg-white/90 dark:bg-dark/90 backdrop-blur-xl z-50 shadow-2xl border-r border-dark/10 dark:border-light/10 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-8 pt-24 h-full flex flex-col">
          <div className="mb-6">
            <h2 className="text-4xl font-heading font-bold text-dark dark:text-light tracking-tight leading-none uppercase">
              SFB Kosmos
            </h2>
          </div>

          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent("sfb:open-search"));
              closeMenu();
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 mb-6 rounded-xl
                       text-dark/60 dark:text-light/60
                       hover:text-dark dark:hover:text-light
                       hover:bg-dark/5 dark:hover:bg-light/5
                       border border-dark/10 dark:border-light/10
                       transition-all duration-200"
            aria-label="Open search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <span className="text-sm font-body flex-1 text-left">Search</span>
            <kbd className="text-[9px] px-1.5 py-0.5 rounded border border-dark/20 dark:border-light/20
                            text-dark/30 dark:text-light/30 font-mono tracking-wide">
              ⌘K
            </kbd>
          </button>

          <ul className="space-y-2 grow overflow-y-auto custom-scrollbar pr-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className={`group flex items-center justify-between text-2xl font-heading uppercase py-2.5 px-4 rounded-xl transition-all duration-200 ${
                    pathname === link.href
                      ? "bg-blue/10 text-blue font-bold translate-x-1"
                      : "text-dark/60 dark:text-light/60 hover:text-dark dark:hover:text-light hover:bg-dark/5 dark:hover:bg-light/5 hover:translate-x-1"
                  }`}
                >
                  <span className="relative">
                    {link.label}
                    {pathname === link.href && (
                      <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue rounded-full" />
                    )}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-300 ${
                      pathname === link.href
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    }`}
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-dark/10 dark:border-light/10">
            <p className="text-[10px] uppercase tracking-widest text-dark/30 dark:text-light/30 font-bold">
              © 2026 SFB Kosmos
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}
