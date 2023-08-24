import { defineConfig } from "astro/config";
import compress from "astro-compress";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

import jopSoftwarecookieconsent from "@jop-software/astro-cookieconsent";
import cookieconsent from "@jop-software/astro-cookieconsent";

// https://astro.build/config
export default defineConfig({
  site: "https://peculiardynamics.co.uk",
  experimental: {
    assets: true,
  },
  integrations: [
    compress(),
    mdx(),
    tailwind(),
    partytown(),
    sitemap(),
    jopSoftwarecookieconsent(),
    cookieconsent({
      // ...
      gui_options: {
        consent_modal: {
          layout: "cloud", // box/cloud/bar
          position: "bottom center", // bottom/middle/top + left/right/center
          transition: "slide", // zoom/slide
          swap_buttons: false, // enable to invert buttons
        },
        settings_modal: {
          layout: "box", // box/bar
          // position: 'left',           // left/right
          transition: "slide", // zoom/slide
        },
      },
      // ...
    }),
  ],
});
