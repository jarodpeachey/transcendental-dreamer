import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../../../components/Layout";
import isEqual from "lodash.isequal";
import { GatsbyImage, getSrc } from "gatsby-plugin-image";
import { StoreContext } from "../../../context/store-context";
import AddToCart from "../../../components/AddToCart";
import NumericInput from "../../../components/NumericInput";
import { formatPrice } from "../../../utils/format-price";
import SEO from "../../../components/SEO";
import "../../../styles/partials/pages/_product.scss";
import { CgChevronRight as ChevronIcon } from "react-icons/cg";

export default function Product({ data: { product, suggestions } }) {
  const {
    options,
    variants,
    variants: [initialVariant],
    priceRangeV2,
    title,
    description,
    images,
    images: [firstImage],
  } = product;
  const { client } = React.useContext(StoreContext);

  const [variant, setVariant] = React.useState({ ...initialVariant });
  const [quantity, setQuantity] = React.useState(1);

  const productVariant = client.product.helpers.variantForOptions(product, variant) || variant;

  const [available, setAvailable] = React.useState(productVariant.availableForSale);

  const checkAvailablity = React.useCallback(
    productId => {
      client.product.fetch(productId).then(fetchedProduct => {
        const result = fetchedProduct?.variants.filter(variant => variant.id === productVariant.storefrontId) ?? [];

        if (result.length > 0) {
          setAvailable(result[0].available);
        }
      });
    },
    [productVariant.storefrontId, client.product]
  );

  const handleOptionChange = (index, value) => {
    if (value === "") {
      return;
    }

    const currentOptions = [...variant.selectedOptions];

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    };

    const selectedVariant = variants.find(variant => {
      return isEqual(currentOptions, variant.selectedOptions);
    });

    setVariant({ ...selectedVariant });

    console.log(selectedVariant, value);
  };

  React.useEffect(() => {
    checkAvailablity(product.storefrontId);
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId]);

  const price = formatPrice(priceRangeV2.minVariantPrice.currencyCode, variant.price);

  const hasVariants = variants.length > 1;
  const hasImages = images.length > 0;
  const hasMultipleImages = true || images.length > 1;

  return (
    <Layout>
      {firstImage ? (
        <SEO script="js/options.js" bodyClass="product" title={title} description={description} image={getSrc(firstImage.gatsbyImageData)} />
      ) : (
        <SEO script="js/options.js" title={title} description={description} bodyClass="product" />
      )}
      <div className="product__wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              {hasImages && (
                <div className="image__wrapper">
                  <div role="group" aria-label="gallery" aria-describedby="instructions">
                    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                      {images.map((image, index) => {
                        if (index === 0) {
                          return (
                            <li key={`product-image-${image.id}`}>
                              <GatsbyImage
                                objectFit="contain"
                                loading={index === 0 ? "eager" : "lazy"}
                                alt={image.altText ? image.altText : `Product Image of ${title} #${index + 1}`}
                                image={image.gatsbyImageData}
                              />
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                  {/* {hasMultipleImages && (
                  <div id="instructions">
                    <span aria-hidden="true">←</span> scroll for more <span aria-hidden="true">→</span>
                  </div>
                )} */}
                </div>
              )}
            </div>
            <div className="col-md-7">
              {product.productType && (
                <div>
                  <Link to={product.productTypeSlug}>{product.productType}</Link>
                  <ChevronIcon size={12} />
                </div>
              )}
              <h1>{title}</h1>
              <span>{price}</span>
              <p>{description}</p>
              {hasVariants &&
                options.map(({ id, name, values }, index) => (
                  <div className="options" key={id}>
                    <div className="options__title">{name}</div>
                    <div style={{ display: "flex" }}>
                      {values.map(value => (
                        <div className="option" key={name} onClick={event => handleOptionChange(index, value)}>
                          {value}
                        </div>
                      ))}
                    </div>

                    {/* <select aria-label="Variants" onChange={event => handleOptionChange(index, event)}>
                    <option value="">{`Select ${name}`}</option>
                    {values.map(value => (
                      <option value={value} key={`${name}-${value}`}>
                        {value}
                      </option>
                    ))}
                  </select> */}
                  </div>
                ))}
              <div className="button__flex">
                <div className="options__title">Quantity</div>
                <NumericInput
                  aria-label="Quantity"
                  onIncrement={() => setQuantity(q => Math.min(q + 1, 20))}
                  onDecrement={() => setQuantity(q => Math.max(1, q - 1))}
                  onChange={event => setQuantity(event.currentTarget.value)}
                  value={quantity}
                  min="1"
                  max="20"
                />
                <AddToCart variantId={productVariant.storefrontId} quantity={quantity} available={available} />
              </div>
              <div>
                <span className="options__title">Tags</span>
                <span>
                  {product.tags.map(tag => (
                    <Link className="tag" to={`/search?t=${tag}`}>{tag}</Link>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query ($id: String!, $productType: String!) {
    product: shopifyProduct(id: { eq: $id }) {
      title
      description
      productType
      productTypeSlug: gatsbyPath(filePath: "/products/{ShopifyProduct.productType}")
      tags
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      images {
        # altText
        id
        gatsbyImageData(layout: CONSTRAINED, width: 640, aspectRatio: 1)
      }
      variants {
        availableForSale
        storefrontId
        title
        price
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        id
      }
    }
    suggestions: allShopifyProduct(limit: 3, filter: { productType: { eq: $productType }, id: { ne: $id } }) {
      nodes {
        ...ProductCard
      }
    }
  }
`;
