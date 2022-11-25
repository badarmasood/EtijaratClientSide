import { Card } from "@mui/material";
import { styled } from "@mui/material/styles";
import { keys } from "@mui/system";
import BazaarButton from "components/BazaarButton";
import BazaarTextField from "components/BazaarTextField";
import { H3, Small } from "components/Typography";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import * as yup from "yup";
import EyeToggleButton from "./EyeToggleButton";
import SocialButtons from "./SocialButtons";
import axios from "axios";
import { BASE_URL, VENDOR } from "../../../src/apiRoutes";
import Router , {useRouter}  from 'next/router';


const fbStyle = {
  background: "#3B5998",
  color: "white",
};
const googleStyle = {
  background: "#4285F4",
  color: "white",
};
export const Wrapper = styled(({ children, passwordVisibility, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme, passwordVisibility }) => ({
  width: 500,
  padding: "2rem 3rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".passwordEye": {
    color: passwordVisibility
      ? theme.palette.grey[600]
      : theme.palette.grey[400],
  },
  ".facebookButton": {
    marginBottom: 10,
    ...fbStyle,
    "&:hover": fbStyle,
  },
  ".googleButton": { ...googleStyle, "&:hover": googleStyle },
  ".agreement": {
    marginTop: 12,
    marginBottom: 24,
  },
}));
const VendorLogin = () => {
  const router = useRouter()
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  

  const handleFormSubmit = async (values) => {
    const res = await axios
      .post(`${BASE_URL + VENDOR}/login`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(
        (response) => {
          console.log("response",response)
          const session_id = response.data.token;
          !session_id.nil ? localStorage.setItem("sessionId", session_id) : nil
          const vendorId= response.data.vendorId
          !vendorId.nil ? localStorage.setItem("vendorId", vendorId) : nil
          router.push('/vendor/dashboard')
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      onSubmit: handleFormSubmit,
      validationSchema: formSchema,
    });
  return (
    <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form onSubmit={handleSubmit}>
        <H3 textAlign="center" mb={1}>
          Welcome To Ecommerce
        </H3>
        <Small
          mb={4.5}
          display="block"
          fontSize="12px"
          fontWeight="600"
          color="grey.800"
          textAlign="center"
        >
          Log in with email & password
        </Small>

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="email"
          size="small"
          type="email"
          variant="outlined"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          label="Email or Phone Number"
          placeholder="exmple@mail.com"
          error={!!touched.email && !!errors.email}
          helperText={touched.email && errors.email}
        />

        <BazaarTextField
          mb={2}
          fullWidth
          size="small"
          name="password"
          label="Password"
          autoComplete="on"
          variant="outlined"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          placeholder="*********"
          type={passwordVisibility ? "text" : "password"}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
          InputProps={{
            endAdornment: (
              <EyeToggleButton
                show={passwordVisibility}
                click={togglePasswordVisibility}
              />
            ),
          }}
        />

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
          Login
        </BazaarButton>
      </form>

      <SocialButtons redirect="/signup" redirectText="Sign Up" />
    </Wrapper>
  );
};

const initialValues = {
  email: "",
  password: "",
};
const formSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  email: yup.string().email("invalid email").required("Email is required"),
});
export default VendorLogin;
