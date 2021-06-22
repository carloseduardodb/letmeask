import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  return (
    <button
      className="
        mt-5 w-full h-14 rounded-lg font-medium bg-p-purple hover:bg-p-purple-dark 
        transition-colors delay-75 text-white flex justify-center items-center 
        cursor-pointer border-0 px-8 disabled:opacity-50 disabled:cursor-not-allowed
      "
      {...props}
    ></button>
  );
};

export default Button;
