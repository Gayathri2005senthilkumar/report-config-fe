import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { Controller } from "react-hook-form"
const notEmpty = item => {
  console.log("item", item)
  return "Value is required"
}
export default function AutoCompleteMultiple({
  control,
  options,
  label,
  noOptionsText,
  name,
  setInputValue,
  inputValue
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: {
          value: true,
          message: "Required"
        },
        minLength: { value: 12, message: "Min Length" }
        // validate: notEmpty
      }}
      render={({ field: { onChange, value }, fieldState }) => (
        <Autocomplete
          options={options}
          multiple={true}
          getOptionLabel={option => option?.name || ""}
          autoComplete
          filterSelectedOptions
          value={value || []}
          noOptionsText={noOptionsText}
          onInputChange={(event, newInputValue) => {
            // props.handleInputChange(newInputValue)
            setInputValue(newInputValue)
          }}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          renderOption={(props, option) => {
            return (
              <li {...props} key={option._id}>
                {option.name}
              </li>
            )
          }}
          renderInput={params => (
            <TextField
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              value={inputValue}
              {...params}
              label={label}
              variant="outlined"
            />
          )}
          onChange={(e, data) => onChange(data)}
        />
      )}
    />
  )
}

// Usage: <AutoCompleteMultiple
// 				inputValue={inputValue}
// 				setInputValue={setInputValue}
// 				name='tags'
// 				options={options}
// 				control={control}
// 				label='Select Tags'
// 				noOptionsText='No Tags'
// 			/>
