import { Controller } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import Checkbox from "../Forms/Checkbox"

const FormCheckbox = ({control, name, error, ...props}) => {

    return (<>
         <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Checkbox {...field} {...props} />
            )}
          />
          <ErrorMessage error={error} />
        </>)
}

export default FormCheckbox