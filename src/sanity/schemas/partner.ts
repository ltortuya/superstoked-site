import { defineField, defineType } from "sanity";

export const partnerType = defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Sort order", type: "number", description: "Lower numbers appear first.", initialValue: 100 }),
    defineField({ name: "logo", title: "Logo (optional)", type: "image", options: { hotspot: true } }),
  ],
  orderings: [{ name: "order", title: "Sort order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "location" } },
});
