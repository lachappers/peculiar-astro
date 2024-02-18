export const SITE = {
  website: "https://peculiardynamics.co.uk", // replace this with your deployed domain
  description:
    "Making Technology That Works. Designing, building and improving websites, software and strategy for ambitious businesses.", // replace
  title: "Peculiar Dynamics", //business name
  subtitle: "Peculiar Dynamics", //subtitle on seo
  author: "Peculiar Dynamics Ltd",
  base: "/", // Change this if you need to deploy to Github Pages, for example
  trailingSlash: "ignore", // Generate permalinks with or without "/" at the end
  favicon: "/assets/images/favicon.svg",
  encodedEmail: "aW5mb0BwZWN1bGlhcmR5bmFtaWNzLmNvLnVr",
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
    key: "About Us",
    url: "/about/",
  },
  {
    key: "Services",
    url: "/services/",
  },
  {
    key: "Pricing",
    url: "/pricing/",
  },
  {
    key: "Blog",
    url: "/blog/",
  },
  {
    key: "Contact Us",
    url: "/contact/",
  },
];

export const CONTENTSETTINGS = {
  teaserPagination: 3,
  indexPagination: 2,
  previewLength: 200,
  blog: {
    sidebarCountFilters: ["categories"],
    sidebarFilters: ["tags", "author"],
  },
};
