import { defineConfig } from "astro/config";
// import compress from "astro-compress";
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  base: SITE.base,
  trailingSlash: SITE.trailingSlash,
  experimental: {
    contentCollectionCache: true,
  },
  integrations: [
    tailwind({ config: { applyBaseStyles: false } }),
    partytown(),
    sitemap({
      filter: (page) => page !== "https://peculiardynamics.co.uk/estimate",
    }),
    icon(),
    react({
      experimentalReactChildren: true,
    }),
    mdx(),
  ],
});
