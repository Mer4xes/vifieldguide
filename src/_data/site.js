export default {
  name: "VI Field Guide",
  longName: "The VI Field Guide",
  description:
    "Unofficial GTA 6 walkthrough and 100% guide: story missions step by step, trophies, collectibles, vehicles and weapons. Spoiler-safe, with progress tracking.",
  url: "https://vifieldguide.com",

  // Launch moment in the visitor's own time zone (Rockstar: midnight local time).
  launch: "2026-11-19T00:00:00",

  nav: [
    { label: "Walkthrough", url: "/walkthrough/" },
    { label: "Trophies", url: "/trophies/" },
    { label: "Collectibles", url: "/collectibles/" },
    { label: "Vehicles", url: "/vehicles/" },
    { label: "Weapons", url: "/weapons/" },
    { label: "Map", url: "/map/" },
    { label: "Guides", url: "/guides/" },
  ],

  // Shown on the About page when filled in.
  contactEmail: "",

  // Voluntary donation link (Ko-fi, Buy Me a Coffee or similar). Shown in the
  // footer and on the About page once url is filled in. A plain link: no
  // widget or third-party script is loaded.
  donate: { url: "https://ko-fi.com/vifieldguide", label: "Support the guide" },

  // Content language, used for og:locale and <html lang>.
  locale: "en_US",

  // Set to "/assets/og.png" (1200x630) once you have a share image.
  ogImage: "/assets/og.png",
  ogImageW: 1200,
  ogImageH: 630,

  // Square logo for Organization structured data (Google Knowledge Graph).
  logo: "/assets/logo.png",

  // Public profiles, listed as Organization.sameAs once they exist
  // (e.g. "https://www.tiktok.com/@vifieldguide", "https://www.youtube.com/@vifieldguide").
  social: [
    { label: "YouTube", url: "https://www.youtube.com/@vifieldguide" },
    { label: "TikTok", url: "https://www.tiktok.com/@the.vi.field.guide" },
    { label: "Instagram", url: "https://www.instagram.com/the_vi_field_guide/" },
    { label: "X", url: "https://x.com/vifieldguide" },
    { label: "Reddit", url: "https://www.reddit.com/user/VI_Field_Guide/" },
  ],

  // Search engine verification. Paste the token from the "HTML tag" method and
  // the matching <meta> tag is emitted automatically. Leave empty if you verify
  // by DNS instead (recommended — see DEPLOY.md). The Google value is only the
  // content string, not the whole tag.
  googleSiteVerification: "",
  bingSiteVerification: "",

  // IndexNow key (Bing/Yandex instant indexing). Served at /<key>.txt.
  // Change it by editing this value; keep it in sync with the key file.
  indexNowKey: "a7f3c92e4b8d41f6a0c5e9d2b6481730",

  disclaimer:
    "Unofficial fan guide. Grand Theft Auto and GTA VI are trademarks of Rockstar Games / Take-Two Interactive. This site is not affiliated with or endorsed by them. Screenshots and artwork are official Rockstar Games media.",

  buildId: Date.now().toString(36),
};
