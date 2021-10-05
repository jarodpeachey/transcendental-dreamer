import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql, withPrefix } from "gatsby";
import "../styles/_layout.scss";

function SEO({ description, title, bodyClass, image = null }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
          }
        }
      }
    `
  );

  const defaultDescription = site.siteMetadata.description;
  const defaultTitle = site.siteMetadata.title;

  return (
    <Helmet bodyAttributes={{ class: bodyClass }} title={title || defaultTitle}>
      <meta name="description" content={description || defaultDescription} />
      <meta name="og:title" content={title || defaultTitle} />
      <meta name="og:description" content={description || defaultDescription} />
      <meta name="og:type" content="website" />
      <link rel="icon" type="image/svg+xml" href="/media/img/Logo Solid.png"></link>
      <meta name="og:image" content={image || `https://jellydevelopment.com/media/img/SEO.png?test=true`} />
      <meta name="twitter:image" content={image || `https://jellydevelopment.com/media/img/SEO.png?test=true`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={site.siteMetadata.author} />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />

      <script src={withPrefix("js/main.js")} type="text/javascript" defer="true" />
    </Helmet>
  );
}

export default SEO;
