import { Delete, Edit } from "@mui/icons-material";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import Scrollbar from "components/Scrollbar";
import SearchInput from "components/SearchInput";
import useMuiTable from "hooks/useMuiTable";
import {
  StatusWrapper,
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "pages-sections/admin";
import React from "react";
import Chat from "../../src/pages-sections/chat"
const tableHeading = [
  {
    id: "information",
    label: "Information",
    align: "left",
  },
  {
    id: "type",
    label: "Type",
    align: "left",
  },
  {
    id: "date",
    label: "Ticket Date",
    align: "left",
  },
  {
    id: "problem",
    label: "Problem Title",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
]; // =============================================================================

SupportTickets.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

export default function SupportTickets() {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData,
    defaultSort: "date",
  });
  return (
    <>
      <Box py={4}>
        <SearchInput
          placeholder="Search Chat"
          sx={{
            mb: 4,
          }}
        />

        <Chat />
      </Box>
    </>
  );
} // list data

const listData = [
  {
    information: "Product Broken. I need refund",
    type: "Urgent",
    date: "13 April, 2022",
    problem: "Website Problem",
  },
  {
    information: "When will my product arrive?",
    type: "Normal",
    date: "15 April, 2022",
    problem: "UX Problem",
  },
  {
    information: "Payment method is not working",
    type: "Urgent",
    date: "17 April, 2022",
    problem: "Payment Problem",
  },
  {
    information: "Do you accept prepaid card?",
    type: "Normal",
    date: "13 April, 2022",
    problem: "Website Problem",
  },
  {
    information: "How much do I have to pay for...",
    type: "Normal",
    date: "10 April, 2022",
    problem: "UX Problem",
  },
  {
    information: "Do you ship to Bangladesh?",
    type: "Urgent",
    date: "16 April, 2022",
    problem: "Payment Problem",
  },
  {
    information: "Where's My Stuff?",
    type: "Urgent",
    date: "13 April, 2022",
    problem: "Website Problem",
  },
  {
    information: "When will my product arrive?",
    type: "Normal",
    date: "19 April, 2022",
    problem: "UX Problem",
  },
  {
    information: "Payment method is not working",
    type: "Urgent",
    date: "23 April, 2022",
    problem: "Payment Problem",
  },
];
