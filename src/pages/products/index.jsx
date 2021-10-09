import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import SEO from "../../components/SEO";
import { MoreButton } from "../../components/more-button";
import { title } from "./index.module.css";
import ProductGrid from "../../components/ProductGrid";

export default function Products({ data: { products } }) {
  return (
    <>
      <SEO bodyClass="contact" title="All products" />
      <Layout>
        <div className="container">
          <h1 className={title}>Products</h1>
          <ProductGrid products={products.nodes} />
          {products.pageInfo.hasNextPage && <MoreButton to={`/search#more`}>More products</MoreButton>}
        </div>
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
