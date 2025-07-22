// src/components/SearchBar.jsx
import React from "react";
import { TextField } from "@mui/material";

function SearchBar({ value, onChange, placeholder = "Search...", width = 300 }) {
  return (
    <div style={{ maxWidth: width }}>
      <TextField
        label={placeholder}
        variant="outlined"
        size="small"
        fullWidth
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
