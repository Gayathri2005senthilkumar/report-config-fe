import React, { useState } from "react";
import reportData from "./report-data";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";

function ReportTable({ showActions = false, onEdit, onDelete }) {
  const [data, setData] = useState(reportData);

  const handleToggle = (index) => {
    const updated = [...data];
    updated[index].enabled = !updated[index].enabled;
    setData(updated);
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell align="center"><strong>Enable</strong></TableCell>
            {showActions && (
              <TableCell align="center"><strong>Actions</strong></TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={row.enabled}
                  onChange={() => handleToggle(index)}
                  color="primary"
                />
              </TableCell>
              {showActions && (
                <TableCell align="center" className="space-x-2">
                  <button
                    onClick={() => onEdit?.(row.id)}
                    className="px-3 py-1 text-sm font-semibold border border-violet-500 bg-white text-violet-700 rounded hover:bg-violet-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete?.(row.id)}
                    className="px-3 py-1 text-sm font-semibold border border-violet-500 bg-white text-violet-700 rounded hover:bg-violet-100"
                  >
                    Delete
                  </button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ReportTable;
