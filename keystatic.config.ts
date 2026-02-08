import { config, fields, collection } from "@keystatic/core";

// Keystatic Cloud configuration

export default config({
  storage: {
    kind: "cloud",
  },
  cloud: {
    project:
      process.env.NEXT_PUBLIC_KEYSTATIC_PROJECT || "fijnbesnaard/sfbkosmos",
  },
  collections: {
    records: collection({
      label: "Records",
      slugField: "title",
      path: "src/content/records/*",
      format: { contentField: "content" },
      schema: {
        title: fields.text({ label: "Title" }),
        date: fields.date({ label: "Date", defaultValue: { kind: "today" } }),
        content: fields.markdoc({
          label: "Content",
        }),
      },
    }),
  },
});
