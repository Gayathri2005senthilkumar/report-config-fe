import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import FormInput from "../components/hookForms/FormInput";
import FormSelect from "../components/hookForms/FormSelect";
import FormCheckbox from "../components/hookForms/FormCheckbox";
import { updateColumn } from "./column-data";

const options = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Date", value: "date" },
];

function ColumnEdit() {
  const navigate = useNavigate();
  const { state: row } = useLocation(); // row = column data from navigation

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      label: row?.label || "",
      value: row?.value || "",
      type: row?.type || "",
      enable: row?.enable || false,
    },
  });

  const onSubmit = async (formData) => {
    try {
      const payload = {
        id: row.id,
        ...formData,
      };
      await updateColumn(payload);
      alert("Column updated successfully");
      navigate("/column-type/column-show", { state: { updated: true } });
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update column");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Edit Column</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          name="label"
          control={control}
          label="Label"
          error={errors.label}
        />

        <FormInput
          name="value"
          control={control}
          label="Value"
          error={errors.value}
        />

        <FormSelect
          name="type"
          control={control}
          label="Type"
          options={options}
          error={errors.type}
        />

        <FormCheckbox
          name="enable"
          control={control}
          label="Enable"
          error={errors.enable}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={() => navigate("/column-type/column-show")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default ColumnEdit;
