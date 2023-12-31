import { KeyboardArrowDown, PersonOutline } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import LogoutIcon from "@mui/icons-material/Logout";
import { Badge, Box, Dialog, Drawer, styled } from "@mui/material";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import clsx from "clsx";
import BazaarButton from "components/BazaarButton";
import Image from "components/BazaarImage";
import CategoryMenu from "components/categories/CategoryMenu";
import { FlexBox } from "components/flex-box";
import Category from "components/icons/Category";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import MiniCart from "components/mini-cart/MiniCart";
import MobileMenu from "components/navbar/MobileMenu";
import GrocerySearchBox from "components/search-box/GrocerySearchBox";
import { useAppContext } from "contexts/AppContext";
import Link from "next/link";
import Login from "pages-sections/sessions/Login";
import { useState } from "react";
import { layoutConstant } from "utils/constants";
import SearchBox from "../search-box/SearchBox"; // styled component
import { useEffect } from "react";
import { useRouter } from "next/router";
import { H5 } from "components/Typography";

export const HeaderWrapper = styled(Box)(({ theme }) => ({
  zIndex: 3,
  position: "relative",
  height: layoutConstant.headerHeight,
  transition: "height 250ms ease-in-out",
  background: theme.palette.background.paper,
  [theme.breakpoints.down("sm")]: {
    height: layoutConstant.mobileHeaderHeight,
  },
})); // ==============================================================

// ==============================================================
const Header = ({ isFixed, className, searchBoxType = "type1" }, props) => {
  // console.log("props", props.session_id);
  const theme = useTheme();
  const { state } = useAppContext();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const downMd = useMediaQuery(theme.breakpoints.down(1150));

  const toggleDialog = () => setDialogOpen(!dialogOpen);

  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);

  const router = useRouter();

  // if (typeof window !== 'undefined') {
  //   console.log(session_id)
  //    session_id = localStorage.getItem('sessionId')
  // }

  // const session_Id = async () => {
  //   return await localStorage.getItem("sessionID").then(id => console.log(id));
  // };
  // var session_id = session_Id();
  // console.log("sessionID",session_id)

  return (
    <>
      <HeaderWrapper className={clsx(className)}>
        <Container
          sx={{
            gap: 2,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FlexBox
            mr={2}
            minWidth="170px"
            alignItems="center"
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <a href="/">
              <h2>E TIJARAT</h2>
            </a>

            {isFixed && (
              <CategoryMenu>
                <FlexBox color="grey.600" alignItems="center" ml={2}>
                  <BazaarButton color="inherit">
                    <Category fontSize="small" color="inherit" />
                    <KeyboardArrowDown fontSize="small" color="inherit" />
                  </BazaarButton>
                </FlexBox>
              </CategoryMenu>
            )}
          </FlexBox>
          <FlexBox justifyContent="center" flex="1 1 0">
            {searchBoxType === "type1" && <SearchBox />}
            {searchBoxType === "type2" && <GrocerySearchBox />}
          </FlexBox>
          <FlexBox
            alignItems="center"
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            {typeof window !== "undefined" &&
              !window.localStorage.getItem("sessionId") && (
                <Box
                  component={IconButton}
                  p={1.25}
                  bgcolor="grey.200"
                  onClick={toggleDialog}
                >
                  <PersonOutline />
                </Box>
              )}

            {typeof window !== "undefined" &&
              window.localStorage.getItem("sessionId") && (
                <Box component={IconButton} p={1.25} bgcolor="grey.200">
                  <LogoutIcon
                    onClick={() => {
                      localStorage.clear();
                      router.push("/");
                      location.reload();
                    }}
                  />
                </Box>
              )}

            <Badge badgeContent={state.cart.length} color="primary">
              <Box
                ml={2.5}
                p={1.25}
                bgcolor="grey.200"
                component={IconButton}
                onClick={toggleSidenav}
              >
                <ShoppingBagOutlined />
              </Box>
            </Badge>
          </FlexBox>
          <Dialog
            open={dialogOpen}
            fullWidth={isMobile}
            scroll="body"
            onClose={toggleDialog}
          >
            <Login />
          </Dialog>
          <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav}>
            <MiniCart />
          </Drawer>
          {downMd && <MobileMenu />}
        </Container>
      </HeaderWrapper>
    </>
  );
};

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const session_id = localStorage.getItem("sessionId");

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      session_id,
    },
  };
}
export default Header;
