export interface SearchItem {
  id: string; // `${collection}:${slug}`
  collection: string; // "manuals", "how_tos", "ambitions", etc.
  collectionLabel: string; // "Manuals", "How To's", etc.
  slug: string;
  title: string;
  href: string;
  tags: string[];
  meta?: string; // e.g. "Client: Acme" | "Status: published"
  body?: string; // plain-text excerpt from document content
}
