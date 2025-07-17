import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchColumn, updateColumn } from "./column-data";
import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
} from "@mui/material";

function ColumnEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, setValue, watch } = useForm();

  // ✅ Fetch column data
  const { data, isLoading } = useQuery({
    queryKey: ["getColumn", id],
    queryFn: () => fetchColumn(id),
    enabled: !!id,
  });

  // ✅ Prefill data when loaded
  useEffect(() => {
    if (data) {
      reset({
        label: data.label,
        value: data.value,
        enable: data.enable,
      });
    }
  }, [data, reset]);

  const mutation = useMutation({
    mutationFn: updateColumn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getColumns"] });
      navigate("/column-show");
    },
  });

  const onSubmit = (formData) => {
    mutation.mutate({
      id,
      label: formData.label,
      value: formData.value,
      enable: formData.enable,
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <Paper elevation={3} sx={{ maxWidth: 500, mx: "auto", p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Edit Column
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Label"
          {...register("label")}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Value"
          {...register("value")}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              {...register("enable")}
              checked={watch("enable") || false}
              onChange={(e) => setValue("enable", e.target.checked)}
            />
          }
          label="Enable"
        />
        <Box mt={2} display="flex" gap={2}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button variant="outlined" onClick={() => navigate("/column-show")}>
            Cancel
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default ColumnEdit;
