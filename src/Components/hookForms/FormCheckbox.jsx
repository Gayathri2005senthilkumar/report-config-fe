// src/Components/hookForms/FormCheckbox.jsx
import { Controller } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import Checkbox from "../Forms/Checkbox";

const FormCheckbox = ({ control, name, error, ...props }) => {
  if (!control) {
    console.error("❌ Missing control prop in FormCheckbox");
    return null;
  }

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Checkbox
            {...field}
            checked={!!field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            {...props}
          />
        )}
      />
      {error && <ErrorMessage error={error} />}
    </>
  );
};

export default FormCheckbox;
