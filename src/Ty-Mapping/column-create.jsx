import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Checkbox, FormControlLabel, Button, Paper } from "@mui/material";
import { addColumn, getColumns } from "./column-data";

function ColumnCreate() {
  const navigate = useNavigate();

  // Auto-generate ID (based on existing count)
  const newId = (getColumns().length + 1).toString();

  const [formData, setFormData] = useState({
    id: newId, // kept internally, not shown
    label: "",
    value: "",
    type: "",
    enable: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e) => {
    setFormData(prev => ({ ...prev, enable: e.target.checked }));
  };

  const handleSave = () => {
    addColumn(formData); // Add to shared data
    navigate("/column-type/column-show"); // Redirect to table page
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 5 }}>
      <h2 className="text-xl font-bold mb-4">Create New Column</h2>

      {/* ID is hidden from UI */}

      <TextField
        label="Label"
        name="label"
        value={formData.label}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Value"
        name="value"
        value={formData.value}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <FormControlLabel
        control={
          <Checkbox checked={formData.enable} onChange={handleCheckbox} />
        }
        label="Enable"
        sx={{ mt: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ mt: 3 }}
      >
        Save
      </Button>
    </Paper>
  );
}

export default ColumnCreate;
