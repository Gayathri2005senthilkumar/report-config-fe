// src/Components/Forms/Select.jsx
const Select = ({ options, ...props }) => {
  return (
    <select
      {...props}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-violet-500"
    >
      {options.map((item, i) => (
        <option key={item.value || i} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
