import { Container, styled } from "@mui/material";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import BazaarButton from "components/BazaarButton";
import React, { useCallback, useState } from "react";
import BazaarCard from "components/BazaarCard";
import { Button, Card, Grid, MenuItem, TextField } from "@mui/material";
import BazaarTextField from "components/BazaarTextField";

import { useFormik } from "formik";
import { BASE_URL, VENDOR } from "../../../src/apiRoutes";
import axios from "axios";

const Wrapper = styled(BazaarCard)(() => ({
  margin: "auto",
  padding: "3rem",
  maxWidth: "630px",
  textAlign: "center",
}));
const StyledButton = styled(BazaarButton)(() => ({
  marginTop: "2rem",
  padding: "11px 24px",
}));

const CreateCoupen = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values) => {
    console.log(values);
    const res = await axios
      .post(`${BASE_URL + VENDOR}/coupon`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("sessionId"),
        },
      })
      .then(
        (response) => {
          response;
          console.log("response", response);
        },
        (error) => {
          console.log(error);
        }
      );
    return res;
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
    });
  return (
    <Wrapper style={{ marginTop: 50 }}>
      <form onSubmit={handleSubmit}>
        <BazaarTextField
          mb={1.5}
          fullWidth
          name="productId"
          size="small"
          type="text"
          variant="outlined"
          onBlur={handleBlur}
          value={values.productId}
          onChange={handleChange}
          label="Product ID"
          placeholder="Valid product id"
          error={!!touched.productId && !!errors.productId}
          helperText={touched.productId && errors.productId}
        />
        <BazaarTextField
          mb={1.5}
          fullWidth
          name="code"
          size="small"
          type="text"
          variant="outlined"
          onBlur={handleBlur}
          value={values.code}
          onChange={handleChange}
          label="Coupon Code"
          placeholder="Enter coupon code"
          error={!!touched.code && !!errors.code}
          helperText={touched.code && errors.code}
        />
        {/* <Grid item sm={6} xs={12}>
          <TextField
            select
            fullWidth
            color="info"
            size="medium"
            name="coupontype"
            onBlur={handleBlur}
            placeholder="coupon"
            onChange={handleChange}
            value={values.coupontype}
            label="Select Coupon type"
            error={!!touched.coupontype && !!errors.coupontype}
            helperText={touched.coupontype && errors.coupontype}
          >
            <MenuItem value="percent">Percentage</MenuItem>
            <MenuItem value="price">Price</MenuItem>
          </TextField>
        </Grid> */}

        <Grid item sm={6} xs={12}>
          <BazaarTextField
            mb={1.5}
            fullWidth
            name="discount"
            size="small"
            type="text"
            variant="outlined"
            onBlur={handleBlur}
            value={values.discount}
            onChange={handleChange}
            label="Discount"
            placeholder="Ex. 5%"
            error={!!touched.discount && !!errors.discount}
            helperText={touched.discount && errors.discount}
          />
        </Grid>

        <BazaarButton
          fullWidth
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            mb: "1.65rem",
            height: 44,
          }}
        >
          Create Coupon
        </BazaarButton>
      </form>
    </Wrapper>
  );
};

CreateCoupen.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};

const initialValues = {
  productId: "",
  code: "",
  discount: "",
};

export default CreateCoupen;
