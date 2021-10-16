import * as React from "react";
import { graphql } from "gatsby";
import slugify from "@sindresorhus/slugify";
import debounce from "debounce";
import { CgChevronRight, CgChevronLeft } from "react-icons/cg";
import Layout from "../components/Layout";
import CloseIcon from "../icons/CloseIcon";
import SortIcon from "../icons/SortIcon";
import FilterIcon from "../icons/FilterIcon";
import SearchIcon from "../icons/SearchIcon";
import ProductGrid from "../components/ProductGrid";
import { getValuesFromQueryString, useProductSearch } from "../utils/hooks";
import { getCurrencySymbol } from "../utils/format-price";
import { Spinner } from "../components/progress";
import SidebarFilters from "../components/SidebarFilters";
import { SearchProvider } from "../context/search-provider";
import {
  visuallyHidden,
  main,
  search,
  searchIcon,
  sortSelector,
  results,
  productList as productListStyle,
  productListItem,
  pagination,
  paginationButton,
  progressStyle,
  resultsStyle,
  filterStyle,
  clearSearch,
  searchForm,
  sortIcon,
  filterButton,
  filterTitle,
  modalOpen,
  activeFilters,
  filterWrap,
} from "./search-page.module.css";
import "../styles/partials/pages/_search.scss";
import SEO from "../components/SEO";

export const query = graphql`
  query {
    meta: allShopifyProduct {
      productTypes: distinct(field: productType)
      tags: distinct(field: tags)
      vendors: distinct(field: vendor)
    }
    products: allShopifyProduct(limit: 24, sort: { fields: title }) {
      edges {
        node {
          title
          vendor
          productType
          handle
          priceRangeV2 {
            minVariantPrice {
              currencyCode
              amount
            }
            maxVariantPrice {
              currencyCode
              amount
            }
          }
          id
          images {
            gatsbyImageData(aspectRatio: 1, width: 200, layout: FIXED)
            id
          }
        }
      }
    }
  }
`;

function SearchPage({
  data: {
    meta: { productTypes, vendors, tags },
    products,
  },
  location,
}) {
  // These default values come from the page query string
  const queryParams = getValuesFromQueryString(location.search);
  const [filters, setFilters] = React.useState(queryParams);
  const [sortKey, setSortKey] = React.useState(queryParams.sortKey);
  // We clear the hash when searching, we want to make sure the next page will be fetched due the #more hash.
  const shouldLoadNextPage = React.useRef(false);

  // This modal is only used on mobile
  const [showModal, setShowModal] = React.useState(false);

  const { data, isFetching, productsFromSearch, filterCount, hasNextPage, hasPreviousPage, fetchNextPage, fetchPreviousPage } = useProductSearch(
    filters,
    {
      allProductTypes: productTypes,
      allVendors: vendors,
      allTags: tags,
    },
    sortKey,
    false,
    24 // Products per page
  );

  // If we're using the default filters, use the products from the Gatsby data layer.
  // Otherwise, use the data from search.
  const isDefault = !data;
  const productList = (isDefault ? products.edges : data?.products?.edges) ?? [];

  // Scroll up when navigating
  React.useEffect(() => {
    if (!showModal) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
        // eslint-disable-next-line react-hooks/exhaustive-deps
      });
    }
  }, [productList, showModal]);

  // Stop page from scrolling when modal is visible
  React.useEffect(() => {
    if (showModal) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [showModal]);

  // Automatically load the next page if "#more" is in the URL
  React.useEffect(() => {
    if (location.hash === "#more") {
      // save state so we can fetch it when the first page got fetched to retrieve the cursor
      shouldLoadNextPage.current = true;
    }

    if (shouldLoadNextPage.current) {
      if (hasNextPage) {
        fetchNextPage();
      }

      shouldLoadNextPage.current = false;
    }
  }, [location.hash]);

  const currencyCode = getCurrencySymbol(products?.[0]?.node?.priceRangeV2?.minVariantPrice?.currencyCode);

  return (
    <>
      <SEO bodyClass="search" title="Search | Transcendental Dreamer" />
      <Layout>
        <div className="search__wrapper">
          <div className="container">
            <h1>Search Results</h1>
            <div className="search-bar" aria-hidden={modalOpen}>
              <div className="search-bar__left">
                {" "}
                <SearchBar defaultTerm={filters.term} setFilters={setFilters} />
                <button
                  className="filter btn"
                  onClick={() => setShowModal(show => !show)}
                  // This is hidden because the filters are already visible to
                  // screenreaders, so the modal isnt needed.
                  aria-hidden
                >
                  Advanced filters
                </button>
              </div>

              <div className="search-bar__right">
                <div className="d-block">
                  <label for="sort-by">Sort by:</label>
                  <select
                    name="sort-by"
                    value={sortKey}
                    // eslint-disable-next-line
                    onChange={e => setSortKey(e.target.value)}
                  >
                    <option value="RELEVANCE">Relevance</option>
                    <option value="PRICE">Price</option>
                    <option value="TITLE">Title</option>
                    <option value="CREATED_AT">New items</option>
                    <option value="BEST_SELLING">Trending</option>
                  </select>
                </div>
                {/* <div className="d-none">
                  <SortIcon
                    className="sort-icon"
                    onClick={e => {
                      if (document.querySelector(".sort-menu").classList.contains("open")) {
                        document.querySelector(".sort-menu").classList.remove("open");
                      } else {
                        document.querySelector(".sort-menu").classList.add("open");
                      }
                    }}
                  />

                  <div className="sort-menu">
                    <div
                      className="sort-menu__option"
                      onClick={e => {
                        let elements = document.querySelectorAll(".sort-menu__option");

                        Array.from(elements).forEach(item => item.classList.remove("active"));
                        e.target.classList.add("active");
                        setSortKey("RELEVANCE");
                      }}
                    >
                      Relevance
                    </div>
                    <div
                      className="sort-menu__option"
                      onClick={e => {
                        let elements = document.querySelectorAll(".sort-menu__option");

                        Array.from(elements).forEach(item => item.classList.remove("active"));
                        e.target.classList.add("active");
                        setSortKey("PRICE");
                      }}
                    >
                      Price
                    </div>
                    <div
                      className="sort-menu__option"
                      onClick={e => {
                        let elements = document.querySelectorAll(".sort-menu__option");

                        Array.from(elements).forEach(item => item.classList.remove("active"));
                        e.target.classList.add("active");
                        setSortKey("TITLE");
                      }}
                    >
                      Title
                    </div>
                    <div
                      className="sort-menu__option"
                      onClick={e => {
                        let elements = document.querySelectorAll(".sort-menu__option");

                        Array.from(elements).forEach(item => item.classList.remove("active"));
                        e.target.classList.add("active");
                        setSortKey("CREATED_AT");
                      }}
                    >
                      New items
                    </div>
                    <div
                      className="sort-menu__option"
                      onClick={e => {
                        let elements = document.querySelectorAll(".sort-menu__option");

                        Array.from(elements).forEach(item => item.classList.remove("active"));
                        e.target.classList.add("active");
                        setSortKey("BEST_SELLING");
                      }}
                    >
                      Trending
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="results">
              <section className={`sidebar ${showModal && "open"}`}>
                <div className="container">
                  <div className="sidebar__title">
                    <h3>Filter results</h3>
                    <button aria-hidden onClick={() => setShowModal(false)}>
                      <CloseIcon />
                    </button>
                  </div>
                  <div className="sidebar__content">
                    <SidebarFilters
                      setFilters={setFilters}
                      filters={filters}
                      tags={tags}
                      vendors={vendors}
                      productTypes={productTypes}
                      currencyCode={currencyCode}
                    />
                  </div>
                </div>
              </section>
              <section className="results__content" aria-busy={isFetching} aria-hidden={modalOpen}>
                {isFetching ? (
                  <p className={progressStyle}>
                    <Spinner aria-valuetext="Searching" /> Searching
                    {filters.term ? ` for "${filters.term}"…` : `…`}
                  </p>
                ) : (
                  <p className="results__content__title ">
                    Search results{" "}
                    {filters.term && (
                      <>
                        for "<span>{filters.term}</span>"
                      </>
                    )}
                  </p>
                )}
                <ProductGrid products={productList} searchResult={true} />
                {/* <ul className={productListStyle}>
                  {!isFetching &&
                    productList.map(({ node }, index) => (
                      <li className={productListItem} key={node.id}>
                        <ProductCard
                          eager={index === 0}
                          searchResult={true}
                          images={node.images.edges}
                          product={{
                            title: node.title,
                            priceRangeV2: node.priceRangeV2,
                            slug: `/products/${slugify(node.productType)}/${node.handle}`,
                            // The search API and Gatsby data layer have slightly different images available.
                            images: isDefault ? node.images : node.images.edges,
                            storefrontImages: !isDefault && node.images,
                            vendor: node.vendor,
                          }}
                        />
                      </li>
                    ))}
                </ul> */}
                {hasPreviousPage || hasNextPage ? (
                  <Pagination previousPage={fetchPreviousPage} hasPreviousPage={hasPreviousPage} nextPage={fetchNextPage} hasNextPage={hasNextPage} />
                ) : undefined}
              </section>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

function SearchBar({ defaultTerm, setFilters }) {
  const [term, setTerm] = React.useState(defaultTerm);
  const debouncedSetFilters = React.useCallback(
    debounce(value => {
      setFilters(filters => ({ ...filters, term: value }));
    }, 200),
    [setFilters]
  );

  return (
    <form onSubmit={e => e.preventDefault()}>
      <label for="search">Search</label>
      <div className="form__flex">
        <input
          type="text"
          name="search"
          value={term}
          onChange={e => {
            setTerm(e.target.value);
            debouncedSetFilters(e.target.value);
          }}
          placeholder="Search..."
        />
        {term ? (
          <button
            className="clear-search btn"
            type="reset"
            onClick={() => {
              setTerm("");
              setFilters(filters => ({ ...filters, term: "" }));
            }}
            aria-label="Clear search query"
          >
            <CloseIcon />
          </button>
        ) : undefined}
      </div>
    </form>
  );
}
/**
 * Shopify only supports next & previous navigation
 */
function Pagination({ previousPage, hasPreviousPage, nextPage, hasNextPage }) {
  return (
    <nav className={pagination}>
      <button className={paginationButton} disabled={!hasPreviousPage} onClick={previousPage} aria-label="Previous page">
        <CgChevronLeft />
      </button>
      <button className={paginationButton} disabled={!hasNextPage} onClick={nextPage} aria-label="Next page">
        <CgChevronRight />
      </button>
    </nav>
  );
}

export default function SearchPageTemplate(props) {
  return (
    <SearchProvider>
      <SearchPage {...props} />
    </SearchProvider>
  );
}
