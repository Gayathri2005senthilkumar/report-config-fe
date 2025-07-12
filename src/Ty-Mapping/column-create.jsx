// src/Ty-Mapping/column-create.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addColumn } from "./column-data";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInput from "../Components/hookForms/FormInput";
import FormSelect from "../Components/hookForms/FormSelect";
import FormCheckbox from "../Components/hookForms/FormCheckbox";
import SubmitButton from "../Components/Buttons/submitButton";
import useMutationCustom from "../api/useMutationCustom";

const schema = yup.object().shape({
  label: yup.string().required("Name is required"),
  value: yup.string().required("Value is required"),
  type: yup.string().required("Type is required"),
  enable: yup.boolean().optional(),
});

const SelectOptions = [
  { value: "", label: "-- Select Type --" },
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "boolean", label: "Boolean" },
];

function ColumnCreate() {
  const {
    control, //form control
    handleSubmit, //on submit
    formState: { errors }, //validation error
  } = useForm({
    resolver: yupResolver(schema), // validation
    defaultValues: {
    label: "",
    value: "",
    type: "",
    enable: false,
  }
  });

   const { isPending, mutateAsync } = useMutationCustom({
    onSuccess: () => {

    },
    onError: () => {

    }
   });

  const navigate = useNavigate();
  const [form, setForm] = useState({
    label: "",
    value: "",
    type: "",
    enable: false,
  });

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
   
       try {
        mutateAsync({
          url: "columnMapping",
          method: 'post',
          data: data,
        })
      // console.log("📝 Submitting column form:", form);
      await addColumn(form);
      // navigate("/column-type/column-show");
    } catch (err) {
      console.error(
        "❌ Failed to create column:",
        err.response?.data || err.message
      );
      alert("❌ Failed to create column. Check console for more details.");
    }
  };

  const save = async () => {
    if (!form.label || !form.value || !form.type) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      console.log("📝 Submitting column form:", form);
      await addColumn(form);
      alert("✅ Column created successfully!");
      navigate("/column-type/column-show");
    } catch (err) {
      console.error(
        "❌ Failed to create column:",
        err.response?.data || err.message
      );
      alert("❌ Failed to create column. Check console for more details.");
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Label
          </label>
          <FormInput
            name="label"
            control={control}
            error={errors.label?.message}
            placeholder="Enter label name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Value
          </label>
            <FormInput
            name="value"
            control={control}
            error={errors.value?.message}
            placeholder="Enter column value"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <FormSelect control={control} name="type" error={errors.type?.message} options={SelectOptions} />

          {/* <select
            name="type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500"
          >
            <option value="">-- Select Type --</option>
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
          </select> */}
        </div>

        <div className="flex items-center gap-2">
          <FormCheckbox name="enable" control={control}  />
          {/* <input
            type="checkbox"
            id="enable"
            checked={form.enable}
            onChange={(e) => setForm({ ...form, enable: e.target.checked })}
            className="h-4 w-4 text-violet-600"
          /> */}
          <label htmlFor="enable" className="text-gray-700">
            Enable
          </label>
        </div>

        <div className="text-right">
          <SubmitButton disabled={isPending} />
        </div>
      </div>
    </form>
  );
}

export default ColumnCreate;
