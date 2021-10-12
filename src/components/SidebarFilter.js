import * as React from "react";
import CloseIcon from "../icons/CloseIcon";
import { filter, filterOptions, clearButton, selectedLabel, checkbox } from "./check-filter.module.css";

const SidebarFilter = ({ items, name, selectedItems = [], setSelectedItems, open = true }) => {
  const toggleItem = ({ currentTarget: input }) => {
    if (input.checked) {
      setSelectedItems([...selectedItems, input.value]);
    } else {
      const idx = selectedItems.indexOf(input.value);
      if (idx === -1) {
        return;
      }
      const newItems = [...selectedItems.slice(0, idx), ...selectedItems.slice(idx + 1)];
      setSelectedItems(newItems);
    }
  };

  const clearItems = () => {
    setSelectedItems([]);
  };

  open = open;

  return (
    <details open={open} className="filter-item">
      {name && (
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
              <h5>{name}</h5>{" "}
              {selectedItems.length ? (
                <button className="filter-item__clear" onClick={clearItems}>
                  Clear
                </button>
              ) : undefined}
            </div>

            <div className="filter-item__right">
              <CloseIcon className="filter-item__icon" />
            </div>
          </div>
        </summary>
      )}
      <div className="filter-item__options">
        {items.map(item => (
          <label className={selectedItems.includes(item) ? "selected filter-item__label" : "filter-item__label"} key={item}>
            <input type="checkbox" className="checkbox" onChange={toggleItem} value={item} checked={selectedItems.includes(item)} /> {item || "None"}
          </label>
        ))}
      </div>
    </details>
  );
};

export default SidebarFilter;
