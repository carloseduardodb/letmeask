import IdentifyUser from "../IdentifyUser";
import { ReactNode } from "react";

type PropsQuestion = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
};

const Question = ({ content, author, children }: PropsQuestion) => {
  return (
    <div className="p-5 bg-white rounded-sm flex flex-col gap-y-4">
      <p className="text-sm mb-3 text-black">{content}</p>
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
