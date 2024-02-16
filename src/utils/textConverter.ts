// import { slug } from "github-slugger";
// import { marked } from "marked";
import { micromark } from "micromark";

// slugify
// export const slugify = (content: string) => {
//   return slug(content);
// };

export const slugify = (text: string): string => {
  return text
    .toString()
    .replace(/\s+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export const deslugify = (text: string): string => {
  return text.toString().replace(/-/g, " ");
};

// markdownify
export const markdownify = (content: string, div?: boolean) => {
  //   return div ? marked.parse(content) : marked.parseInline(content);
  return div ? micromark(content) : micromark(content);
};

// humanize
export const humanize = (content: string) => {
  return content
    .replace(/^[\s_]+|[\s_]+$/g, "")
    .replace(/[_\s]+/g, " ")
    .replace(/[-\s]+/g, " ")
    .replace(/^[a-z]/, function (m) {
      return m.toUpperCase();
    });
};

// titleify
export const titleify = (content: string) => {
  const humanized = humanize(content);
  return humanized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// plainify
export const plainify = (content: string) => {
  const parseMarkdown: any = micromark(content);
  const filterBrackets = parseMarkdown.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
};

// strip entities for plainify
const htmlEntityDecoder = (htmlWithEntities: string) => {
  let entityList: { [key: string]: string } = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  };
  let htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity];
    }
  );
  return htmlWithoutEntities;
};
