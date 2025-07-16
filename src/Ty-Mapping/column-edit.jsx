import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormInput from "../Components/hookForms/FormInput";
import FormSelect from "../Components/hookForms/FormSelect";
import FormCheckbox from "../Components/hookForms/FormCheckbox";
import SubmitButton from "../Components/Buttons/submitButton";

import { useMutation } from "@tanstack/react-query";
import { updateColumn } from "./column-data";

const schema = yup.object().shape({
  label: yup.string().required("Label is required"),
  value: yup.string().required("Value is required"),
  type: yup.string().required("Type is required"),
  enable: yup.boolean(),
});

const typeOptions = [
  { value: "", label: "-- Select Type --" },
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
];

function ColumnEdit() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      id: state?.id || "",
      label: state?.label || "",
      value: state?.value || "",
      type: state?.type || "",
      enable: state?.enable || false,
    },
    resolver: yupResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: updateColumn,
    onSuccess: (updatedData) => {
      alert("✅ Column updated successfully!");
      reset(updatedData); // reset form with the response
      navigate("/column-type/column-show", { state: { updated: true } });
    },
    onError: (err) => {
      console.error("❌ Update failed:", err);
      alert("❌ Failed to update column. Check console.");
    },
  });

  const onSubmit = (formData) => {
    // ✅ Pass the full formData (which includes `id`)
    mutation.mutate(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Column</h2>

      <div className="space-y-5">
        <div>
          <label htmlFor="label">Label</label>
          <FormInput name="label" control={control} error={errors.label?.message} />
        </div>

        <div>
          <label htmlFor="value">Value</label>
          <FormInput name="value" control={control} error={errors.value?.message} />
        </div>

        <div>
          <label htmlFor="type">Type</label>
          <FormSelect
            name="type"
            control={control}
            error={errors.type?.message}
            options={typeOptions}
          />
        </div>

        <div className="flex items-center gap-2">
          <FormCheckbox name="enable" control={control} />
          <label htmlFor="enable" className="text-gray-700">Enable</label>
        </div>

        <div className="text-right">
          <SubmitButton disabled={mutation.isPending} label="Update" />
        </div>
      </div>
    </form>
  );
}

export default ColumnEdit;
