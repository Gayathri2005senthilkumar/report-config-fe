import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormInput from "../Components/hookForms/FormInput";
import FormCheckbox from "../Components/hookForms/FormCheckbox";
import SubmitButton from "../Components/Buttons/submitButton";
import OutlineButton from "@/Components/Buttons/OutlineButton";

import {
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";

import { useQuery } from "@tanstack/react-query";
import useQueryGetpi from "@/api/useQueryGetApi";
import useMutationCustom from "@/api/useMutationCustom";
import getAPIMap from "@/api/ApiUrls";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  name: yup.string().required("Name is required"),
  normalized_name: yup.string().required("Normalized Name is required"),
  enable: yup.boolean(),
  responseFields: yup.array().min(0),
});

function ConfigCreate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [columnOptions, setColumnOptions] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      name: "",
      normalized_name: "",
      enable: false,
      responseFields: [],
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  const addMutation = useMutationCustom({
    onSuccess: () => {
      alert("Config saved successfully!");
      navigate("/config-type/config-show");
    },
    onError: (err) => {
      console.error("❌ Error:", err);
      alert("❌ Failed to save config");
    },
  });

  /** Fetch config data for edit */
  const queryString = useMemo(() => "/" + id, [id]);
  const { data } = useQuery({
    queryKey: ["config", queryString],
    queryFn: useQueryGetpi,
    enabled: id !== "create",
    refetchOnWindowFocus: false,
  });

  /** Fetch columnMapping data */
  const { data: columnData } = useQuery({
    queryKey: ["columnMapping"],
    queryFn: () => useQueryGetpi({ queryKey: ["columnMapping", ""] }),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (columnData?.data?.results) {
      setColumnOptions(columnData.data.results);
    }
  }, [columnData]);

  /** Preselect saved values in Edit mode */
  useEffect(() => {
    if (id !== "create" && data?.data) {
      const clone = { ...(data?.data || {}) };

      // Convert responseFields from objects [{id:62}] to array of IDs [62]
      if (Array.isArray(clone.responseFields)) {
        clone.responseFields = clone.responseFields.map((item) =>
          typeof item === "object" ? item.id : item
        );
      } else {
        clone.responseFields = [];
      }

      delete clone.updatedAt;
      delete clone.createdAt;

      reset(clone);
    }
  }, [data, id, reset]);

  /** Submit handler */
  const onSubmit = (formData) => {
    const updatedData = {
      ...formData,
      // Convert IDs back to array of objects for API
      responseFields: formData.responseFields.map((id) => ({ id })),
    };

    console.log("📤 Final Payload:", updatedData);

    if (id === "create") {
      addMutation.mutate({
        url: "config",
        method: "post",
        data: updatedData,
      });
    } else {
      addMutation.mutate({
        url: `${getAPIMap("config")}/${formData.id}`,
        method: "put",
        data: updatedData,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {id === "create" ? "Create New Column" : "Edit Column"}
      </h2>

      <div className="space-y-5">
        {/* Title */}
        <div>
          <label htmlFor="title">Title</label>
          <FormInput name="title" control={control} error={errors.title?.message} />
        </div>

        {/* Name */}
        <div>
          <label htmlFor="name">Name</label>
          <FormInput name="name" control={control} error={errors.name?.message} />
        </div>

        {/* Normalized Name */}
        <div>
          <label htmlFor="normalized_name">Normalized Name</label>
          <FormInput
            name="normalized_name"
            control={control}
            error={errors.normalized_name?.message}
          />
        </div>

        {/* ResponseFields Dropdown (only in Edit mode) */}
        {id !== "create" && (
          <div>
            <InputLabel>Response Fields</InputLabel>
            <Controller
              name="responseFields"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <Select
                    {...field}
                    multiple
                    displayEmpty
                    renderValue={(selected) => {
                      const labels = selected
                        .map((id) => {
                          const opt = columnOptions.find((o) => o.id === id);
                          return opt?.label || id;
                        })
                        .filter(Boolean);
                      return labels.length ? labels.join(", ") : "Select Fields";
                    }}
                  >
                    {columnOptions.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        <Checkbox checked={field.value.includes(option.id)} />
                        <ListItemText primary={option.label} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            {errors.responseFields && (
              <p className="text-red-500 text-sm">{errors.responseFields.message}</p>
            )}
          </div>
        )}

        {/* Enable */}
        <div className="flex items-center gap-2">
          <FormCheckbox name="enable" control={control} />
          <label htmlFor="enable" className="text-gray-700">
            Enable
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <OutlineButton
            text="Cancel"
            style={{ minWidth: "100px" }}
            onClick={() => navigate("/config-type/config-show")}
          />
          <SubmitButton
            disabled={addMutation.isPending || !isDirty || !isValid}
            style={{ minWidth: "100px" }}
          />
        </div>
      </div>
    </form>
  );
}

export default ConfigCreate;
