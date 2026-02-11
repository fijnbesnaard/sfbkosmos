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

## Next Steps

- [ ] Create content in Keystatic for How To's and Manuals.
- [ ] Test syntax highlighting with various programming languages.
