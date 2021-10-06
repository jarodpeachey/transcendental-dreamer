const dotenv = require("dotenv")

if (process.env.NODE_ENV !== "production") {
  dotenv.config()
}

module.exports = {
  siteMetadata: {
    siteTitle: "gatsby-starter-shopify",
    siteTitleDefault: "gatsby-starter-shopify by @GatsbyJS",
    siteUrl: "https://shopify-demo.gatsbyjs.com",
    hrefLang: "en",
    siteDescription:
      "A Gatsby starter using the latest Shopify plugin showcasing a store with product overview, individual product pages, and a cart.",
    siteImage: "/default-og-image.jpg",
    twitter: "@gatsbyjs",
  },
  flags: {
    FAST_DEV: true,
  },
  plugins: [
    {
      resolve: "gatsby-source-shopify",
      options: {
        password: process.env.SHOPIFY_SHOP_PASSWORD,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyConnections: ["collections"],
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-gatsby-cloud",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/media/img`,
      },
    },
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-purgecss",
      options: {
        printRejected: true,
        develop: false,
        tailwind: false,
        whitelist: ["scrolled", "open", "blur"],
      },
    },
    "gatsby-plugin-split-css",
    {
      resolve: "gatsby-plugin-no-javascript-utils",
      options: {
        noSourcemaps: true,
        removeGeneratorTag: true,
        removeReactHelmetAttrs: true,
        noInlineStyles: false,
        removeGatsbyAnnouncer: true,
        removeFocusWrapper: false,
        removePreloadLinks: false,
      },
    },
    // {
    //   resolve: "gatsby-plugin-no-javascript",
    //   options: {
    //     excludeFiles: "request",
    //   },
    // },
    "gatsby-plugin-robots-txt",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-zopfli",
    },
  ].filter(Boolean),
}
