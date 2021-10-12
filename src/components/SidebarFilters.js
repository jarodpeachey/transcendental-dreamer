import * as React from "react";
import SidebarFilter from "./SidebarFilter";
import CurrencyField from "./CurrencyField";
import "../styles/partials/components/_sidebar-filters.scss";
import CloseIcon from "../icons/CloseIcon";

const SidebarFilters = ({ currencyCode, productTypes, tags, vendors, filters, setFilters }) => {
  const updateFilter = (key, value) => {
    setFilters(filters => ({ ...filters, [key]: value }));
  };

  const updateNumeric = (key, value) => {
    if (!isNaN(Number(value)) || (value.endsWith(".") && !isNaN(Number(value.substring(0, -1))))) {
      updateFilter(key, value);
    }
  };

  let open = true;

  return (
    <div className="sidebar-filters">
      <SidebarFilter name="Type" items={productTypes} selectedItems={filters.productTypes} setSelectedItems={value => updateFilter("productTypes", value)} />
      <details className="filter-item" open={open}>
        <summary
          className={open ? "open" : ""}
          onClick={e => {
            if (e.target.classList.contains("filter-item__title")) {
              open ? e.target.parentElement.classList.remove("open") : e.target.parentElement.classList.add("open");
            } else if (e.target.classList.contains("filter-item__icon")) {
              open
                ? e.target.parentElement.parentElement.parentElement.classList.remove("open")
                : e.target.parentElement.parentElement.parentElement.classList.add("open");
            } else if (e.target.classList.contains("filter-item__right")) {
              open ? e.target.parentElement.parentElement.classList.remove("open") : e.target.parentElement.parentElement.classList.add("open");
            } else {
              open
                ? e.target.parentElement.parentElement.parentElement.parentElement.classList.remove("open")
                : e.target.parentElement.parentElement.parentElement.parentElement.classList.add("open");
            }
            open = !open;
          }}
        >
          <div className="filter-item__title">
            <div className="filter-item__left">
              <h5>Price</h5>{" "}
              {(filters.maxPrice || filters.minPrice) && (
                <button
                  className="filter-item__clear"
                  onClick={() =>
                    setFilters(filters => ({
                      ...filters,
                      maxPrice: "",
                      minPrice: "",
                    }))
                  }
                >
                  Reset
                </button>
              )}
            </div>
            <div className="filter-item__right">
              <CloseIcon className="filter-item__icon" />{" "}
            </div>
          </div>
        </summary>
        <div className="filter-item__prices">
          <CurrencyField
            {...currencyCode}
            aria-label="Minimum price"
            value={filters.minPrice}
            onChange={event => updateNumeric("minPrice", event.currentTarget.value)}
          />
          <span className="filter-item__text">to</span>
          <CurrencyField
            {...currencyCode}
            aria-label="Maximum price"
            value={filters.maxPrice}
            onChange={event => updateNumeric("maxPrice", event.currentTarget.value)}
          />
        </div>
      </details>
      <SidebarFilter name="Brands" items={vendors} selectedItems={filters.vendors} setSelectedItems={value => updateFilter("vendors", value)} />
      <SidebarFilter open={true} name="Tags" items={tags} selectedItems={filters.tags} setSelectedItems={value => updateFilter("tags", value)} />
    </div>
  );
};

export default SidebarFilters;
