import { defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  // Treat as singleton — only one of these should ever exist.
  // (Studio still allows creating duplicates without custom desk structure;
  // please don't.)
  groups: [
    { name: "header", title: "Header / Nav / SEO" },
    { name: "hero", title: "Hero", default: true },
    { name: "mission", title: "Mission" },
    { name: "programs", title: "Programs" },
    { name: "merch", title: "Merch / Shop" },
    { name: "getInvolved", title: "Get Involved" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    // ---------------- HEADER / NAV / SEO ----------------
    defineField({
      name: "navLinks",
      title: "Header nav links",
      type: "array",
      description:
        "Links shown in the top navigation. Drag to reorder.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "Shown in caps. E.g. 'Programs', 'Get Involved'.",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
              description: "Full URL or in-page anchor (e.g. '#programs').",
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        },
      ],
      group: "header",
    }),
    defineField({
      name: "headerCtaLabel",
      title: "Header button label",
      type: "string",
      description: "Top-right button. E.g. 'Support SSF'.",
      group: "header",
    }),
    defineField({
      name: "headerCtaUrl",
      title: "Header button URL",
      type: "string",
      description: "Where the top-right button links to.",
      group: "header",
    }),
    defineField({
      name: "pageTitle",
      title: "Page title (browser tab + SEO)",
      type: "string",
      description:
        "Shown in the browser tab and used by search engines. Keep under ~60 chars.",
      group: "header",
    }),
    defineField({
      name: "pageMetaDescription",
      title: "Meta description (SEO)",
      type: "text",
      rows: 3,
      description:
        "1-2 sentence summary used by Google and link previews. Keep under ~160 chars.",
      group: "header",
    }),

    // ---------------- HERO ----------------
    defineField({
      name: "heroHeadline",
      title: "Headline",
      type: "text",
      rows: 4,
      description:
        "Each line break (Enter) becomes a new line on the site. Currently: 'Changing Lives / Through Surf, / Education / & Stoke.'",
      group: "hero",
    }),
    defineField({
      name: "heroSubhead",
      title: "Subhead paragraph",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "heroPrimaryCtaLabel",
      title: "Primary button label",
      type: "string",
      description: "E.g. 'Support SSF', 'Donate Now'",
      group: "hero",
    }),
    defineField({
      name: "heroPrimaryCtaUrl",
      title: "Primary button URL",
      type: "string",
      description: "Where the primary button links to. Use # for in-page anchor.",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaLabel",
      title: "Secondary button label",
      type: "string",
      description: "E.g. 'Get Involved'",
      group: "hero",
    }),
    defineField({
      name: "heroSecondaryCtaUrl",
      title: "Secondary button URL",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroPhoto",
      title: "Hero background photo",
      type: "image",
      options: { hotspot: true },
      description:
        "Optional. If empty, falls back to the existing PLfest.jpg in brand_assets.",
      group: "hero",
    }),

    // ---------------- MISSION ----------------
    defineField({
      name: "missionEyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small label above the heading. E.g. 'Our Mission'",
      group: "mission",
    }),
    defineField({
      name: "missionHeading",
      title: "Heading",
      type: "text",
      rows: 2,
      description: "E.g. 'The ocean is our classroom.' Line breaks render as <br>.",
      group: "mission",
    }),
    defineField({
      name: "missionBody",
      title: "Body paragraph",
      type: "text",
      rows: 4,
      group: "mission",
    }),
    defineField({
      name: "missionStats",
      title: "Stats (up to 4)",
      type: "array",
      description: "Number/value plus a short label.",
      validation: (r) => r.max(4),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Number / value",
              type: "string",
              description: "E.g. '1', '4', '100%', '501(c)(3)'",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "label",
              title: "Label below the number",
              type: "string",
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
      group: "mission",
    }),

    // ---------------- PROGRAMS ----------------
    defineField({
      name: "programsEyebrow",
      title: "Eyebrow",
      type: "string",
      description: "E.g. 'Featured Programs'",
      group: "programs",
    }),
    defineField({
      name: "programsHeading",
      title: "Heading",
      type: "string",
      description: "E.g. 'Our Ongoing Projects'",
      group: "programs",
    }),
    defineField({
      name: "programsItems",
      title: "Programs (up to 3)",
      type: "array",
      validation: (r) => r.max(3),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "body",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (r) => r.required(),
            }),
            defineField({
              name: "learnMoreUrl",
              title: "Learn-more link",
              type: "string",
              description: "Where 'Learn more →' goes. Optional.",
            }),
            defineField({
              name: "theme",
              title: "Card top color",
              type: "string",
              options: {
                list: [
                  { title: "Navy (dark blue)", value: "navy" },
                  { title: "Sand (tan)", value: "sand" },
                  { title: "Seafoam (light blue)", value: "seafoam" },
                ],
                layout: "radio",
              },
              initialValue: "navy",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "body" },
          },
        },
      ],
      group: "programs",
    }),

    // ---------------- MERCH / SHOP ----------------
    defineField({
      name: "merchEyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small label above the heading. E.g. 'Shop'",
      group: "merch",
    }),
    defineField({
      name: "merchHeading",
      title: "Heading",
      type: "string",
      description: "E.g. 'Wear the Stoke.'",
      group: "merch",
    }),
    defineField({
      name: "merchItems",
      title: "Products (up to 6)",
      type: "array",
      description:
        "Each tile is a colored block with a 2-line label. No real images yet — pick a tile color and the label will show large in the matching ink color.",
      validation: (r) => r.max(6),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Product name (under the tile)",
              type: "string",
              description: "E.g. 'Classic Tee'",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string",
              description: "E.g. '$28' or 'From $24'",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "url",
              title: "Product URL",
              type: "string",
              description: "Where the tile links to. Use # if not yet live.",
            }),
            defineField({
              name: "tileLabel",
              title: "Tile graphic text",
              type: "text",
              rows: 2,
              description:
                "Big text shown ON the colored tile (the 'graphic'). Line breaks are kept. E.g. 'Stoke<br/>Tee'.",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "tileColor",
              title: "Tile color",
              type: "string",
              description:
                "Background of the colored block. Text auto-picks a readable ink: sunset on navy, navy on the rest.",
              options: {
                list: [
                  { title: "Navy", value: "navy" },
                  { title: "Seafoam", value: "seafoam" },
                  { title: "Sand", value: "sand" },
                  { title: "Sunset (yellow)", value: "sunset" },
                ],
                layout: "radio",
              },
              initialValue: "navy",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "price" },
          },
        },
      ],
      group: "merch",
    }),
    defineField({
      name: "merchFootnote",
      title: "Footnote paragraph",
      type: "text",
      rows: 2,
      description:
        "Short line under the grid. E.g. 'Every purchase funds youth surf camps...'",
      group: "merch",
    }),
    defineField({
      name: "merchCtaLabel",
      title: "Shop-all button label",
      type: "string",
      description: "E.g. 'Shop all merch →'",
      group: "merch",
    }),
    defineField({
      name: "merchCtaUrl",
      title: "Shop-all button URL",
      type: "string",
      group: "merch",
    }),

    // ---------------- GET INVOLVED (Volunteer / Sponsor split) ----------------
    defineField({
      name: "volunteerEyebrow",
      title: "Volunteer — eyebrow",
      type: "string",
      description: "Left side. E.g. 'Get Involved'",
      group: "getInvolved",
    }),
    defineField({
      name: "volunteerHeading",
      title: "Volunteer — heading",
      type: "string",
      description: "E.g. 'Volunteer with us.'",
      group: "getInvolved",
    }),
    defineField({
      name: "volunteerBody",
      title: "Volunteer — body",
      type: "text",
      rows: 3,
      group: "getInvolved",
    }),
    defineField({
      name: "volunteerCtaLabel",
      title: "Volunteer — button label",
      type: "string",
      group: "getInvolved",
    }),
    defineField({
      name: "volunteerCtaUrl",
      title: "Volunteer — button URL",
      type: "string",
      group: "getInvolved",
    }),
    defineField({
      name: "sponsorEyebrow",
      title: "Sponsor — eyebrow",
      type: "string",
      description: "Right side. E.g. 'Partner With Us'",
      group: "getInvolved",
    }),
    defineField({
      name: "sponsorHeading",
      title: "Sponsor — heading",
      type: "string",
      description: "E.g. 'Sponsor a program.'",
      group: "getInvolved",
    }),
    defineField({
      name: "sponsorBody",
      title: "Sponsor — body",
      type: "text",
      rows: 3,
      group: "getInvolved",
    }),
    defineField({
      name: "sponsorCtaLabel",
      title: "Sponsor — button label",
      type: "string",
      group: "getInvolved",
    }),
    defineField({
      name: "sponsorCtaUrl",
      title: "Sponsor — button URL",
      type: "string",
      group: "getInvolved",
    }),

    // ---------------- FOOTER ----------------
    defineField({
      name: "footerTagline",
      title: "Tagline (under the logo)",
      type: "text",
      rows: 3,
      description:
        "Short paragraph in the leftmost footer column.",
      group: "footer",
    }),
    defineField({
      name: "footerSocials",
      title: "Social links",
      type: "array",
      description:
        "Each row picks a platform icon and a URL. Add as many as you like.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "Facebook", value: "facebook" },
                  { title: "YouTube", value: "youtube" },
                  { title: "TikTok", value: "tiktok" },
                  { title: "Twitter / X", value: "twitter" },
                  { title: "Email", value: "email" },
                ],
                layout: "dropdown",
              },
              validation: (r) => r.required(),
            }),
            defineField({
              name: "url",
              title: "URL (or mailto: for email)",
              type: "string",
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
      group: "footer",
    }),
    defineField({
      name: "footerColumns",
      title: "Link columns (up to 4)",
      type: "array",
      description:
        "Each column has a title and a list of links. Renders left-to-right.",
      validation: (r) => r.max(4),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Column title",
              type: "string",
              description: "E.g. 'About', 'Programs'",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (r) => r.required(),
                    }),
                    defineField({
                      name: "url",
                      title: "URL",
                      type: "string",
                      validation: (r) => r.required(),
                    }),
                  ],
                  preview: {
                    select: { title: "label", subtitle: "url" },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: "title" },
          },
        },
      ],
      group: "footer",
    }),
    defineField({
      name: "footerLegal",
      title: "Legal / copyright line",
      type: "text",
      rows: 2,
      description:
        "Bottom-bar text. E.g. '© 2026 Superstoked Foundation. 501(c)(3)...'",
      group: "footer",
    }),
    defineField({
      name: "footerPrivacyUrl",
      title: "Privacy URL",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "footerTermsUrl",
      title: "Terms URL",
      type: "string",
      group: "footer",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Home Page" };
    },
  },
});
