// src/Components/Forms/Checkbox.jsx
const Checkbox = (props) => {
  return (
    <input
      type="checkbox"
      {...props}
      className="h-4 w-4 text-violet-600 cursor-pointer"
    />
  );
};

export default Checkbox;
