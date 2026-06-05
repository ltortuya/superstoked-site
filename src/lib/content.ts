// -----------------------------------------------------------------------------
// Single source of truth for all editable website copy and data.
// Replace placeholder values (marked REPLACE: or similar) as real content arrives.
// -----------------------------------------------------------------------------

export const mission = {
  headline: "Where the ocean becomes a classroom.",
  body: [
    "Superstoked Foundation exists to open doors for young people who were born near the water but rarely get the chance to meet it on their own terms. We believe the ocean is one of the world's great teachers — of patience, humility, courage, and community — and that every child deserves a chance to learn from it.",
    "From the coast of Alimanguan in Palawan to surf clubs along the California shore, we partner with local leaders to build what their communities tell us they need first: books, boards, mentors, and space to grow up feeling seen.",
  ],
};

export const whatWeDo = [
  {
    title: "Education Initiatives",
    body:
      "Stocked libraries, school supply drives, and learning spaces that treat reading as a right, not a privilege.",
    icon: "book",
  },
  {
    title: "Surf Mentorship",
    body:
      "Youth surf programs led by local coaches, pairing ocean skills with confidence, discipline, and joy.",
    icon: "waves",
  },
  {
    title: "Community Partnerships",
    body:
      "Grassroots collaboration with surf clubs and schools that already know what their community needs.",
    icon: "handshake",
  },
  {
    title: "Global Connection",
    body:
      "Bridging supporters in California with youth and families abroad — one board, one book, one story at a time.",
    icon: "globe",
  },
] as const;

export const featuredProject = {
  badge: "Featured Project",
  title: "A Community Library in Alimanguan, Palawan",
  lead:
    "In a coastal village where the nearest bookstore is hours away, we're partnering with the local elementary school to build a library the kids can call their own.",
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

export const partners = [
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
] as const;

export const testimonials = [
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
] as const;

// Replace these with real numbers as they firm up. These are starting estimates
// deliberately on the conservative side — trust is built with honest metrics.
export const impactStats: { label: string; value: number; suffix?: string }[] = [
  { label: "Youth Served", value: 120, suffix: "+" },
  { label: "Books Donated", value: 540, suffix: "+" },
  { label: "Communities Reached", value: 4 },
  { label: "Volunteers Mobilized", value: 32, suffix: "+" },
];

export const beforeAfter = [
  {
    title: "From empty shelves to a reading corner",
    before:
      "The elementary school had a single locked cabinet of aging textbooks. Students had never owned a personal library card.",
    after:
      "A dedicated reading corner opened with 540+ donated books, weekly story hours, and three trained volunteer librarians.",
    imageAlt: "REPLACE: Side-by-side photo of the room before and after the library build.",
  },
  {
    title: "From watching from shore to leading a lineup",
    before:
      "Teens in the village rarely surfed — boards were scarce and expensive, and no one offered structured instruction.",
    after:
      "Twelve youth now attend weekly surf sessions with local coaches, and three have started mentoring younger children.",
    imageAlt: "REPLACE: Photo of kids surfing or the youth surf cohort on the beach.",
  },
] as const;

export const programs = [
  {
    id: "libraries",
    title: "Libraries & Education",
    icon: "book",
    body: "We partner with local schools to build and stock libraries, run reading programs, and supply classrooms with the basics — paper, pencils, textbooks, and the kind of storybooks kids actually want to pick up. Our flagship library is in Alimanguan, Palawan, with more planned as partnerships grow.",
    bullets: [
      "540+ books donated to partner schools",
      "Weekly story hours led by trained local volunteers",
      "Back-to-school supply drives in both California and the Philippines",
    ],
  },
  {
    id: "youth-surf",
    title: "Youth Surf Programs",
    icon: "waves",
    body: "Free, consistent surf instruction for kids and teens who wouldn't otherwise have access. Programs are led by local coaches — because lasting change doesn't get parachuted in. We handle boards, safety gear, and the logistics; our partners bring the teaching, the local knowledge, and the trust.",
    bullets: [
      "Weekly sessions at partner surf clubs",
      "Water safety and ocean awareness curriculum",
      "Pathway from student to junior coach",
    ],
  },
  {
    id: "mentorship",
    title: "Mentorship",
    icon: "users",
    body: "Mentorship isn't a scheduled event — it's what happens when a young person has an older one they trust. We support our partner clubs in building mentorship into the rhythm of their programs, from surf check-ins to study groups to career conversations.",
    bullets: [
      "Peer mentor pairings within surf cohorts",
      "Letter exchanges between California and Philippine youth",
      "Career and college conversations with visiting volunteers",
    ],
  },
  {
    id: "community",
    title: "Community Outreach",
    icon: "handshake",
    body: "Coastal communities need more than programs — they need neighbors who show up. We help partner clubs run beach cleanups, typhoon relief drives, and community gatherings that strengthen the ties between families, schools, and the sea.",
    bullets: [
      "Quarterly beach cleanups at each partner site",
      "Typhoon response coordination (supplies, shelter, reconstruction)",
      "Community events that bring families, teachers, and surfers together",
    ],
  },
  {
    id: "equipment",
    title: "Equipment & Resource Donations",
    icon: "package",
    body: "Surfboards, leashes, fins, rash guards, books, tablets — we coordinate donations from California surf shops, families, and surf clubs, then ship them to the partners who can put them to use. Every item is logged, and we tell you where it landed.",
    bullets: [
      "Board and gear collections from California surf clubs",
      "Transparent logging — you can ask where any donation ended up",
      "Shipping costs covered by monthly donors",
    ],
  },
] as const;

export const donationTiers: {
  amount: number;
  title: string;
  body: string;
  accent: string;
  highlight?: boolean;
}[] = [
  {
    amount: 25,
    title: "School Supplies",
    body: "Notebooks, pencils, and basic classroom supplies for a student for a full school year.",
    accent: "ocean-light",
  },
  {
    amount: 50,
    title: "Books",
    body: "A bundle of age-appropriate books added to the Alimanguan library shelves.",
    accent: "sand-dark",
  },
  {
    amount: 100,
    title: "Youth Program Support",
    body: "A month of surf instruction and mentorship for one youth at a partner club.",
    accent: "ocean-mid",
    highlight: true,
  },
  {
    amount: 250,
    title: "Community Initiative",
    body: "Seed funding for a community event, beach cleanup, or mentorship workshop.",
    accent: "sunset",
  },
];

export const stewardship = {
  pledge:
    "We keep overhead under 10%. Every dollar not spent on accounting or compliance goes into programs, partners, or equipment. We track it, we report it, and we're happy to show you the books.",
  principles: [
    {
      title: "Transparent books",
      body: "Annual financials published publicly — ask anytime and we'll walk you through line by line.",
    },
    {
      title: "Local leadership",
      body: "Partner clubs run their own programs. We fund, coordinate, and amplify — we don't dictate.",
    },
    {
      title: "No overhead bloat",
      body: "A lean volunteer-driven team. Paid staff is the exception, not the default.",
    },
  ],
};

export const faq = [
  {
    q: "Is Superstoked Foundation a registered nonprofit?",
    a: "Yes — Superstoked Foundation is a registered 501(c)(3) nonprofit in the United States. Donations are tax-deductible to the extent allowed by law. Our EIN is listed in the footer.",
  },
  {
    q: "How is my donation used?",
    a: "Roughly 90%+ of every dollar goes directly to programs, equipment, and partner communities. The remainder covers necessary compliance and operations costs. We publish annual financials and will send you receipts for every gift.",
  },
  {
    q: "Can I donate equipment instead of money?",
    a: "Absolutely. Surfboards, leashes, fins, rash guards, helmets, and new-condition books are all welcome. Email hello@superstokedfoundation.org and we'll coordinate pickup or drop-off.",
  },
  {
    q: "How do I volunteer?",
    a: "Fill out the form on the Get Involved page. We have opportunities in California (events, fundraising, gear sorting) and — for longer commitments — on the ground in the Philippines.",
  },
  {
    q: "Do you operate only in the Philippines?",
    a: "Our most active programs are in the Philippines, but we also run community, mentorship, and outreach work in California through our partnership with Wind and Sea Surf Club and other local groups.",
  },
  {
    q: "Can my company sponsor or partner with the foundation?",
    a: "Yes. We work with businesses on gear donations, event sponsorships, and cause campaigns. Fill out the sponsor inquiry form on Get Involved and we'll set up a call.",
  },
];

export const news = [
  {
    slug: "alimanguan-library-opening-2026",
    title: "Opening Week: Alimanguan's First Community Library",
    date: "REPLACE: YYYY-MM-DD",
    excerpt:
      "An inside look at the kids, teachers, and volunteers who made the library build possible — and what comes next.",
    placeholder: true,
  },
];

export const callsToAction = {
  donatePrimary: "Donate Now",
  donateSecondary: "Give Monthly",
  volunteerPrimary: "Volunteer With Us",
  partnerPrimary: "Become a Partner",
  finalHeadline: "Help Us Make Waves",
  finalBody:
    "Every board, book, and hour you give ripples further than you'll ever see. Join us — as a donor, a volunteer, or a partner — and help build something coastal communities actually asked for.",
};
