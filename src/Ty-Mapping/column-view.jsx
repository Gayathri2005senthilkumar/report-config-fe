// src/Column/column-view.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  Stack,
  Chip,
} from "@mui/material";

function ColumnView() {
  const location = useLocation();
  const navigate = useNavigate();
  const row = location.state;

  if (!row) {
    return <div>No data available</div>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Card
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          borderRadius: 4,
          boxShadow: 6,
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Column Details
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Stack spacing={2}>
            <Box display="flex" alignItems="center">
              <Typography component="span"><strong>ID:</strong> {row.id}</Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Typography component="span"><strong>Label:</strong> {row.label}</Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Typography component="span"><strong>Value:</strong> {row.value}</Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Typography component="span"><strong>Type:</strong> {row.type}</Typography>
            </Box>

            <Box display="flex" alignItems="center">
              <Typography component="span"><strong>Enabled:</strong></Typography>
              <Chip
                label={row.enable ? "Yes" : "No"}
                color={row.enable ? "success" : "error"}
                size="small"
                variant="outlined"
                sx={{ ml: 1 }}
              />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ColumnView;
