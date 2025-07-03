import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Typography,
  Box,
} from "@mui/material";

import { updateColumn } from "./column-data";

function ColumnEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  const row = location.state;

  const [formData, setFormData] = useState({
    id: row.id, // kept for internal use, but not shown
    label: row.label,
    value: row.value,
    type: row.type,
    enable: row.enable,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, enable: e.target.checked }));
  };

  const handleSave = () => {
    updateColumn(formData);
    navigate("/column-type/column-show");
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, margin: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Edit Column
      </Typography>

      {/* ID is used internally but not shown */}

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
          <Checkbox
            checked={formData.enable}
            onChange={handleCheckboxChange}
            color="primary"
          />
        }
        label="Enable"
        sx={{ mt: 2 }}
      />

      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </Box>
    </Paper>
  );
}

export default ColumnEdit;
