import IdentifyUser from "../IdentifyUser";
import { FiThumbsUp } from "react-icons/fi";
import React from "react";

type PropsQuestion = {
  question: {
    id: string;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  };
};

const Question: React.FC<PropsQuestion> = ({ question }) => {
  return (
    <div className="p-5 bg-white rounded-sm flex flex-col gap-y-4">
      <p className="text-sm mb-3 text-black">{question.content}</p>
      <div className="flex flex-row justify-between items-center">
        <IdentifyUser
          author={false}
          avatar={question.author.avatar}
          name={question.author.name}
        />
        <span className="flex flex-row items-center">
          <span className="mr-1.5 text-2xl text-p-gray-dark">5</span>
          <FiThumbsUp size={20} className="p-0 text-p-purple" />
        </span>
      </div>
    </div>
  );
};

export default Question;
