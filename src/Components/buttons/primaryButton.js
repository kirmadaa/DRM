const PrimaryButton = ({ children, onClick, className, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className={`text-white bg-primary focus:ring-0 focus:ring-primary font-[500] text-sm px-5 mt-2 mb-2 focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
