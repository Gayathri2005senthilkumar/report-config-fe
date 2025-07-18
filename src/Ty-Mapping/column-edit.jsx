// src/Ty-Mapping/column-edit.jsx

import React from "react";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import getAPIMap from "../api/ApiUrls";
import apiFunction from "../api/apiFunction";

// Reusable custom components
import FormInput from "../Components/hookForms/FormInput";
import FormCheckbox from "../Components/hookForms/FormCheckbox";
import SubmitButton from "../Components/Buttons/submitButton";

function ColumnEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
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
    <Box className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Column</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label htmlFor="label">Label</label>
          <FormInput name="label" control={control} error={errors.label?.message} />
        </div>

        <div>
          <label htmlFor="value">Value</label>
          <FormInput name="value" control={control} error={errors.value?.message} />
        </div>

        <div className="flex items-center gap-2">
          <FormCheckbox name="enable" control={control} />
          <label htmlFor="enable" className="text-gray-700">Enable</label>
        </div>

        <div className="flex gap-4 justify-end">
          <SubmitButton disabled={mutation.isPending} />
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/column-mapping/show")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Box>
  );
}

export default ColumnEdit;
