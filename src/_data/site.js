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

  // Set to "/assets/og.png" (1200x630) once you have a share image.
  ogImage: "/assets/og.png",

  disclaimer:
    "Unofficial fan guide. Grand Theft Auto and GTA VI are trademarks of Rockstar Games / Take-Two Interactive. This site is not affiliated with or endorsed by them. Screenshots and artwork are official Rockstar Games media.",

  buildId: Date.now().toString(36),
};
