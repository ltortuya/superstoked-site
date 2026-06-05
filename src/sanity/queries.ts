import { groq } from "next-sanity";

// Shared projection — single source of truth for fields the UI needs.
const EVENT_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  date,
  ongoing,
  location,
  program,
  summary,
  featured,
  cover,
  gallery
`;

export const allEventsQuery = groq`
  *[_type == "event" && defined(slug.current)] | order(date desc, _createdAt desc) {
    ${EVENT_FIELDS}
  }
`;

export const featuredEventsQuery = groq`
  *[_type == "event" && featured == true && defined(slug.current)] | order(date desc) [0...3] {
    ${EVENT_FIELDS}
  }
`;

export const recentEventsQuery = groq`
  *[_type == "event" && defined(slug.current)] | order(date desc, _createdAt desc) [0...$limit] {
    ${EVENT_FIELDS}
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    ${EVENT_FIELDS},
    body
  }
`;

export const eventSlugsQuery = groq`
  *[_type == "event" && defined(slug.current)][].slug.current
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0] {
    heroHeadline,
    heroSubhead,
    missionEyebrow,
    missionHeading,
    missionBody,
    whatWeDoItems[]{ title, body, icon },
    featuredProject {
      badge, title, lead, body, imageAlt, progressLabel, progressRaised, progressGoal, ctaLabel, ctaUrl,
      "image": image
    },
    finalCtaHeadline,
    finalCtaBody
  }
`;

export const partnersQuery = groq`
  *[_type == "partner"] | order(order asc, _createdAt asc) {
    name, location, description
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc, _createdAt asc) {
    quote, attribution, role
  }
`;
