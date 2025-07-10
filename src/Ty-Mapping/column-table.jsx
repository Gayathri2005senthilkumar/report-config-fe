import React from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Checkbox, Button,
} from "@mui/material";

function ColumnTable({ rows, onEdit, onDelete }) {
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
                  disabled
                  color="primary"
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => onEdit(row)}
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ColumnTable;
