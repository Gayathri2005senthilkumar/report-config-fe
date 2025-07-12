import { Controller } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import Input from "../Forms/Input"

const FormInput = ({control, name, error, ...props}) => {

    return (<>
         <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input {...field} {...props} />
          )}
        />
        <ErrorMessage error={error} />
        </>)
}

export default FormInput