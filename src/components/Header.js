import * as React from "react";
import { Link } from "gatsby";
import { StoreContext } from "../context/store-context";
import { CartButton } from "./cart-button";
import SearchIcon from "../icons/SearchIcon";
import { Toast } from "./toast";
import "../styles/partials/_header.scss";
import CloseIcon from "../icons/CloseIcon";
import MenuIcon from "../icons/MenuIcon";

const Header = ({ transparent }) => {
  const { checkout, loading, didJustAddToCart } = React.useContext(StoreContext);

  const items = checkout ? checkout.lineItems : [];

  const quantity = items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <>
      <header>
        <nav role="navigation" aria-label="Main" className={`nav ${transparent ? "transparent" : ""}`}>
          <div className="container container--wide">
            <div className="menu__wrapper">
              <div className="logo" id="logo">
                <a href="/">TRANSCENDENTAL DREAMER</a>
              </div>
              <MenuIcon class="mobile-menu__toggle__svg mobile-menu__open" />
              <div className="icons mobile">
                <Link to="/search" className="menu__item icon">
                  <SearchIcon />
                </Link>
                <Link to="/cart" className="menu__item icon">
                  <CartButton quantity={quantity} />
                </Link>
              </div>
              <div className="navigation-menu">
                <CloseIcon class="mobile-menu__toggle__svg mobile-menu__close" />
                <ul className="menu__main">
                  <li>
                    <Link to="/products" className="menu__item">
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link to="/our-mission" className="menu__item">
                      Our Mission
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="menu__item">
                      Who We Are
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="menu__item">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="menu__item">
                      Contact
                    </Link>
                  </li>
                  <div className="icons">
                    <Link to="/search" className="menu__item icon">
                      <SearchIcon />
                    </Link>
                    <Link to="/cart" className="menu__item icon">
                      <CartButton quantity={quantity} />
                    </Link>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <Toast show={loading || didJustAddToCart}>
        {!didJustAddToCart ? (
          "Updating…"
        ) : (
          <>
            Added to cart{" "}
            <svg width="14" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.019 10.492l-2.322-3.17A.796.796 0 013.91 6.304L6.628 9.14a1.056 1.056 0 11-1.61 1.351z" fill="#fff" />
              <path d="M5.209 10.693a1.11 1.11 0 01-.105-1.6l5.394-5.88a.757.757 0 011.159.973l-4.855 6.332a1.11 1.11 0 01-1.593.175z" fill="#fff" />
              <path d="M5.331 7.806c.272.326.471.543.815.163.345-.38-.108.96-.108.96l-1.123-.363.416-.76z" fill="#fff" />
            </svg>
          </>
        )}
      </Toast>
    </>
  );
};

export default Header;
