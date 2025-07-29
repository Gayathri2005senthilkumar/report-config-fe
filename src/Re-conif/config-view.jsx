// src/Config/config-view.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Box,
} from "@mui/material";

function ConfigView() {
  const location = useLocation();
  const navigate = useNavigate();
  const row = location.state;

  if (!row) {
    return <div className="p-6 text-center text-gray-500">No data available</div>;
  }

  return (
    <div className="p-6">
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>

      <Card
        sx={{
          maxWidth: 500,
          margin: "auto",
          padding: 2,
          boxShadow: 4,
          borderRadius: 3,
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            Config Details
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Box mb={1}>
            <Typography variant="body1"><strong>ID:</strong> {row.id}</Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="body1"><strong>Title:</strong> {row.title}</Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="body1"><strong>Name:</strong> {row.name}</Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="body1"><strong>Normalized Name:</strong> {row.normalized_name}</Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="body1"><strong>Enabled:</strong> {row.enable ? "Yes" : "No"}</Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
}

export default ConfigView;
