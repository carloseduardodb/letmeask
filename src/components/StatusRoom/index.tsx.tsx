import React from "react";

type QuestionProps = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
};

type StatusRoomProps = {
  questions: QuestionProps[];
  title: string;
};

const StatusRoom = ({ questions, title }: StatusRoomProps) => {
  return (
    <div className="mt-8 mx-0 mb-6 flex items-center">
      <h1 className="font-display text-md text-p-black dark:text-p-white font-semibold">
        {title}
      </h1>
      {questions.length > 0 && (
        <span
          className="ml-8 bg-yellow-200 rounded-full py-2 px-4 
                          text-p-black text-xs"
        >
          {questions.length} perguntas
        </span>
      )}
    </div>
  );
};

export default StatusRoom;
