// src/Ty-Mapping/column-create.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormInput from "../Components/hookForms/FormInput";
import FormSelect from "../Components/hookForms/FormSelect";
import FormCheckbox from "../Components/hookForms/FormCheckbox";
import SubmitButton from "../Components/Buttons/submitButton";

import useMutationCustom from "../api/useMutationCustom";

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

function ColumnCreate() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      label: "",
      value: "",
      type: "",
      enable: false,
    },
    resolver: yupResolver(schema),
  });

  const { mutateAsync, isPending } = useMutationCustom({
    onSuccess: () => {
      alert("✅ Column created successfully!");
      navigate("/column-type/column-show");
    },
    onError: (err) => {
      if (
        err?.response?.data?.message?.includes("SequelizeUniqueConstraintError")
      ) {
        alert("❌ This label or value already exists. Please enter a unique one.");
      } else if (err?.response?.data?.message) {
        alert("❌ Error: " + err.response.data.message);
      } else {
        alert("❌ Failed to create column. Check console for details.");
      }
      console.error("❌ Column creation failed:", err);
    },
  });

const onSubmit = async (formData) => {
  try {
    const response = await mutateAsync({
      url: "columnMapping",
      method: "post",
      data: {
        label: formData.label,
        value: formData.value,
        type: formData.type,
        enable: formData.enable,
      },
    });

    console.log("✅ Column Created:", response.data);
    alert("✅ Column created successfully!");
    navigate("/column-type/column-show");

  } catch (err) {
    console.error("❌ Error from API:", err);

    if (err?.response?.data?.message?.includes("SequelizeUniqueConstraintError")) {
      alert("❌ This label or value already exists.");
    } else if (err?.response?.data?.message) {
      alert("❌ Error: " + err.response.data.message);
    } else {
      alert("❌ Failed to create column. Check console for details.");
    }
  }
};



  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Column
      </h2>

      <div className="space-y-5">
        <div>
          <label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-1">Label</label>
          <FormInput
            name="label"
            control={control}
            error={errors.label?.message}
            placeholder="Enter label name"
          />
        </div>

        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">Value</label>
          <FormInput
            name="value"
            control={control}
            error={errors.value?.message}
            placeholder="Enter column value"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
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
          <SubmitButton disabled={isPending} />
        </div>
      </div>
    </form>
  );
}

export default ColumnCreate;
