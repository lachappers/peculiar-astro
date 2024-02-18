import { getCollection } from "astro:content";
import { slugify, deslugify } from "./textConverter";

export const getSinglePage = async (collection: any) => {
  const allPages = await getCollection(collection);
  const removeIndex = allPages.filter((item: any) => item.id.match(/^(?!-)/));
  const removeDrafts = removeIndex.filter((item: any) => !item.data.draft);
  return removeDrafts;
};

/**
 * Returns collection entries matching a value for a given field

 */
export const getCollectionFilter = async (
  type,
  term,
  value,
  reverse = false
) => {
  // Call our custom getCollection() function from src/content/utils.js
  const items = await getCollection(type, true, reverse);

  // Since value might be the human label, or from a URL, we will normalize it to a slug
  const slug = slugify(value);

  // Start filtering the content collection
  return items.filter((item) => {
    // See the comments in the getTaxonomy() function
    const values = [];
    if (Array.isArray(item.data[term])) {
      values.push(...item.data[term]);
    } else if (item.data[term]?.slug) {
      values.push(item.data[term].slug);
    }

    // Does this collection entry contain the value we're looking for?
    return values.map((value) => slugify(value)).includes(slug);
  });
};
