import { defineConfig } from "astro/config";
import compress from "astro-compress";

import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

// import jopSoftwarecookieconsent from "@jop-software/astro-cookieconsent";
// import cookieconsent from "@jop-software/astro-cookieconsent";

import react from "@astrojs/react";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://peculiardynamics.co.uk",
  experimental: {
    contentCollectionCache: true,
  },
  integrations: [
    compress(),

    tailwind({ config: { applyBaseStyles: false } }),
    partytown(),
    sitemap(),

    react({
      experimentalReactChildren: true,
    }),
    mdx(),
  ],
});
