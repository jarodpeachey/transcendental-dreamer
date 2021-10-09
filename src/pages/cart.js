import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import { StoreContext } from "../context/store-context";
import LineItem from "../components/LineItem";
import { formatPrice } from "../utils/format-price";
import "../styles/partials/pages/_cart.scss";
import SEO from "../components/SEO";

export default function CartPage() {
  const { checkout, loading } = React.useContext(StoreContext);
  const emptyCart = checkout.lineItems ? checkout.lineItems.length === 0 : true;

  const handleCheckout = () => {
    window.open(checkout.webUrl);
  };

  return (
    <>
      <SEO bodyClass="cart" title="Cart | Transcendental Dreamer" />
      <Layout>
        <div className="cart__wrapper">
          <div className="container">
            {emptyCart ? (
              <div className="card">
                <h1>Your cart is empty</h1>
                <p>Looks like you haven’t found anything yet. We understand that sometimes it’s hard to choose — maybe this helps:</p>
                <Link className="btn" to="/search?s=BEST_SELLING">
                  View trending products
                </Link>
              </div>
            ) : (
              <>
                <h1>Your cart</h1>
                  {checkout.lineItems && checkout.lineItems.map(item => (
                    <LineItem item={item} key={item.id} />
                  ))}
                <div className="summary">
                  Subtotal:{'   '}<strong>{formatPrice(checkout.subtotalPriceV2.currencyCode, checkout.subtotalPriceV2.amount)}</strong>
                </div>
                <div className="summary">
                  Taxes:{'   '}<strong>{formatPrice(checkout.totalTaxV2.currencyCode, checkout.totalTaxV2.amount)}</strong>
                </div>
                {/* <div className="summary">
                  Shipping:{'   '}<strong>Calculated at checkout</strong>
                </div> */}
                <div className="summary">
                  Total Price:{'   '}<strong>{formatPrice(checkout.totalPriceV2.currencyCode, checkout.totalPriceV2.amount)}</strong>
                </div>
                <button className="btn" onClick={handleCheckout} disabled={loading}>
                  Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
