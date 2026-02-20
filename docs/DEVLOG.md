# Development Log

## [2026-02-09] Project Initialization

- Initialized documentation structure with `docs/DEVLOG.md`.
- Established feature branch workflow:
  - Create a new branch for each feature.
  - Merge back to `main` upon completion.
  - Document progress in this log.

- [2026-02-10] Implemented "Golden Standard" Typography System
  - Configured Modular Scale (Major Third 1.250) in `globals.css`.
  - Added `@tailwindcss/typography` plugin with custom font settings (Compacta headings, Inter body).
  - Implemented Paged.js print optimizations (A4, margins, orphan/widow control).
  - Created usage example at `/typography`.

- [2026-02-11] Implemented Shiki Syntax Highlighting for Markdoc Content
  - Installed `shiki`, `@shikijs/transformers`, and `@markdoc/markdoc` packages.
  - Created `MarkdocRenderer` component for parsing and rendering Markdoc content.
  - Implemented async `Fence` component for server-side code highlighting with SynthWave '84 theme.
  - Added `CodeBlock` client component with copy-to-clipboard functionality.
  - Created routes for How To's (`/how-tos`) and Manuals (`/manuals`) collections.
  - Updated Keystatic config to use local storage in development mode.
  - Fixed TypeScript path aliases to point to `src/` directory.
  - Added CSS styling for code blocks with proper spacing and overflow handling.

- [2026-02-19] Custom Color Palette Integration
  - Created branch `feature/custom-colors-light-dark-mode`.
  - Added custom color variables to `globals.css` (Tailwind v4 `@theme` configuration).
  - Defined: light, dark, blue, yellow, orange, pink, red.
  - Implemented `ThemeSwitcher` component with persistence and system preference support.
  - Refined `ThemeSwitcher` UI to a compact toggle design.
  - Merged feature branch into `main`.

- [2026-02-19] Paged.js Styling & Functionality Enhancements
  - Created branch `feature/pagedjs-enhancements`.
  - Implemented reusable `PrintPreview` component with Paged.js polyfill integration.
  - Added advanced `@page` rules in `globals.css`:
    - Running headers: Document title (top-right) and site name (top-left).
    - Page numbering: "Page X of Y" (bottom-right).
  - Integrated `PrintPreview` into `typography`, `how-tos`, and `manuals` pages.
  - Optimized print styles for better readability and professional layout:
    - Used `--dark` color for all print text and margin areas.
    - Set light font weight (300) for running headers and footers.
    - Replaced text in `@top-left` with `sfb.svg` logo.
  - Resolved Paged.js crash and blank preview issues:
    - Implemented deep CSS sanitization for Tailwind's complex `:where` and `not-prose` selectors.
    - Switched to localized stylesheet injection (fetching and sanitizing external CSS).
    - Added a loading spinner overlay for better UX during fragmentation.
    - Guaranteed light mode themes for all printed pages.
  - Implemented custom Markdoc tools for print layouts:
    - **Page Break**: `{% page_break %}` forces content to the next page.
    - **Line Break**: `{% br /%}` forces a line break (useful in tables).
    - **Image Grid**: `{% image_grid %}` ... `{% /image_grid %}` for 2-column images.
    - **Full Width**: `{% full_width %}` ... `{% /full_width %}` for page-spanning images.
  - [2026-02-20] Dark Mode Refinements & Code Block Usability
    - Implemented a robust CSS variable-based theme switching system (`--foreground`, `--background`, `--border-primary`).
    - Corrected Markdoc content styles to ensure headers, tables, and text adapt perfectly to dark mode.
    - Added automatic code block wrapping (`white-space: pre-wrap`) for both web and print to enhance usability.
    - Optimized code block font size (8pt) for print manuals to prevent horizontal scrolling on paper.
    - Refined Paged.js CSS sanitization to preserve essential Tailwind Typography styles while preventing rendering crashes.

- [2026-02-19] Keystatic Editor & Markdoc Robustness
  - Resolved Keystatic validation errors by registering custom tags in `keystatic.config.ts`.
  - Fixed a "createAndFill" runtime crash by correctly categorizing components (`inline` vs `block` vs `wrapper`).
  - Implemented the `{% br /%}` tag as a proper **inline** component for use in tables and constrained text areas.
  - Eliminated editor-only TypeScript squiggles using `@ts-ignore` and mandatory `icon` properties.

## Next Steps

- [ ] Implement PDF download button functionality if server-side generation is needed.
- [ ] Explore further margin area customizations (e.g. copyright, date).
- [ ] Investigate potential "Table of Contents" auto-generation for larger manuals using Paged.js.
