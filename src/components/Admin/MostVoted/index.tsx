import Question from "../../../components/All/Question";
import { FiTrash } from "react-icons/fi";
import { FiThumbsUp, FiCheckCircle, FiMessageSquare } from "react-icons/fi";

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

type MostVotedProps = {
  questionsMostVoted: QuestionProps[];
  handleCheckQuestionAsAnswered: (value: string) => void;
  handleHighlightQuestion: (valueOne: string, valueTwo: boolean) => void;
  handleDeleteQuestion: (value: string) => void;
};

const MostVoted = ({
  handleCheckQuestionAsAnswered,
  handleDeleteQuestion,
  handleHighlightQuestion,
  questionsMostVoted,
}: MostVotedProps) => {
  return (
    <section className="my-8 flex flex-col">
      <h1 className="font-display text-md text-p-black font-semibold dark:text-p-white">
        Mais Votadas
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5">
        {questionsMostVoted.slice(0, 2).map((question: QuestionProps) => (
          <Question
            key={question.id}
            content={question.content}
            author={question.author}
            isAnswered={question.isAnswered}
            isHighlighted={question.isHighlighted}
          >
            <div className="flex flex-row items-center">
              {question.likeCount > 0 && (
                <span
                  className="flex items-center gap-x-1 justify-center mr-1.5 
                  text-p-white bg-blue-700 w-12 h-8 rounded-full"
                >
                  <FiThumbsUp />
                  {question.likeCount}
                </span>
              )}
              {!question.isAnswered && (
                <>
                  <button
                    onClick={() => {
                      handleCheckQuestionAsAnswered(question.id);
                    }}
                    className="text-green-500 flex items-center justify-center 
                      hover:text-p-white hover:bg-green-500 w-12 h-8 px-2 py-1 
                      rounded-full"
                    aria-label="Apagar pergunta"
                  >
                    <FiCheckCircle
                      size={18}
                      className={`p-0 
                          transition delay-50 duration-300 ease-in-out`}
                    />
                  </button>

                  <button
                    onClick={() => {
                      handleHighlightQuestion(
                        question.id,
                        question.isHighlighted
                      );
                    }}
                    className={`text-blue-700 flex items-center justify-center 
                    hover:text-p-white hover:bg-blue-700 w-12 h-8 px-2 py-1 
                    rounded-full ${
                      question.isHighlighted && "bg-blue-700 text-p-white"
                    }
                    `}
                    aria-label="Apagar pergunta"
                  >
                    <FiMessageSquare
                      size={18}
                      className={`p-0 
                  transition delay-50 duration-300 ease-in-out`}
                    />
                  </button>
                </>
              )}

              <button
                onClick={() => {
                  handleDeleteQuestion(question.id);
                }}
                className="text-p-danger flex items-center justify-center hover:text-p-white hover:bg-p-danger w-12 h-8 px-2 py-1 rounded-full"
                aria-label="Apagar pergunta"
              >
                <FiTrash
                  size={18}
                  className={`p-0 
                  transition delay-50 duration-300 ease-in-out`}
                />
              </button>
            </div>
          </Question>
        ))}
      </div>
    </section>
  );
};

export default MostVoted;
