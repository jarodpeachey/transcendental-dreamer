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
  addScript('/js/options.js')
}

// export const onRouteUpdate = ({ location, prevLocation }) => {
//   console.log("new pathname", location.pathname);
//   console.log("old pathname", prevLocation ? prevLocation.pathname : null);

//   if (location.pathname.includes("product")) {
//     addScript("/js/options.js", "options-script");
//   } else {
//     document.getElementById("options-script") && document.getElementById("options-script").remove();
//   }
// };
