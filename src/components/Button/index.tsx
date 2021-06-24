import React from "react";
import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonAllPropsPersonalise extends ButtonProps {
  isSecodary?: boolean;
}

const Button: React.FC<ButtonAllPropsPersonalise> = (
  props: ButtonAllPropsPersonalise
) => {
  return (
    <button
      className={`
        w-full ${
          props.isSecodary
            ? "h-10 bg-p-white hover:bg-p-white-dark text-p-purple border border-p-purple"
            : "h-14 bg-p-purple hover:bg-p-purple-dark text-white"
        } rounded-lg font-medium  
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
