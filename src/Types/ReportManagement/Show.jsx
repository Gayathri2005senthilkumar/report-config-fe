import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import reportData from "../../Table/report-data";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TextField,
} from "@mui/material";

function Show() {
  const navigate = useNavigate();
  const [data, setData] = useState([...reportData]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id) => {
    const updated = data.filter((r) => r.id !== id);
    setData(updated);
    const index = reportData.findIndex((r) => r.id === id);
    if (index !== -1) reportData.splice(index, 1);
  };

  const handleToggle = (index) => {
    const updated = [...data];
    updated[index].enabled = !updated[index].enabled;
    setData(updated);
  };

  const handleEdit = (id) => {
    navigate(`/report-types/edit/${id}`);
  };

  // ✅ Filter logic
  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.id.toString().includes(searchQuery)
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Report Types / Show</h2>

      {/* ✅ Search + Create Button Row */}
      <div className="flex justify-between items-center mb-4">
        <TextField
          label="Search by ID or Name"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 300 }}
        />

        <button
          className="border border-violet-500 bg-white text-violet-700 font-bold px-6 py-3 rounded hover:bg-violet-100"
          onClick={() => navigate("/report-types/create-new")}
        >
          Create New
        </button>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f0f0f0" }}>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell align="center"><strong>Enable</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center" className="text-gray-500 py-6">
                  No matching records found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, index) => (
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
                  <TableCell align="center">
                    <button
                      onClick={() => handleEdit(row.id)}
                      className="px-3 py-1 text-sm font-semibold border border-violet-500 bg-white text-violet-700 rounded hover:bg-violet-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="px-3 py-1 text-sm font-semibold border border-red-500 bg-white text-red-600 rounded hover:bg-red-100 ml-2"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Show;
