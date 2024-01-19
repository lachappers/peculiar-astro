import { defineConfig } from "astro/config";
import compress from "astro-compress";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

// import jopSoftwarecookieconsent from "@jop-software/astro-cookieconsent";
// import cookieconsent from "@jop-software/astro-cookieconsent";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://peculiardynamics.co.uk",
  experimental: {
    assets: true,
  },
  integrations: [
    compress(),
    mdx(),
    tailwind({ config: { applyBaseStyles: false } }),
    partytown(),
    sitemap(),

    react({
      experimentalReactChildren: true,
    }),
  ],
});
