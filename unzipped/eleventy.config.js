import * as yaml from "js-yaml";
import fs from "node:fs";

export default function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  const WIX = "https://static.wixstatic.com/media/";
  const DIMS = { big:[760,760], wide:[760,400], tall:[400,800], square:[400,400] };
  const DIMS_HOME = { wide:[600,300], square:[300,300] };

  // Photos come from two places: the Wix media library (existing shots) and
  // files uploaded through the editor (which land in /uploads). Wix resizes its
  // own; uploads go through Netlify Image CDN so a phone photo doesn't ship at
  // full size.
  const sized = (src, w, h, fit) => {
    if (src.startsWith(WIX)) {
      const id = src.slice(WIX.length).split("/")[0];
      return fit === "fit"
        ? `${WIX}${id}/v1/fit/w_${w},h_${h},q_90/${id}`
        : `${WIX}${id}/v1/fill/w_${w},h_${h},al_c,q_85/${id}`;
    }
    const mode = fit === "fit" ? "contain" : "cover";
    return `/.netlify/images?url=${encodeURIComponent(src)}&fit=${mode}&w=${w}&h=${h}`;
  };

  eleventyConfig.addFilter("thumb", (src, size, home) => {
    const d = (home ? DIMS_HOME : DIMS)[size] || (home ? DIMS_HOME.square : DIMS.square);
    return sized(src, d[0], d[1], "fill");
  });
  eleventyConfig.addFilter("full", (src) => sized(src, 1600, 1600, "fit"));
  eleventyConfig.addPassthroughCopy({ "static": "/" });
  eleventyConfig.addPassthroughCopy("src/admin");
  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
