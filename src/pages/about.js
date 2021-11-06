import * as React from "react";
import { graphql, Link } from "gatsby";
import ProductGrid from "../components/ProductGrid";
import SEO from "../components/SEO";
import Layout from "../components/Layout";
import "../styles/partials/pages/_about.scss";

export const query = graphql`
  query {
    shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        ...ProductCard
      }
    }
  }
`;

const About = ({ data }) => {
  return (
    <Layout transparent>
      <SEO bodyClass="about" title="Transcendental Dreamer" />
      <div className="hero"></div>
      <section className="content">
        <div className="container">
          <h2>About Us</h2>
          <p>
            Here at Transcendental Dreamer, we believe dreams don't have borders or boundaries. You can't put them in a box and decide to just forget about
            them.
          </p>

          <p>Sadly, that's what the majority of society does nowadays.</p>

          <p>
            They trade their passions for a job they hate and their purpose for a lack of fulfillment. They put their dreams on the back-burner, waiting for a
            someday that never arrives.
          </p>

          <p>But we want to change that. </p>

          <p>We believe dreams never die. They're limitless. They transcend lifetimes and create something worth living for.</p>

          <p>That's why Transcendental Dreamer was built to inspire others to follow their calling, live with purpose, and chase after their dreams.</p>

          <p>
            The future belongs to the visionaries. The ones who are willing to take risks and create their own rules. The ones who are willing to overcome their
            fears, pave their own path, and dream a better tomorrow.
          </p>

          <p>Because sometimes to change the world, all it takes is a dream.</p>
        </div>
      </section>
    </Layout>
  );
};

export default About;
