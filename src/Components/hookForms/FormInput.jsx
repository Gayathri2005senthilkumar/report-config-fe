import { Controller } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import Input from "../Forms/Input"; // ✅ this is your styled component

const FormInput = ({ name, control, error, ...props }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <div>
        <Input
          {...field}
          {...props}
          id={name} // ✅ important for label linking
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    )}
  />
);

export default FormInput;
