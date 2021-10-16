import * as React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { getShopifyImage } from "gatsby-source-shopify";
import { formatPrice } from "../utils/format-price";
import "../styles/partials/_product-card.scss";
import slugify from "@sindresorhus/slugify";

const ProductCard = ({ product, eager, searchResult, slug }) => {
  const {
    title,
    priceRangeV2,
    images: [firstImage],
    vendor,
    storefrontImages,
  } = product;

  const price = formatPrice(priceRangeV2.minVariantPrice.currencyCode, priceRangeV2.minVariantPrice.amount);

  const defaultImageHeight = 200;
  const defaultImageWidth = 200;
  let storefrontImageData = {};
  if (storefrontImages) {
    const storefrontImage = storefrontImages.edges[0].node;
    try {
      storefrontImageData = getShopifyImage({
        image: storefrontImage,
        layout: "fixed",
        width: defaultImageWidth,
        height: defaultImageHeight,
      });
    } catch (e) {
      console.error(e);
    }
  }

  const hasImage = firstImage || Object.getOwnPropertyNames(storefrontImageData || {}).length;

  console.error(slug);
  return (
    <Link to={slug} aria-label={`View ${title} product page`} className="product-card">
      {searchResult ? (
        <div className={`product-card__image ${searchResult ? 'search-result' : ''}`}>
          <img
            src={
              product &&
              product.images &&
              product.images.edges &&
              product.images.edges[0] &&
              product.images.edges[0].node &&
              product.images.edges[0].node.originalSrc
            }
            alt=""
          />
        </div>
      ) : (
        <>
          {hasImage ? (
            <div className="product-card__image" data-name="product-image-box">
              <GatsbyImage alt={firstImage?.altText ?? title} image={firstImage?.gatsbyImageData ?? storefrontImageData} loading={eager ? "eager" : "lazy"} />
            </div>
          ) : (
            <div style={{ height: defaultImageHeight, width: defaultImageWidth }} />
          )}
        </>
      )}
      <div className="product-card__info">
        <h3>{title}</h3>
        <span>{price}</span>
      </div>
    </Link>
  );
};

export default ProductCard;

export const query = graphql`
  fragment ProductCard on ShopifyProduct {
    id
    title
    slug: gatsbyPath(filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}")
    images {
      id
      altText
      gatsbyImageData(aspectRatio: 1, width: 640)
    }
    priceRangeV2 {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    vendor
  }
`;
