import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "fijnbesnaard/sfbkosmos", // Assuming username/repo based on prompt context, will need user to confirm or set env var if diff
  },
  collections: {
    ambitions: collection({
      label: "Ambitions",
      slugField: "title",
      path: "src/content/ambitions/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "Draft", value: "draft" },
            { label: "Published", value: "published" },
            { label: "Archived", value: "archived" },
          ],
          defaultValue: "draft",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        isAI: fields.checkbox({
          label: "Is AI Interaction",
          defaultValue: false,
        }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
    intentions: collection({
      label: "Intentions",
      slugField: "title",
      path: "src/content/intentions/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        isAI: fields.checkbox({
          label: "Is AI Interaction",
          defaultValue: false,
        }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
    learning: collection({
      label: "Learning",
      slugField: "title",
      path: "src/content/learning/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        department: fields.text({ label: "Department" }),
        progress: fields.integer({
          label: "Progress (%)",
          defaultValue: 0,
          validation: { min: 0, max: 100 },
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        isAI: fields.checkbox({
          label: "Is AI Interaction",
          defaultValue: false,
        }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
    workouts: collection({
      label: "Workouts",
      slugField: "title",
      path: "src/content/workouts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({ label: "Date" }),
        type: fields.text({ label: "Type" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        isAI: fields.checkbox({
          label: "Is AI Interaction",
          defaultValue: false,
        }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
    how_tos: collection({
      label: "How Tos",
      slugField: "title",
      path: "src/content/how_tos/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        category: fields.text({ label: "Category" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        isAI: fields.checkbox({
          label: "Is AI Interaction",
          defaultValue: false,
        }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
    quotes: collection({
      label: "Quotes",
      slugField: "title",
      path: "src/content/quotes/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title/Client" } }),
        amount: fields.integer({ label: "Amount", defaultValue: 0 }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        isAI: fields.checkbox({
          label: "Is AI Interaction",
          defaultValue: false,
        }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
    manuals: collection({
      label: "Manuals",
      slugField: "title",
      path: "src/content/manuals/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        client: fields.text({ label: "Client" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        isAI: fields.checkbox({
          label: "Is AI Interaction",
          defaultValue: false,
        }),
        content: fields.markdoc({ label: "Content" }),
      },
    }),
  },
});
