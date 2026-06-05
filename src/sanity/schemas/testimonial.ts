import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "attribution", title: "Attribution (name)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role / context", type: "string" }),
    defineField({ name: "order", title: "Sort order", type: "number", description: "Lower numbers appear first.", initialValue: 100 }),
  ],
  orderings: [{ name: "order", title: "Sort order", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "attribution", subtitle: "role" } },
});
