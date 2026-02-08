import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
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
