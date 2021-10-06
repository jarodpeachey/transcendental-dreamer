import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, transparent }) => {
  console.log(transparent);
  return (
    <>
      <Header transparent={transparent} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
