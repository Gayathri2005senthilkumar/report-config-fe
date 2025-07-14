import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function ColumnTable({ rows = [], onDelete }) {
  const navigate = useNavigate();

  const handleToggle = (row) => {
    row.enable = !row.enable;
  };

  const handleEdit = (row) => {
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
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
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
                    onClick={() => handleEdit(row)}
                    size="small"
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onDelete(row.id)}
                    size="small"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                No data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ColumnTable;
