import * as React from "react";
import ProductCard from "./ProductCard";
import slugify from "@sindresorhus/slugify";
import "../styles/partials/_product-grid.scss";

// To optimize LCP we mark the first product card as eager so the image gets loaded faster
const ProductGrid = ({ products = [], searchResult }) => {
  return (
    <div className={`product-grid ${searchResult ? "search-result" : ""}`}>
      {products.map((p, index) => (
        <ProductCard
          product={searchResult ? p.node : p}
          key={searchResult ? p.node.id : p.id}
          eager={index === 0}
          searchResult={searchResult}
          slug={searchResult ? `/products${slugify(p.node.productType)}/${p.node.handle}` : p.slug}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
