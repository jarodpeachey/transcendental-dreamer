import * as React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";
import { StoreContext } from "../context/store-context";
import { LineItem } from "../components/line-item";
import { formatPrice } from "../utils/format-price";
import {
  table,
  wrap,
  totals,
  grandTotal,
  summary,
  checkoutButton,
  collapseColumn,
  labelColumn,
  imageHeader,
  productHeader,
  emptyStateContainer,
  emptyStateHeading,
  emptyStateLink,
  title,
} from "./cart.module.css";
import "../styles/partials/pages/_cart.scss";
import SEO from "../components/SEO";

export default function CartPage() {
  const { checkout, loading } = React.useContext(StoreContext);
  const emptyCart = checkout.lineItems.length === 0;

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
                  {checkout.lineItems.map(item => (
                    <LineItem item={item} key={item.id} />
                  ))}
                <table>
                  <thead>
                    <tr>
                      <th className="image">Image</th>
                      <th className="product">Product</th>
                      <th className="collapse">Price</th>
                      <th>Qty.</th>
                      <th className="collapse totals">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {checkout.lineItems.map(item => (
                      <LineItem item={item} key={item.id} />
                    ))}

                    <tr className="summary">
                      <td className="collapse"></td>
                      <td className="collapse"></td>
                      <td className="collapse"></td>
                      <td className="label">Subtotal</td>
                      <td className="totals">{formatPrice(checkout.subtotalPriceV2.currencyCode, checkout.subtotalPriceV2.amount)}</td>
                    </tr>
                    <tr className="summary">
                      <td className="collapse"></td>
                      <td className="collapse"></td>
                      <td className="collapse"></td>
                      <td className="label">Taxes</td>
                      <td className="totals">{formatPrice(checkout.totalTaxV2.currencyCode, checkout.totalTaxV2.amount)}</td>
                    </tr>
                    <tr className="summary">
                      <td className="collapse"></td>
                      <td className="collapse"></td>
                      <td className="collapse"></td>
                      <td className="label">Shipping</td>
                      <td className="totals">Calculated at checkout</td>
                    </tr>
                    <tr className="grand-total">
                      <td className="collapse"></td>
                      <td className="collapse"></td>
                      <td className="collapse"></td>
                      <td className="label">Total Price</td>
                      <td className="totals">{formatPrice(checkout.totalPriceV2.currencyCode, checkout.totalPriceV2.amount)}</td>
                    </tr>
                  </tbody>
                </table>
                <button onClick={handleCheckout} disabled={loading} className={checkoutButton}>
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
