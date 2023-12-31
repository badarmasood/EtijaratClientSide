import { Delete, Edit } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { Paragraph } from "components/Typography";
import currency from "currency.js";
import React from "react";
import {
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "./StyledComponents"; // ========================================================================

// ========================================================================
const CustomerRow = ({ customer }) => {
  const { email, name, phone, balance, orders } = customer;

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar src="/assets/images/avatars/001-man.svg" sx={{}} />
          <Paragraph>{name}</Paragraph>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        +12345678910
      </StyledTableCell>

      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {email}
      </StyledTableCell>

      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        {currency(7,250.36, {
          separator: ",",
        }).format()}
      </StyledTableCell>

      <StyledTableCell
        align="left"
        sx={{
          fontWeight: 400,
        }}
      >
        03
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton>
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <Delete />
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CustomerRow;
