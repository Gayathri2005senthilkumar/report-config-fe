const OutlineButton = ({ text = "Cancel", ...props }) => {
  return (
    <button
      type="button"
      className="border border-violet-500 bg-white text-violet-700 font-bold px-6 py-3 rounded hover:bg-violet-100"
      {...props}
    >
      {text}
    </button>
  );
};

export default OutlineButton;
