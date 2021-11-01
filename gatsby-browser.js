import * as React from "react";
import { StoreProvider } from "./src/context/store-context";
import "./src/styles/global.css";

function addScript(url, id) {
  const script = document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  script.id = id;
  document.body.appendChild(script);
}

export const wrapRootElement = ({ element }) => <StoreProvider>{element}</StoreProvider>;

export const onRouteUpdate = () => {
  addScript("/js/options.js");
  addScript("/js/navigation.js");
  // closed = false;

  // document.addEventListener("mouseout", e => {
  //   if (!closed && !e.toElement && !e.relatedTarget) {
  //     document.querySelector(".popup").classList.add("open");
  //   }
  // });
  // document.querySelector(".popup-card__close").addEventListener("click", e => {
  //   document.querySelector(".popup").classList.remove("open");
  //   document.querySelector(".popup").remove();
  //   closed = true
  // });
};
