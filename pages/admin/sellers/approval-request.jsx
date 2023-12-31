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
import { SellerRow } from "pages-sections/admin";
import React from "react";
import api from "utils/api/dashboard"; // table column list

import { ADMIN, BASE_URL, RECOMMENDED_PRODUCTS } from "../../../src/apiRoutes";
import { useState, useEffect } from "react";
import axios from "axios";

const tableHeading = [
  {
    id: "name",
    label: "Seller Name",
    align: "left",
  },
  // {
  //   id: "shopName",
  //   label: "Shop Name",
  //   align: "left",
  // },
  {
    id: "email",
    label: "email",
    align: "left",
  },

  {
    id: "address",
    label: "address",
    align: "left",
  },
  {
    id: "Verification Address",
    label: "Verification Address",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
]; // =============================================================================

SellerList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function SellerList({ sellers }) {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    data == null ? getVendors() : null;
  }, []);

  var getVendors = async () => {
    const response = await axios.get(
      `${BASE_URL + ADMIN}/vendors/approval-requests`,

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response", response.data);
    setdata(response.data);
    setloading(false);
  };

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: sellers,
  });
  return (
    <Box py={4}>
      <H3 mb={2}>Vendors</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Add New Seller"
        handleBtnClick={() => {}}
        searchPlaceholder="Search vendor..."
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Card>
          <Scrollbar>
            <TableContainer
              sx={{
                minWidth: 1100,
              }}
            >
              <Table>
                <TableHeader
                  order={order}
                  hideSelectBtn
                  orderBy={orderBy}
                  heading={tableHeading}
                  rowCount={sellers.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />

                <TableBody>
                  {data.map((seller, index) => (
                    <SellerRow seller={seller} key={index} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Stack alignItems="center" my={4}>
            <TablePagination
              onChange={handleChangePage}
              count={Math.ceil(sellers.length / rowsPerPage)}
            />
          </Stack>
        </Card>
      )}
    </Box>
  );
}
export const getStaticProps = async () => {
  const sellers = await api.sellers();
  return {
    props: {
      sellers,
    },
  };
};
