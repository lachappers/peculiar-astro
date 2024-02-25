import { getCollection, type CollectionEntry } from "astro:content";
import { slugify, deslugify } from "./textConverter";
import { sortByDate, randomSort } from "./sortFunctions";

export const getSinglePage = async (collection: any) => {
  const allPages = await getCollection(collection);
  const removeIndex = allPages.filter((item: any) => item.id.match(/^(?!-)/));
  const removeDrafts = removeIndex.filter((item: any) => !item.data.draft);
  return removeDrafts;
};

/**
 * Returns collection entries matching a value for a given field

 */
// export const getCollectionFilter = async (
//   type,
//   term,
//   value,
//   reverse = false
// ) => {
//   // Call our custom getCollection() function from src/content/utils.js
//   const items = await getCollection(type, true, reverse);

//   // Since value might be the human label, or from a URL, we will normalize it to a slug
//   const slug = slugify(value);

//   // Start filtering the content collection
//   return items.filter((item: any) => {
//     // See the comments in the getTaxonomy() function
//     const values: string[] = [];
//     if (Array.isArray(item.data[term])) {
//       values.push(...item.data[term]);
//     } else if (item.data[term]?.slug) {
//       values.push(item.data[term].slug);
//     }

//     // Does this collection entry contain the value we're looking for?
//     return values.map((value) => slugify(value)).includes(slug);
//   });
// };

export function formatCollection(
  collection,
  {
    filterOutDrafts = true,
    filterOutFutureEntries = true,
    sortDate = true, // newest first
    limit = undefined,
  }: {
    filterOutDrafts?: boolean;
    filterOutFutureEntries?: boolean;
    sortDate?: boolean;
    limit?: number | undefined;
  } = {}
): any[] {
  const filteredCollection = collection.reduce((acc, entry) => {
    // console.log("frontmatter", entry.frontmatter);
    // console.log("data", entry.data);
    const { date, draft } = entry.data;
    // filterOutDrafts if true
    if (filterOutDrafts && draft) return acc;
    // always filter drafts in prod
    if (import.meta.env.Prod && draft) return acc;

    // filterOutFutureEntries
    if (filterOutFutureEntries && new Date(date) > new Date()) return acc;

    // add entry to acc
    acc.push(entry);

    return acc;
  }, []);

  // sortByDateDesc is true, else random
  if (sortDate) {
    sortByDate(filteredCollection);
  } else {
    randomSort(filteredCollection);
  }

  // limit if number passed
  if (typeof limit === "number") {
    return filteredCollection.slice(0, limit);
  }
  return filteredCollection;
}
