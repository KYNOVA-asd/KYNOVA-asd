const { default: purgecss } = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production"
      ? [purgecss({
          content: ["./**/*.html", "./src/**/*.js"],
          safelist: { standard: [/^(is-|has-|project-|case-|category-|service-|blog-|process-|insta-|review-|reviews-|conversion-|home-)/, "active"] },
        })]
      : []),
  ],
};
