import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import FormInput from "../Components/hookForms/FormInput";
import FormSelect from "../Components/hookForms/FormSelect";
import FormCheckbox from "../Components/hookForms/FormCheckbox";
import SubmitButton from "../Components/Buttons/submitButton";

import { useQuery } from "@tanstack/react-query";
import useQueryGetpi from "@/api/useQueryGetApi";
import useMutationCustom from "@/api/useMutationCustom";
import OutlineButton from "@/Components/Buttons/OutlineButton";
import getAPIMap from "@/api/ApiUrls";


const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  name: yup.string().required("Name is required"),
  normalized_name: yup.string().required("Normalized Name is required"),
  enable: yup.boolean(),
});

function ConfigCreate() {
  const navigate = useNavigate();
  const { id } = useParams();
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
    },
    resolver: yupResolver(schema),
    mode: "all",
  });

  const addMutation = useMutationCustom({
    onSuccess: () => {
      alert("Column created successfully!");
      navigate("/config-type/config-show");
    },

    onError: (err) => {
      console.error("❌ Error:", err);
      alert("❌ Failed to create column");
    },
  });

  const queryString = useMemo(() => {
    return "/" + id ;
  }, [id]);

const { data } = useQuery({
  queryKey: ["config", queryString],
  queryFn: useQueryGetpi,
  enabled: id !== "create",
  refetchOnWindowFocus: false,
});


  useEffect(() => {
    if (id !== "create" && data?.data) {
      //console.log("Fetched data from API:", data?.data);
      const clone = { ...(data?.data || {}) };
      delete clone.updatedAt;
      delete clone.createdAt;
      reset(clone);
    }
  }, [data]);
  
 const onSubmit = (formData) => {
  if (id === "create") {
    addMutation.mutate({
      url: "config",
      method: "post",
      data: formData,
    });
  } else {
     addMutation.mutate({
        url: `${getAPIMap("config")}/${formData.id}`,
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
          <label htmlFor="title">Title</label>
          <FormInput
            name="title"
            control={control}
            error={errors.title?.message}
          />
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <FormInput
            name="name"
            control={control}
            error={errors.name?.message}
          />
        </div>

        <div>
          <label htmlFor="normalized_name">Normalized Name</label>
          <FormInput
            name="normalized_name"
            control={control}
            error={errors.normalized_name?.message}
          />
        </div>


        <div className="flex items-center gap-2">
          <FormCheckbox name="enable" control={control} />
          <label htmlFor="enable" className="text-gray-700">
            Enable
          </label>
        </div>

        <div className="flex justify-end gap-4">
          <OutlineButton
            text="Cancel"
            style={{ minWidth: "100px" }}
            onClick={() => {
              navigate("/config-type/config-show");
            }}
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
