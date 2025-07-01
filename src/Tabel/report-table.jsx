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
  Checkbox
} from "@mui/material";

function ReportTable() {
  const [data, setData] = useState(reportData);

  const handleToggle = (index) => {
    const updatedData = [...data];
    updatedData[index].enabled = !updatedData[index].enabled;
    setData(updatedData);
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto", marginTop: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell align="center"><strong>Enable</strong></TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ReportTable;
