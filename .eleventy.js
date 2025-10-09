const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");

  // Configure markdown processing
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "direct-link",
      symbol: "#",
    }),
    level: [1,2,3,4],
    slugify: eleventyConfig.getFilter("slug")
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Create a collection for blog posts (exclude drafts in production)
  eleventyConfig.addCollection("posts", function(collectionApi) {
    // Check multiple ways to detect production environment
    const isProduction = process.env.NODE_ENV === 'production' || 
                        process.env.VERCEL_ENV === 'production' ||
                        process.env.CONTEXT === 'production';
    
    return collectionApi.getFilteredByGlob("src/posts/*.md")
      .filter(function(item) {
        // In production, exclude drafts
        // In development, show all posts including drafts
        if (isProduction) {
          return !item.data.draft;
        }
        return true; // Show all posts in development
      })
      .sort(function(a, b) {
        return b.date - a.date; // Sort by date, newest first
      });
  });

  // Create a collection for all posts including drafts (for development)
  eleventyConfig.addCollection("allPosts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort(function(a, b) {
      return b.date - a.date; // Sort by date, newest first
    });
  });

  // Add date filter (simple version)
  eleventyConfig.addFilter("date", function(date, format) {
    const d = new Date(date);
    if (format === 'Y-m-d') {
      return d.toISOString().split('T')[0];
    }
    return d.toISOString();
  });

  // Add date filter for display
  eleventyConfig.addFilter("dateFilter", function(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  // Add reading time filter
  eleventyConfig.addFilter("readingTime", function(content) {
    const wordsPerMinute = 200;
    const numberOfWords = content.split(/\s/g).length;
    const minutes = Math.ceil(numberOfWords / wordsPerMinute);
    return `${minutes} min read`;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes/layouts"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};