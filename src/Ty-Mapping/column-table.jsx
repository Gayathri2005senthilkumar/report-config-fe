// src/Ty-Mapping/column-table.jsx

import React from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Checkbox, Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function ColumnTable({ rows }) {
  const navigate = useNavigate();

  const handleToggle = (row) => {
    row.enable = !row.enable;
  };

  const handleDelete = (id) => {
    const index = rows.findIndex((item) => item.id === id);
    if (index !== -1) {
      rows.splice(index, 1);
    }
  };

  const handleEdit = (row) => {
    //  Navigate with ID in URL to match your route
    navigate(`/column-type/column-edit/${row.id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Label</strong></TableCell>
            <TableCell><strong>Value</strong></TableCell>
            <TableCell><strong>Type</strong></TableCell>
            <TableCell><strong>Enable</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.label}</TableCell>
              <TableCell>{row.value}</TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>
                <Checkbox
                  checked={row.enable}
                  onChange={() => handleToggle(row)}
                  color="primary"
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEdit(row)} // updated here
                  size="small"
                  sx={{ marginRight: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(row.id)}
                  size="small"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ColumnTable;
