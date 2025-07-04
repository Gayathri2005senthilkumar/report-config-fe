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

function ConfigTable({ data, onDelete }) {
  const navigate = useNavigate();

  const handleToggle = (index) => {
    const updated = [...data];
    updated[index].enable = !updated[index].enable;
    // Note: Update logic can be added here
  };

  const handleEdit = (id) => {
    navigate(`/config-type/config-edit/${id}`); // ✅ Correct route
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#f3f4f6" }}>
          <TableRow>
            <TableCell><strong>Title</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Normalized Name</strong></TableCell>
            <TableCell align="center"><strong>Enable</strong></TableCell>
            <TableCell align="center"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.normalizedName}</TableCell>

              <TableCell align="center">
                <Checkbox
                  checked={row.enable}
                  onChange={() => handleToggle(index)}
                  color="primary"
                />
              </TableCell>

              <TableCell align="center">
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => handleEdit(row.id)} // ✅ Pass row.id
                  sx={{ mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => onDelete?.(row.id)}
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

export default ConfigTable;
