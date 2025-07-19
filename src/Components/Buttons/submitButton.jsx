const SubmitButton = ({ text = "Save", ...props }) => {
  return (
    <button
      type="submit"
      {...props}
      className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition-all cursor-pointer disabled:opacity-50"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
