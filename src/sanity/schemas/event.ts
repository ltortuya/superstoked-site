import { defineField, defineType } from "sanity";

export const PROGRAM_OPTIONS = [
  { title: "Libraries & Education", value: "libraries" },
  { title: "Youth Surf Programs", value: "youth-surf" },
  { title: "Mentorship", value: "mentorship" },
  { title: "Community Outreach", value: "community" },
  { title: "Equipment & Resource Donations", value: "equipment" },
  { title: "Other", value: "other" },
];

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  groups: [
    { name: "main", title: "Main", default: true },
    { name: "gallery", title: "Gallery" },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required().min(3).max(120),
      group: "main",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
      group: "main",
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      description:
        "Primary date for the event. For ongoing work, set this to the start date and enable 'Ongoing' below.",
      validation: (r) => r.required(),
      group: "main",
    }),
    defineField({
      name: "ongoing",
      title: "Ongoing / in progress",
      type: "boolean",
      description: "Show 'In progress' instead of a specific date.",
      initialValue: false,
      group: "main",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "E.g. 'Alimanguan, Palawan' or 'San Diego, CA'",
      group: "main",
    }),
    defineField({
      name: "program",
      title: "Program",
      type: "string",
      options: { list: PROGRAM_OPTIONS, layout: "radio" },
      initialValue: "other",
      group: "main",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      description:
        "1–2 sentences shown on event cards and in previews. Keep it tight.",
      validation: (r) => r.max(280),
      group: "main",
    }),
    defineField({
      name: "body",
      title: "Full description (optional)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Quote", value: "blockquote" },
            { title: "Heading", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [{ name: "href", type: "url", title: "URL" }],
              },
            ],
          },
        },
      ],
      group: "main",
    }),
    defineField({
      name: "cover",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Describe the image for screen readers and SEO.",
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
      group: "main",
    }),
    defineField({
      name: "gallery",
      title: "Gallery photos",
      type: "array",
      group: "gallery",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "caption",
              title: "Caption (optional)",
              type: "string",
            }),
          ],
        },
      ],
      options: { layout: "grid" },
    }),
    defineField({
      name: "featured",
      title: "Featured on home page",
      type: "boolean",
      description:
        "Show this event in the 'Recent Events' strip on the home page. Toggle on for 1–3 current standouts.",
      initialValue: false,
      group: "meta",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      location: "location",
      media: "cover",
      featured: "featured",
    },
    prepare({ title, date, location, media, featured }) {
      const d = date ? new Date(date).toLocaleDateString() : "";
      const subtitleParts = [d, location].filter(Boolean);
      return {
        title: `${featured ? "★ " : ""}${title ?? "(untitled)"}`,
        subtitle: subtitleParts.join(" · "),
        media,
      };
    },
  },
});
