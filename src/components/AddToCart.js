import * as React from "react";
import { StoreContext } from "../context/store-context";
import { addToCart as addToCartStyle } from "./add-to-cart.module.css";

const AddToCart = ({ variantId, quantity, available, ...props }) => {
  const { addVariantToCart, loading } = React.useContext(StoreContext);

  function addToCart(e) {
    e.preventDefault();
    addVariantToCart(variantId, quantity);
  }

  return (
    <button type="submit" className="btn" onClick={addToCart} disabled={!available || loading} {...props}>
      {available ? "Add to Cart" : "Out of Stock"}
    </button>
  );
};

export default AddToCart;
