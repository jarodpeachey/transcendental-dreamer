import * as React from "react";
import { graphql } from "gatsby";
import { Layout } from "../../components/layout";
import { ProductListing } from "../../components/product-listing";
import SEO from "../../components/SEO";
import { MoreButton } from "../../components/more-button";
import { title } from "./index.module.css";

export default function Products({ data: { products } }) {
  return (
    <>
      <SEO bodyClass="contact" title="All products" />
      <Layout>
        <h1 className={title}>Products</h1>
        <ProductListing products={products.nodes} />
        {products.pageInfo.hasNextPage && <MoreButton to={`/search#more`}>More products</MoreButton>}
      </Layout>
    </>
  );
}

export const query = graphql`
  {
    products: allShopifyProduct(sort: { fields: publishedAt, order: ASC }, limit: 24) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
