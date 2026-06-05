export const site = {
  name: "Superstoked Foundation",
  tagline: "Empowering Youth Through Surf, Education & Community",
  description:
    "Superstoked Foundation empowers underserved coastal youth through surf mentorship, education, and community support — from Alimanguan, Palawan to California.",
  url: "https://superstokedfoundation.org",
  email: "hello@superstokedfoundation.org",
  ein: "REPLACE_WITH_EIN", // 501(c)(3) EIN — edit in src/lib/site.ts
  addressLine: "California, USA",
  socials: {
    instagram: "https://instagram.com/superstokedfoundation",
    facebook: "https://facebook.com/superstokedfoundation",
    youtube: "https://youtube.com/@superstokedfoundation",
    tiktok: "https://tiktok.com/@superstokedfoundation",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/about/", label: "About" },
    { href: "/programs/", label: "Programs" },
    { href: "/impact/", label: "Impact" },
    { href: "/events/", label: "Events" },
    { href: "/get-involved/", label: "Get Involved" },
    { href: "/contact/", label: "Contact" },
  ],
} as const;
