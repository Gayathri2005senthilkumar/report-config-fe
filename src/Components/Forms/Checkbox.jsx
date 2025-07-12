const Checkbox = (props) => {
    return (<input
            type="checkbox"
            {...props}
            // checked={props.value}
            // onChange={(e) => field.onChange(e.target.checked)}
            className="h-4 w-4 text-violet-600 cursor-pointer"
          />)
}
export default Checkbox;