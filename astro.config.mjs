import { defineConfig } from "astro/config";
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
    tailwind({ config: { applyBaseStyles: false }, nesting: true }),
    partytown(),
    sitemap({}),
    icon(),
    react({
      experimentalReactChildren: true,
    }),
    mdx(),
  ],
});
