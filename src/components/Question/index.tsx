import IdentifyUser from "../IdentifyUser";
import { ReactNode } from "react";

type PropsQuestion = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

const Question = ({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
}: PropsQuestion) => {
  return (
    <div
      className={`p-5 
      ${
        isHighlighted && !isAnswered
          ? "bg-purple-50 border-2 border-blue-700"
          : "bg-white"
      }  
      ${isAnswered ? "bg-p-gray-extra-light" : "bg-white"}  
      rounded-lg flex flex-col gap-y-4 shadow-md`}
    >
      <p className="text-sm mb-3 text-gray-800">{content}</p>
      <div className="flex flex-row justify-between items-center">
        <IdentifyUser
          author={false}
          avatar={author.avatar}
          name={author.name}
        />
        {children}
      </div>
    </div>
  );
};

export default Question;
