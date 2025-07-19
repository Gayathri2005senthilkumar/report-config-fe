import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormInput from "../Components/hookForms/FormInput";
import FormSelect from "../Components/hookForms/FormSelect";
import FormCheckbox from "../Components/hookForms/FormCheckbox";
import SubmitButton from "../Components/Buttons/submitButton";

import { useMutation, useQuery } from "@tanstack/react-query";
import { addColumn } from "./column-data";
import useQueryGetpi from "@/api/useQueryGetApi";
import useMutationCustom from "@/api/useMutationCustom";
import OutlineButton from "@/Components/Buttons/OutlineButton";

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
  const { id } = useParams();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty,isValid  },
    reset,
  } = useForm({
    defaultValues: {
      label: "",
      value: "",
      type: "",
      enable: false,
    },
    resolver: yupResolver(schema),
  });

  const addMutation = useMutationCustom({
    onSuccess: () => {
      alert("✅ Column created successfully!");
      navigate("/column-type/column-show");
    },
    onError: () => {
      console.error("❌ Error:", err);
      alert("❌ Failed to create column");
    },
  });

  const queryString = useMemo(() => {
    return "/" + id + "?v1";
  }, [id]);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["columnMapping", queryString], // Unique key for caching and tracking
    queryFn: useQueryGetpi,
    enabled: id !== "create",
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (id !== "create" && data?.data) {
      const clone={...(data?.data|| {})};
      delete clone.updatedAt;
      delete clone.createdAt;
      reset(clone);
    }
  }, [data]);

  const onSubmit = (formData) => {
    if (id === "create") {
      addMutation.mutate({
        url: "columnMapping",
        method: "post",
        data: formData,
      });
    } else {
      // const url = `${getAPIMap("columnMapping")}/${id}`;
      addMutation.mutate({
         url: "columnMapping",
        //  url: url,
        method: "put",
        data: formData,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {id === "create" ? "Create New Column" : "Edit New Column"}
      </h2>

      <div className="space-y-5">
        <div>
          <label htmlFor="label">Label</label>
          <FormInput
            name="label"
            control={control}
            error={errors.label?.message}
          />
        </div>

        <div>
          <label htmlFor="value">Value</label>
          <FormInput
            name="value"
            control={control}
            error={errors.value?.message}
          />
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
          <label htmlFor="enable" className="text-gray-700">
            Enable
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <OutlineButton text="Cancel" style={{minWidth: '100px'}} onClick={()=>{
            navigate("/column-type/column-show");
          }} />
          <SubmitButton disabled={addMutation.isPending || !isDirty || !isValid } style={{minWidth: '100px'}} />
        </div>
      </div>
    </form>
  );
}

export default ColumnCreate;
