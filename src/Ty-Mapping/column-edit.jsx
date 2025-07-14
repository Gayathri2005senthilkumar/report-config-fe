import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import FormInput from "../components/hookForms/FormInput";
import FormSelect from "../components/hookForms/FormSelect";
import FormCheckbox from "../components/hookForms/FormCheckbox";
import apiFunction from "../api/apiFunction";

function ColumnEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const columnData = location.state || {}; // row data from navigate state

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      label: "",
      value: "",
      type: "",
      enable: false,
    },
  });

  // Prefill the form with passed data
  useEffect(() => {
    if (columnData) {
      reset({
        label: columnData.label || "",
        value: columnData.value || "",
        type: columnData.type || "",
        enable: columnData.enable || false,
      });
    }
  }, [columnData, reset]);

  const onSubmit = async (formData) => {
    try {
      await apiFunction({
        method: "PUT",
        url: `/api/v1/column-mapping/${id}`, // ✅ Make sure this endpoint exists
        data: formData,
      });
      alert("Column updated successfully!");
      navigate("/column-type/column-show", { state: { updated: true } });
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Column Mapping</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          name="label"
          control={control}
          label="Label"
          error={errors.label?.message}
          rules={{ required: "Label is required" }}
        />

        <FormInput
          name="value"
          control={control}
          label="Value"
          error={errors.value?.message}
          rules={{ required: "Value is required" }}
        />

        <FormSelect
          name="type"
          control={control}
          label="Type"
          options={["text", "number", "date"]}
          error={errors.type?.message}
          rules={{ required: "Type is required" }}
        />

        <FormCheckbox
          name="enable"
          control={control}
          label="Enable"
          error={errors.enable?.message}
        />

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate("/column-type/column-show")}
            className="border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ColumnEdit;
