import { Controller } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import Select from "../Forms/Select"

const FormSelect = ({control, name, error, ...props}) => {

    return (<>
         <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Select {...field} {...props} />
            )}
          />
          <ErrorMessage error={error} />
        </>)
}

export default FormSelect