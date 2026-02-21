import { Node } from "@markdoc/markdoc";

export interface TocHeading {
  id: string;
  level: number;
  title: string;
}

/**
 * Extracts and filters headings from a Markdoc AST node.
 */
export function extractHeadings(
  node: Node,
  minLevel: number = 2,
  maxLevel: number = 3
): TocHeading[] {
  const headings: TocHeading[] = [];

  for (const child of node.walk()) {
    if (child.type === "heading" && child.attributes.level) {
      const level = child.attributes.level;
      if (level >= minLevel && level <= maxLevel) {
        // Collect text content from heading children to form the title
        const title = child.children
          .filter((ch) => ch.type === "text" || ch.type === "inline")
          .map((ch) => {
             // For inline nodes of marks (like bold/italic), extract inner text
             if (ch.type === "inline") {
               return ch.children.filter(c => c.type === "text").map(c => c.attributes.content).join("");
             }
             return ch.attributes.content;
          })
          .join("")
          .trim();

        const id = generateId(title);
        headings.push({ id, level, title });
      }
    }
  }

  return headings;
}

/**
 * Normalizes a string into a URL-friendly slug ID (kebab-case).
 */
export function generateId(text: string): string {
  if (!text) return "";
  return text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumerics with hyphens
    .replace(/^-+|-+$/g, "");    // Remove leading/trailing hyphens
}
