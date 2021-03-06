import * as React from "react";
import debounce from "lodash.debounce";
import { StoreContext } from "../context/store-context";
import { formatPrice } from "../utils/format-price";
import { GatsbyImage } from "gatsby-plugin-image";
import { getShopifyImage } from "gatsby-source-shopify";
import DeleteIcon from "../icons/DeleteIcon";
import NumericInput from "./NumericInput";
import "../styles/partials/components/_line-item.scss";

const LineItem = ({ item }) => {
  const { removeLineItem, checkout, updateLineItem, loading } = React.useContext(StoreContext);
  const [quantity, setQuantity] = React.useState(item.quantity);

  const variantImage = {
    ...item.variant.image,
    originalSrc: item.variant.image.src,
  };
  const price = formatPrice(item.variant.priceV2.currencyCode, Number(item.variant.priceV2.amount));

  const subtotal = formatPrice(item.variant.priceV2.currencyCode, Number(item.variant.priceV2.amount) * quantity);

  const handleRemove = () => {
    removeLineItem(checkout.id, item.id);
  };

  const uli = debounce(value => updateLineItem(checkout.id, item.id, value), 300);
  // eslint-disable-next-line
  const debouncedUli = React.useCallback(value => uli(value), []);

  const handleQuantityChange = value => {
    if (value !== "" && Number(value) < 1) {
      return;
    }
    setQuantity(value);
    if (Number(value) >= 1) {
      debouncedUli(value);
    }
  };

  function doIncrement() {
    handleQuantityChange(Number(quantity || 0) + 1);
  }

  function doDecrement() {
    handleQuantityChange(Number(quantity || 0) - 1);
  }

  const image = React.useMemo(
    () =>
      getShopifyImage({
        image: variantImage,
        layout: "constrained",
        crop: "contain",
        width: 160,
        height: 160,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [variantImage.src]
  );

  return (
    <div className="line-item">
      <div className="line-item__left">
        {image && <GatsbyImage key={variantImage.src} image={image} alt={variantImage.altText ?? item.variant.title} />}
        <div className="line-item__content">
          <h2>
            {item.title} <span>x{quantity}</span>
          </h2>
          <div className="flex">
            {item.variant && item.variant.title !== "Default Title" && (
              <p className="category">{item.variant.title === "Default Title" ? "" : item.variant.title}</p>
            )}
            <p>{price}</p>
          </div>
          <div className="flex">
            <NumericInput
              disabled={loading}
              value={quantity}
              aria-label="Quantity"
              onIncrement={doIncrement}
              onDecrement={doDecrement}
              onChange={e => handleQuantityChange(e.currentTarget.value)}
            />
            <button onClick={handleRemove} className="remove">
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="line-item__right">{subtotal}</div>
    </div>
    // <tr>
    //   <td></td>
    //   <td>

    //     <div className={remove}>
    // <button onClick={handleRemove}>
    //   <DeleteIcon /> Remove
    // </button>
    //     </div>
    //   </td>
    //   <td className={priceColumn}>{price}</td>
    //   <td>

    //   </td>
    //   <td className={totals}>{subtotal}</td>
    // </tr>
  );
};

export default LineItem;
