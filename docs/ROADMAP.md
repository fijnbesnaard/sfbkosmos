# SFB Kosmos Roadmap

Future enhancements and feature ideas for the SFB Kosmos site.

## 🔍 Search & Discovery

- **Global Search Bar**: Implement a high-performance search bar (e.g., using Fuse.js or a simple local index) to quickly find and jump to any document, ambition, or manual.
  - _Thought_: Needs to handle keyboard shortcuts (like `Cmd + K`) for that premium feel.
- **Table of Contents (TOC)**: Automatically generate a sticky/floating TOC for long documents and manuals.
  - _Goals_: Smooth scrolling to sections, highlighting the active section, and Typora-friendly structure.

## 🤖 AI Interaction Logging

- **Efficient Chat Documentation**: Create a dedicated layout or Markdoc component for documenting interactions with Gemini, Claude, etc.
  - **Goals**:
    - Instant copy-paste support.
    - Support for multiple "turns" (User/AI) in a single conversation.
    - Clear visual distinction between AI tools (different icons/colors for Gemini vs. Claude).
  - **Proposed Implementation**:
    - A custom `chat` tag or a standard HTML block (`<section class="ai-chat">`) that we can style in `globals.css`.
    - Snippets for VS Code to quickly wrap a conversation.

## 💅 UI/UX Refinements

- **Improved Responsiveness**: Audit all overview pages to ensure they look perfect on ultra-wide and mobile screens.
- **Deep Linking**: Ensure that headers have anchor links for easy sharing of specific sections.
- **Ubiquitous Print**: Verify and ensure the Print button is present and fully functional on all collection detail pages (Ambitions, Intentions, Workouts, etc.), not just Manuals and How-Tos.

**NB WHY IS MY LOGO IN .print-logo-running NOT VISIBLE IN THE PRINTED OUTPUT?**
