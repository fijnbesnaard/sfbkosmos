// @ts-ignore
import { config, fields, collection } from "@keystatic/core";
// @ts-ignore
import { block, inline, wrapper } from "@keystatic/core/content-components";
import React from "react";

/**
 * Reusable Markdoc field configuration.
 * We use 'as any' on component definitions to resolve complex TypeScript union type errors
 * in the editor, while maintaining correct runtime behavior for Keystatic.
 */
const markdocField = fields.markdoc({
  label: "Content",
  options: {
    image: {
      directory: "public/content-images",
      publicPath: "/content-images/",
    },
  },
  components: {
    page_break: block({
      label: "Page Break",
      schema: {},
      icon: React.createElement("span", null, "PB"),
      preview: () =>
        React.createElement(
          "div",
          {
            style: {
              borderTop: "1px dashed #ccc",
              margin: "1em 0",
              textAlign: "center",
              fontSize: "12px",
              color: "#999",
            },
          },
          "Page Break",
        ),
    } as any),
    br: inline({
      label: "Line Break",
      schema: {},
      icon: React.createElement("span", null, "BR"),
    } as any),
    image_grid: block({
      label: "Image Grid",
      schema: {
        images: fields.array(
          fields.image({
            label: "Image",
            directory: "public/content-images",
            publicPath: "/content-images/",
          }),
          {
            label: "Images",
            itemLabel: (props: any) => props.value?.filename || "Image",
          },
        ),
      },
      icon: React.createElement("span", null, "IG"),
      preview: (props: any) =>
        React.createElement(
          "div",
          {
            style: {
              border: "1px solid #ccc",
              padding: "1em",
              background: "#f9f9f9",
            },
          },
          React.createElement(
            "div",
            { style: { fontWeight: "bold", marginBottom: "0.5em" } },
            "Image Grid",
          ),
          React.createElement(
            "div",
            { style: { display: "flex", gap: "10px", flexWrap: "wrap" } },
            props.fields.images.elements.map((img: any, i: number) =>
              React.createElement(
                "div",
                {
                  key: i,
                  style: {
                    width: "100px",
                    height: "100px",
                    background: "#eee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                  },
                },
                "Image",
              ),
            ),
          ),
        ),
    } as any),
    full_width: block({
      label: "Full Width",
      schema: {
        image: fields.image({
          label: "Image",
          directory: "public/content-images",
          publicPath: "/content-images/",
        }),
      },
      icon: React.createElement("span", null, "FW"),
      preview: (props: any) =>
        React.createElement(
          "div",
          {
            style: {
              border: "1px solid #ccc",
              padding: "1em",
              background: "#f9f9f9",
            },
          },
          React.createElement(
            "div",
            { style: { fontWeight: "bold", marginBottom: "0.5em" } },
            "Full Width Image",
          ),
          React.createElement(
            "div",
            {
              style: {
                width: "100%",
                height: "100px",
                background: "#eee",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
              },
            },
            "Image",
          ),
        ),
    } as any),
  },
});

export default config({
  storage:
    process.env.NODE_ENV === "production"
      ? {
          kind: "github",
          repo:
            (process.env.NEXT_PUBLIC_KEYSTATIC_REPO as `${string}/${string}`) ||
            "fijnbesnaard/sfbkosmos",
        }
      : { kind: "local" },
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
        content: markdocField,
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
        content: markdocField,
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
        content: markdocField,
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
        content: markdocField,
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
        content: markdocField,
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
        content: markdocField,
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
        content: markdocField,
      },
    }),
  },
});
