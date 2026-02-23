import { Node } from "@markdoc/markdoc";
import { reader } from "@/lib/keystatic-reader";
import type { SearchItem } from "@/types/search";

const BODY_MAX_LENGTH = 800;

function extractText(node: Node): string {
  const parts: string[] = [];
  for (const child of node.walk()) {
    if (child.type === "text" && child.attributes?.content) {
      parts.push(child.attributes.content);
    }
  }
  return parts.join(" ").replace(/\s+/g, " ").trim().slice(0, BODY_MAX_LENGTH);
}

export async function buildSearchIndex(): Promise<SearchItem[]> {
  const items: SearchItem[] = [];

  const manuals = await reader.collections.manuals.all();
  for (const m of manuals) {
    const { node } = await m.entry.content();
    items.push({
      id: `manuals:${m.slug}`,
      collection: "manuals",
      collectionLabel: "Manuals",
      slug: m.slug,
      title: m.entry.title,
      href: `/manuals/${m.slug}`,
      tags: m.entry.tags ?? [],
      meta: m.entry.client ? `Client: ${m.entry.client}` : undefined,
      body: extractText(node),
    });
  }

  const howTos = await reader.collections.how_tos.all();
  for (const h of howTos) {
    const { node } = await h.entry.content();
    items.push({
      id: `how_tos:${h.slug}`,
      collection: "how_tos",
      collectionLabel: "How To's",
      slug: h.slug,
      title: h.entry.title,
      href: `/how-tos/${h.slug}`,
      tags: h.entry.tags ?? [],
      meta: h.entry.category ? `Category: ${h.entry.category}` : undefined,
      body: extractText(node),
    });
  }

  const ambitions = await reader.collections.ambitions.all();
  for (const a of ambitions) {
    const { node } = await a.entry.content();
    items.push({
      id: `ambitions:${a.slug}`,
      collection: "ambitions",
      collectionLabel: "Ambitions",
      slug: a.slug,
      title: a.entry.title,
      href: `/ambitions/${a.slug}`,
      tags: a.entry.tags ?? [],
      meta: a.entry.status ? `Status: ${a.entry.status}` : undefined,
      body: extractText(node),
    });
  }

  const intentions = await reader.collections.intentions.all();
  for (const i of intentions) {
    const { node } = await i.entry.content();
    items.push({
      id: `intentions:${i.slug}`,
      collection: "intentions",
      collectionLabel: "Intentions",
      slug: i.slug,
      title: i.entry.title,
      href: `/intentions/${i.slug}`,
      tags: i.entry.tags ?? [],
      body: extractText(node),
    });
  }

  const learning = await reader.collections.learning.all();
  for (const l of learning) {
    const { node } = await l.entry.content();
    items.push({
      id: `learning:${l.slug}`,
      collection: "learning",
      collectionLabel: "Learning",
      slug: l.slug,
      title: l.entry.title,
      href: `/learning/${l.slug}`,
      tags: l.entry.tags ?? [],
      meta: l.entry.department ? `Department: ${l.entry.department}` : undefined,
      body: extractText(node),
    });
  }

  const workouts = await reader.collections.workouts.all();
  for (const w of workouts) {
    const { node } = await w.entry.content();
    items.push({
      id: `workouts:${w.slug}`,
      collection: "workouts",
      collectionLabel: "Workouts",
      slug: w.slug,
      title: w.entry.title,
      href: `/workouts/${w.slug}`,
      tags: w.entry.tags ?? [],
      meta: w.entry.type ? `Type: ${w.entry.type}` : undefined,
      body: extractText(node),
    });
  }

  const quotes = await reader.collections.quotes.all();
  for (const q of quotes) {
    const { node } = await q.entry.content();
    items.push({
      id: `quotes:${q.slug}`,
      collection: "quotes",
      collectionLabel: "Quotes",
      slug: q.slug,
      title: q.entry.title,
      href: `/quotes/${q.slug}`,
      tags: q.entry.tags ?? [],
      meta:
        q.entry.amount != null && q.entry.amount > 0
          ? `Amount: €${q.entry.amount}`
          : undefined,
      body: extractText(node),
    });
  }

  return items;
}
