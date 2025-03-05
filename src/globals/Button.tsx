import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
}

const buttonStyles = {
  primary: "bg-sky font-bricolage text-white relative overflow-hidden hover:shadow-md active:shadow-sm transform transition-all duration-200 ease-out after:absolute after:inset-0 after:opacity-0 hover:after:opacity-100 after:bg-[radial-gradient(ellipse_at_top_left,_transparent_20%,_rgba(255,255,255,0.3)_50%,_transparent_80%)] after:rotate-[30deg] after:scale-0 hover:after:scale-[2] after:origin-center after:transition-all after:duration-500 after:ease-in-out active:scale-95",
  secondary: "bg-gray-500 font-bricolage text-white relative overflow-hidden hover:shadow-md active:shadow-sm transform transition-all duration-200 ease-out after:absolute after:inset-0 after:opacity-0 hover:after:opacity-100 after:bg-[radial-gradient(ellipse_at_top_left,_transparent_20%,_rgba(255,255,255,0.3)_50%,_transparent_80%)] after:rotate-[30deg] after:scale-0 hover:after:scale-[2] after:origin-center after:transition-all after:duration-500 after:ease-in-out active:scale-95",
  danger: "bg-red-500 font-bricolage text-white relative overflow-hidden hover:shadow-md active:shadow-sm transform transition-all duration-200 ease-out after:absolute after:inset-0 after:opacity-0 hover:after:opacity-100 after:bg-[radial-gradient(ellipse_at_top_left,_transparent_20%,_rgba(255,255,255,0.3)_50%,_transparent_80%)] after:rotate-[30deg] after:scale-0 hover:after:scale-[2] after:origin-center after:transition-all after:duration-500 after:ease-in-out active:scale-95",
};

const sizeStyles = {
  small: "px-14 py-3 text-sm",
  medium: "px-4 py-2 text-base",
  large: "px-24 py-2 text-lg",
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md font-semibold whitespace-pre isolate ${buttonStyles[variant]} ${sizeStyles[size]} ${
        disabled ? "opacity-50 cursor-not-allowed after:hidden active:scale-100" : ""
      }`}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default Button;