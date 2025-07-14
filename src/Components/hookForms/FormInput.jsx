import { Controller } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import Input from "../Forms/Input"


    const FormInput = ({ name, control, error, ...props }) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <>
        <input
          {...field}
          {...props}
          id={name} // ✅ This is the key fix
          className="input-styles"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </>
    )}
  />
);



export default FormInput