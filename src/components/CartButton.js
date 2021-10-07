import * as React from "react";
import { Link } from "gatsby";
import CartIcon from "../icons/CartIcon";
import "../styles/partials/components/_cart-button.scss";

const CartButton = ({ quantity }) => {
  return (
    <Link aria-label={`Shopping Cart with ${quantity} items`} to="/cart" className="cart-button">
      <CartIcon />
      {quantity > 0 && <div className="badge">{quantity}</div>}
    </Link>
  );
};

export default CartButton;
