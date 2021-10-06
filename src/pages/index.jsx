import * as React from "react";
import { graphql } from "gatsby";
import ProductGrid from "../components/ProductGrid";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import "../styles/partials/pages/_home.scss";

export const query = graphql`
  query {
    shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        ...ProductCard
      }
    }
  }
`;

const Home = ({ data }) => {
  return (
    <Layout transparent>
      <SEO bodyClass="home" title="Transcendental Dreamer" />
      <div className="hero">
        <div className="container">
          <div className="card">
            <h1>Designed to inspire</h1>
            <a href="/" className="btn">
              SHOP NOW
            </a>
          </div>
        </div>
      </div>
      <section className="products">
        <div className="container">
          <h2>The Classics Collection</h2>
          <ProductGrid products={data?.shopifyCollection?.products} />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
