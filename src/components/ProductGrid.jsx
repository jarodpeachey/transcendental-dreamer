import * as React from "react"
import ProductCard from "./ProductCard"
import "../styles/partials/_product-grid.scss";

// To optimize LCP we mark the first product card as eager so the image gets loaded faster
const ProductGrid = ({ products = [] }) => {
  return (
    <div className="product-grid">
      {products.map((p, index) => (
        <ProductCard product={p} key={p.id} eager={index === 0} />
      ))}
    </div>
  )
}

export default ProductGrid;
