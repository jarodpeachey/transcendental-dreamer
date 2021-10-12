// @ts-check
import * as React from "react";
import { input, currencySymbol, wrap, symbolAfter } from "./currency-field.module.css";

const CurrencyField = ({ symbol, symbolAtEnd, style, className, ...props }) => {
  return <input type="number" className="filter-item__currency" data-currency={symbol} {...props} />;
};

export default CurrencyField;
