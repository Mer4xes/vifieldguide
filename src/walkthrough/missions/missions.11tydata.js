/* Applies to every mission file in this folder.
   The file name sets the order and the URL: 014-some-mission.md
   becomes mission 14 at /walkthrough/some-mission/ */
const bare = (data) => data.page.fileSlug.replace(/^\d+-/, "");

export default {
  layout: "layouts/mission.njk",
  eleventyComputed: {
    slug: (data) => bare(data),
    order: (data) => parseInt(data.page.fileSlug, 10) || 0,
    permalink: (data) => `walkthrough/${bare(data)}/`,
    seoTitle: (data) => data.seoTitle || `${data.title} Walkthrough: GTA 6 Mission ${parseInt(data.page.fileSlug, 10) || ""} Guide`,
    description: (data) =>
      data.description ||
      `Step-by-step walkthrough for ${data.title}, story mission ${parseInt(data.page.fileSlug, 10) || ""} in GTA 6, with objectives, bonus targets and missable warnings.`,
  },
};
