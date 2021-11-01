import * as React from "react";
import { graphql, Link } from "gatsby";
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
      <section className="inspire">
        <div className="container">
          <h2>Made To Inspire</h2>
          <p>
            Transcendental Dreamer was founded on the simple idea that inspired people inspire others. Because with a little inspiration, there's nothing
            stopping you from living the life you've always dreamed of.
          </p>
          <Link to="/search" className="btn">
            View Products
          </Link>
        </div>
      </section>
      <section className="mission">
        <img src="/media/img/mission.jpg" alt="" />
        <div className="container">
          <div className="mission-card">
            <h2>Join the Mission</h2>
            <p>Our mission is to inspire others to chase their dreams.</p>
            <p>For every purchase you make, we'll send 10% to non-profit organizations making a difference around the world.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
