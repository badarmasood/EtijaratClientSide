import { Box } from "@mui/material";
import Header from "components/header/Header";
import Navbar from "components/navbar/Navbar";
import Sticky from "components/sticky/Sticky";
import React, { Fragment, useCallback, useState } from "react";
/**
 *  Used in:
 *  1. grocery1, grocery2, healthbeauty-shop
 *  2. checkout-alternative
 */
// =======================================================

// =======================================================
const ShopLayout2 = ({ children, showTopbar = true, showNavbar = true }) => {
  // app states
  const [isFixed, setIsFixed] = useState(false);
  const toggleIsFixed = useCallback((fixed) => setIsFixed(fixed), []);
  return (
    <Fragment>
    
      {/* HEADER */}
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={70}>
        <Header isFixed={isFixed} searchBoxType="type2" />
      </Sticky>

      <Box zIndex={1} position="relative" className="section-after-sticky">
        {/* NAVIGATION BAR */}
        {showNavbar && <Navbar elevation={0} />}

        {/* BODY CONTENT */}
        {children}
      </Box>
    </Fragment>
  );
};

export default ShopLayout2;
