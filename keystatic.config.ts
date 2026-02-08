import { config, fields, collection } from "@keystatic/core";

// Common fields for all collections
const commonFields = {
  tags: fields.multiselect({
    label: "Tags",
    options: [
      { label: "Personal", value: "personal" },
      { label: "Work", value: "work" },
      { label: "Research", value: "research" },
      { label: "Ideas", value: "ideas" },
    ],
    defaultValue: [],
  }),
  isAIInteraction: fields.checkbox({
    label: "AI Interaction",
    description: "Was this content generated or influenced by AI?",
    defaultValue: false,
  }),
};

export default config({
  storage: {
    kind: "github",
    repo:
      (process.env.NEXT_PUBLIC_KEYSTATIC_REPO as `${string}/${string}`) ||
      "fijnbesnaard/sfbkosmos",
  },
  collections: {
    ambitions: collection({
      label: "Ambitions",
      slugField: "title",
      path: "src/content/ambitions/*",
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Title" }),
        status: fields.select({
          label: "Status",
          options: [
            { label: "To Do", value: "todo" },
            { label: "Doing", value: "doing" },
            { label: "Done", value: "done" },
          ],
          defaultValue: "todo",
        }),
        content: fields.markdoc({ label: "Content" }),
        ...commonFields,
      },
    }),
    intentions: collection({
      label: "Intentions",
      slugField: "title",
      path: "src/content/intentions/*",
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Title" }),
        content: fields.markdoc({ label: "Content" }),
        ...commonFields,
      },
    }),
    learning: collection({
      label: "Learning",
      slugField: "title",
      path: "src/content/learning/*",
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Title" }),
        department: fields.select({
          label: "Department",
          options: [
            { label: "Engineering", value: "engineering" },
            { label: "Design", value: "design" },
            { label: "Product", value: "product" },
            { label: "Business", value: "business" },
          ],
          defaultValue: "engineering",
        }),
        progress: fields.integer({
          label: "Progress (%)",
          validation: { min: 0, max: 100 },
          defaultValue: 0,
        }),
        content: fields.markdoc({ label: "Content" }),
        ...commonFields,
      },
    }),
    workouts: collection({
      label: "Workouts",
      slugField: "title",
      path: "src/content/workouts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Title" }),
        date: fields.date({ label: "Date", defaultValue: { kind: "today" } }),
        workoutType: fields.text({ label: "Workout Type" }),
        content: fields.markdoc({ label: "Content" }),
        ...commonFields,
      },
    }),
    howTos: collection({
      label: "How To's",
      slugField: "title",
      path: "src/content/how-tos/*",
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Title" }),
        category: fields.text({ label: "Language/Category" }),
        content: fields.markdoc({ label: "Content" }),
        ...commonFields,
      },
    }),
    quotes: collection({
      label: "Quotes",
      slugField: "title",
      path: "src/content/quotes/*",
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Client Name" }),
        amount: fields.integer({ label: "Amount" }),
        content: fields.markdoc({ label: "Content" }),
        ...commonFields,
      },
    }),
    manuals: collection({
      label: "Manuals",
      slugField: "title",
      path: "src/content/manuals/*",
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Title" }),
        clientName: fields.text({ label: "Client Name" }),
        content: fields.markdoc({ label: "Content" }),
        ...commonFields,
      },
    }),
  },
});
