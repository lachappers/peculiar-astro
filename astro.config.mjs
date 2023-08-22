import { defineConfig } from "astro/config";
import compress from "astro-compress";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://peculiardynamics.co.uk",
  experimental: {
    assets: true,
  },
  integrations: [compress(), mdx(), tailwind(), partytown()],
});
