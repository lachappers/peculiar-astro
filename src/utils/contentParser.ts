import { getCollection } from "astro:content";
import { slugify, deslugify } from "./textConverter";

export const getSinglePage = async (collection: any) => {
  const allPages = await getCollection(collection);
  const removeIndex = allPages.filter((item: any) => item.id.match(/^(?!-)/));
  const removeDrafts = removeIndex.filter((item: any) => !item.data.draft);
  return removeDrafts;
};
