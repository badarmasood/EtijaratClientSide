import { Box, Grid } from "@mui/material";
import ProductCard1 from "components/product-cards/ProductCard1";
import { H3 } from "components/Typography";
import React from "react"; // ===================================================

// ===================================================
const RelatedProducts = ({ productsData }) => {
  console.log("Related prod", productsData);

  productsData.forEach((item, ind) => {
    // console.log("item", item._id.$oid);
    if (item._id.$oid) {
      item._id = item._id.$oid;
    }
  });

  return (
    <Box mb={7.5}>
      <H3 mb={3}>Related Products</H3>
      <Grid container spacing={8}>
        {productsData.map((item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
            <ProductCard1 {...item} hoverEffect />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedProducts;
