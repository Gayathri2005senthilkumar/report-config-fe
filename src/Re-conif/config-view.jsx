// src/Config/config-view.jsx
import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import useQueryGetpi from "@/api/useQueryGetApi";

function ConfigView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

   const { data } = useQuery({
      queryKey: ["config", `/${id}`],
      queryFn: useQueryGetpi,
      refetchOnWindowFocus: false,
    });

    /** Fetch columnMapping data */
  const { data: columnData } = useQuery({
    queryKey: ["columnMapping"],
    queryFn: () => useQueryGetpi({ queryKey: ["columnMapping", ""] }),
    refetchOnWindowFocus: false,
  });

  const responsefields =useMemo(()=>{
    if(data?.data) {
      const idArr = data?.data.ResponseFields.map((item)=>item.column_mapping)
      const filterData = columnData?.data?.results?.filter((item)=>idArr.includes(item.id)).map((item)=>item.label);
      const responsefields =filterData?.join(', ');
      return responsefields;
    }
  },[columnData, data])


  if (!data?.data) {
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
            <Typography variant="body1"><strong>ID:</strong> {data?.data.id}</Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="body1"><strong>Title:</strong> {data?.data.title}</Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="body1"><strong>Name:</strong> {data?.data.name}</Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="body1"><strong>Normalized Name:</strong> {data?.data.normalized_name}</Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="body1"><strong>Enabled:</strong> {data?.data.enable ? "Yes" : "No"}</Typography>
          </Box>

           {responsefields && <Box mb={1}>
            <Typography variant="body1"><strong>Response Fields:</strong> {responsefields}</Typography>
          </Box>}
        </CardContent>
      </Card>
    </div>
  );
}

export default ConfigView;
