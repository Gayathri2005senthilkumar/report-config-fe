// src/Ty-Mapping/column-edit.jsx

import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import getAPIMap from "../api/ApiUrls";
import apiFunction from "../api/apiFunction";

function ColumnEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      label: "",
      value: "",
      enable: false,
    },
  });

  // Fetch existing column data
  const { isLoading, isError } = useQuery({
    queryKey: ["column", id],
    queryFn: async () => {
      const url = `${getAPIMap("columnMapping")}/${id}`;
      const response = await apiFunction({ method: "get", url });
      return response.data;
    },
    onSuccess: (data) => {
      reset(data);
    },
  });

  // Mutation to update column data
  const mutation = useMutation({
    mutationFn: (formData) => {
      const url = `${getAPIMap("columnMapping")}/${id}`;
      return apiFunction({
        method: "put",
        url,
        data: formData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["columnMapping"]);
      navigate("/column-mapping/show");
    },
  });

  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading column data.</div>;

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 8 }}>
      <h2>Edit Column</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Label"
          margin="normal"
          {...register("label")}
        />

        <TextField
          fullWidth
          label="Value"
          margin="normal"
          {...register("value")}
        />

        <FormControlLabel
          control={<Checkbox {...register("enable")} />}
          label="Enable"
        />

        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button variant="contained" type="submit">
            SAVE
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/column-mapping/show")}
          >
            CANCEL
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ColumnEdit;
