import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../../components/Layout";
import SEO from "../../../components/SEO";
import slugify from "@sindresorhus/slugify";
import { MoreButton } from "../../../components/more-button";
import ProductGrid from "../../../components/ProductGrid";
import "../../../styles/partials/pages/_products.scss"

export default function ProductTypeIndex({ data: { products }, pageContext: { productType } }) {
  return (
    <>
      <SEO title={productType ? `Category: ${productType}` : "All products"} bodyClass="products" />
      <Layout>
        <div className="products__wrapper">
          <div className="container">
            <h1>{productType || "All Products"}</h1>
            <ProductGrid products={products.nodes} />
            {products.pageInfo.hasNextPage && <MoreButton to={`/search?p=${slugify(productType)}#more`}>More Products</MoreButton>}
          </div>
        </div>
      </Layout>
    </>
  );
}

export const query = graphql`
  query ($productType: String!) {
    products: allShopifyProduct(filter: { productType: { eq: $productType } }, sort: { fields: publishedAt, order: ASC }, limit: 24) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
