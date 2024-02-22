export const SITE = {
  website: "https://peculiardynamics.co.uk", // replace this with your deployed domain
  domain: "peculiardynamics.co.uk",
  description:
    "Making Technology That Works. Designing, building and improving websites, software and strategy for ambitious businesses.", // replace
  title: "Peculiar Dynamics", //business name
  subtitle: "Peculiar Dynamics", //subtitle on seo
  author: "Peculiar Dynamics Ltd",
  business: "Peculiar Dynamics Ltd",
  base: "/", // Change this if you need to deploy to Github Pages, for example
  trailingSlash: "ignore", // Generate permalinks with or without "/" at the end
  favicon: "/assets/images/favicon.svg",
  email: "info@peculiardynamics.co.uk",
  encodedEmail: "aW5mb0BwZWN1bGlhcmR5bmFtaWNzLmNvLnVr",
  defaultEmailSubject: "I've got a Peculiar Query!",
  blogPageSize: 6,
};

export interface Page {
  key: string;
  url: string;
  children?: Page[];
}
export const PAGES: Page[] = [
  {
    key: "Home",
    url: "/",
  },
  {
    key: "About",
    url: "/about",
  },
  {
    key: "Services",
    url: "/services",
  },
  {
    key: "Pricing",
    url: "/pricing",
  },
  {
    key: "Blog",
    url: "/blog",
  },
  {
    key: "FAQ",
    url: "/faq",
  },
  {
    key: "Contact",
    url: "/contact",
  },
];

export const CONTENTSETTINGS = {
  teaserPagination: 3,
  indexPagination: 2,
  previewLength: 160,
  blog: {
    sidebarCountFilters: ["categories"],
    sidebarFilters: ["tags", "author"],
  },
};

export const SOCIALS = [
  //update

  {
    name: "Google",
    href: "https://g.co/kgs/kax7P26",
    linkTitle: `${SITE.title} on Google Business`,
    icon: "mdi:instagram",
    active: false,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/peculiar-dynamics/",
    linkTitle: `${SITE.title} on LinkedIn`,
    icon: "mdi:linkedin",
    active: true,
  },
  {
    name: "Mail",
    href: "",
    linkTitle: `Send an email to <span class="hidden">ANTISPAM</span>info@<!-- antispam-->}glosfarm.co.uk`,
    icon: "mdi:email-outline",
    active: false,
    classes: "email-link",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/447405952020",
    linkTitle: `${SITE.title} on WhatsApp`,
    icon: "mdi:whatsapp",
    active: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/peculiardynamics",
    linkTitle: `${SITE.title} on Facebook`,
    icon: "mdi:facebook",
    active: true,
  },
  {
    name: "Instagram",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Instagram`,
    icon: "mdi:instagram",
    active: false,
  },
];
