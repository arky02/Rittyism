interface ButtonProps {
  text: string;
  disabled?: boolean;
  className?: string;
  onClick: () => void;
}

const Button = ({
  text,
  disabled = false,
  className = "",
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={`rounded-[18px] w-full h-[60px] font-bold text-[20px] ${
        disabled
          ? "bg-[#f9f9f9] text-[#A5A6B0]"
          : "bg-gradient-to-r from-[#6B7AFF] via-[#716BF8] to-[#6675FF] text-white"
      } ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
