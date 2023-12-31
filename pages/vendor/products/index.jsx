import {
  Box,
  Card,
  CircularProgress,
  Stack,
  Table,
  TableContainer,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import Scrollbar from "components/Scrollbar";
import { H3 } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import { ProductRow } from "pages-sections/admin";
import React from "react";
import api from "utils/api/dashboard";

import { useRouter } from "next/router";
import { BASE_URL, VENDOR } from "../../../src/apiRoutes";
import { useState, useEffect } from "react";
import axios from "axios";
const tableHeading = [
  {
    id: "title",
    label: "title",
    align: "left",
  },
  {
    id: "category",
    label: "Category",
    align: "left",
  },
  // {
  //   id: "brand",
  //   label: "Brand",
  //   align: "left",
  // },
  {
    id: "price",
    label: "Price",
    align: "left",
  },
  {
    id: "stock",
    label: "stock",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
]; // =============================================================================

ProductList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function ProductList() {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    data == null ? getProducts() : null;
  }, []);

  var getProducts = async () => {
    const response = await axios.get(
      `${BASE_URL + VENDOR}/products`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("sessionId"),
        },
      }
    );
    console.log("response", response.data);
    setdata(response.data);
    setloading(false);
  };
  const router = useRouter();
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: data?.products,
  });
  return (
    <Box py={4}>
      <H3 mb={2}>Product List</H3>

      <SearchArea
        handleSearch={() => {}}
        handleBtnClick={() => {
          router.push("/vendor/products/create");
        }}
        searchPlaceholder="Search Product..."
      />

      <Card>
        <Scrollbar>
          {loading ? (
            <CircularProgress />
          ) : (
            <TableContainer
              sx={{
                minWidth: 900,
              }}
            >
              <Table>
                <TableHeader
                  order={order}
                  hideSelectBtn
                  orderBy={orderBy}
                  heading={tableHeading}
                  // rowCount={products.length}
                  rowCount={data.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {data.map((product, index) => (
                    <ProductRow product={product} getProducts={getProducts} key={index} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(data?.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}
export const getStaticProps = async () => {
  const products = await api.products();
  return {
    props: {
      products,
    },
  };
};
