import { createClient } from "@sanity/client";

const token = process.env.SSF_SANITY_TOKEN;
if (!token) {
  console.error(
    "Missing SSF_SANITY_TOKEN. Run: node --env-file=../.env scripts/seed-homepage-content.mjs"
  );
  process.exit(1);
}

const client = createClient({
  projectId: "3s51ulk9",
  dataset: "production",
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

// --- literal values copied from src/lib/content.ts ---

const mission = {
  headline: "Where the ocean becomes a classroom.",
  body: [
    "Superstoked Foundation exists to open doors for young people who were born near the water but rarely get the chance to meet it on their own terms. We believe the ocean is one of the world's great teachers — of patience, humility, courage, and community — and that every child deserves a chance to learn from it.",
    "From the coast of Alimanguan in Palawan to surf clubs along the California shore, we partner with local leaders to build what their communities tell us they need first: books, boards, mentors, and space to grow up feeling seen.",
  ],
};

const whatWeDo = [
  {
    title: "Education Initiatives",
    body: "Stocked libraries, school supply drives, and learning spaces that treat reading as a right, not a privilege.",
    icon: "book",
  },
  {
    title: "Surf Mentorship",
    body: "Youth surf programs led by local coaches, pairing ocean skills with confidence, discipline, and joy.",
    icon: "waves",
  },
  {
    title: "Community Partnerships",
    body: "Grassroots collaboration with surf clubs and schools that already know what their community needs.",
    icon: "handshake",
  },
  {
    title: "Global Connection",
    body: "Bridging supporters in California with youth and families abroad — one board, one book, one story at a time.",
    icon: "globe",
  },
];

const featuredProject = {
  badge: "Featured Project",
  title: "A Community Library in Alimanguan, Palawan",
  lead: "In a coastal village where the nearest bookstore is hours away, we're partnering with the local elementary school to build a library the kids can call their own.",
  body: [
    "Alimanguan sits on the northwestern tip of Palawan — a fishing and farming village where most children have never held a book that wasn't a hand-me-down textbook. Teachers there have been asking for a library for years.",
    "With the help of the Surf Club of Alimanguan and donors like you, we're stocking shelves, building reading corners, and training local volunteers to run story hours. This isn't a drop-off donation — it's a long-term partnership to make reading a normal part of growing up.",
  ],
  progressLabel: "Library Launch Fund",
  progressRaised: 8400,
  progressGoal: 18000,
  ctaLabel: "Support the Library",
  ctaHref: "/donate/",
  imageAlt:
    "REPLACE: Photo of children in Alimanguan reading, or a wide shot of the elementary school grounds.",
};

const partners = [
  {
    name: "Wind and Sea Surf Club",
    location: "California",
    description:
      "A California surf club whose members mentor, fundraise, and connect the two coastlines we serve.",
  },
  {
    name: "Surf Club of Alimanguan",
    location: "Palawan, Philippines",
    description:
      "Our primary partner on the ground in Alimanguan — they run programs daily and know every family in the village.",
  },
  {
    name: "Surf Club of Eastern Samar",
    location: "Eastern Samar, Philippines",
    description:
      "Youth outreach and surf instruction along the typhoon-prone Pacific coast of Samar.",
  },
  {
    name: "Onion Surf Club",
    location: "Philippines",
    description:
      "A growing grassroots club helping us reach more communities along the Philippine coastline.",
  },
];

const testimonials = [
  {
    quote:
      "Before the program I thought the ocean was just for people with money. Now I coach the younger kids.",
    attribution: "Mika, 17",
    role: "Youth Surfer & Junior Coach, Alimanguan",
  },
  {
    quote:
      "What Superstoked has built here didn't come from outside — they asked us what we needed, then actually listened.",
    attribution: "Teacher Lorena",
    role: "Alimanguan Elementary School",
  },
  {
    quote:
      "Seeing our California kids write letters to kids in the Philippines — that changed what our surf club is about.",
    attribution: "Devin R.",
    role: "Wind and Sea Surf Club",
  },
];

const callsToAction = {
  finalHeadline: "Help Us Make Waves",
  finalBody:
    "Every board, book, and hour you give ripples further than you'll ever see. Join us — as a donor, a volunteer, or a partner — and help build something coastal communities actually asked for.",
};

const joinTheStoke = {
  eyebrow: "Join the Stoke",
  headline: "Help create opportunity through surfing, education, and community.",
  subhead:
    "Join our growing community of surfers, supporters, volunteers, and donors helping underserved youth in California and the Philippines.",
};

async function run() {
  // Ensure the homePage document exists before patching
  await client.createIfNotExists({ _id: "homePage", _type: "homePage" });

  await client
    .patch("homePage")
    // SHARED fields — only fill if absent (protect live static-site content)
    .setIfMissing({
      heroHeadline: "Empowering Youth Through Surf, Education & Community",
      heroSubhead:
        "Creating opportunity for underserved communities through mentorship, learning spaces, and the transformative power of the ocean.",
      missionEyebrow: "Our Mission",
      missionHeading: mission.headline,
      missionBody: mission.body.join("\n\n"),
    })
    // NEW Next-site-only fields — always set
    .set({
      whatWeDoItems: whatWeDo.map((w, i) => ({
        _key: "wwd" + i,
        title: w.title,
        body: w.body,
        icon: w.icon,
      })),
      featuredProject: {
        badge: featuredProject.badge,
        title: featuredProject.title,
        lead: featuredProject.lead,
        body: featuredProject.body.join("\n\n"),
        imageAlt: featuredProject.imageAlt,
        progressLabel: featuredProject.progressLabel,
        progressRaised: featuredProject.progressRaised,
        progressGoal: featuredProject.progressGoal,
        ctaLabel: featuredProject.ctaLabel,
        ctaUrl: featuredProject.ctaHref,
      },
      finalCtaHeadline: callsToAction.finalHeadline,
      finalCtaBody: callsToAction.finalBody,
      joinStokeEyebrow: joinTheStoke.eyebrow,
      joinStokeHeadline: joinTheStoke.headline,
      joinStokeSubhead: joinTheStoke.subhead,
    })
    .commit();

  for (let i = 0; i < partners.length; i++) {
    const p = partners[i];
    await client.createOrReplace({
      _id: `partner-${i + 1}`,
      _type: "partner",
      order: (i + 1) * 10,
      name: p.name,
      location: p.location,
      description: p.description,
    });
  }

  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i];
    await client.createOrReplace({
      _id: `testimonial-${i + 1}`,
      _type: "testimonial",
      order: (i + 1) * 10,
      quote: t.quote,
      attribution: t.attribution,
      role: t.role,
    });
  }

  console.log(
    `Seeded homePage + ${partners.length} partners + ${testimonials.length} testimonials.`
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
