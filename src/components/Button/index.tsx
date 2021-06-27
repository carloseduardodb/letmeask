import React from "react";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonAllPropsPersonalise extends ButtonProps {
  isSecodary?: boolean;
}

const Button: React.FC<ButtonAllPropsPersonalise> = (
  props: ButtonAllPropsPersonalise,
  ...rest
) => {
  return (
    <button
      className={`
        w-full "h-14 bg-blue-700 hover:bg-blue-800 text-white"
        rounded-lg font-medium  
        transition-colors delay-75  flex justify-center items-center 
        cursor-pointer border-0 px-8 disabled:opacity-50 disabled:cursor-not-allowed
      `}
      {...props}
    >
      {props.children}
    </button>
  );
};

export default Button;
