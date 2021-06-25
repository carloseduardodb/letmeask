import logoImg from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import Button from "./../../components/Button";
import Question from "../../components/Question";
import RoomCode from "../../components/RoomCode";
import { useHistory, useParams } from "react-router-dom";
import { FiTrash } from "react-icons/fi";
import useRoom from "../../hooks/useRoom";
import { database } from "../../services/firebase";
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

type RoomParams = {
  id: string;
};

const AdminRoom = () => {
  const params = useParams<RoomParams>();
  const history = useHistory();
  const { id } = params;
  const { questions, title } = useRoom(id);

  async function handleEndRoom() {
    await database.ref(`rooms/${id}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${id}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${id}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighlightQuestion(
    questionId: string,
    isHighLighted: boolean
  ) {
    if (!isHighLighted) {
      await database.ref(`rooms/${id}/questions/${questionId}`).update({
        isHighlighted: true,
      });
    } else {
      await database.ref(`rooms/${id}/questions/${questionId}`).update({
        isHighlighted: false,
      });
    }
  }

  return (
    <div className="justify-items-center items-center flex flex-col min-h-screen">
      <header className="p-6 border-b border-p-white-dark bg-white w-screen">
        <div className="max-w-6xl m-auto flex justify-between items-center">
          <Link to="/">
            <img src={logoImg} alt="Letmeask" className="max-h-11" />
          </Link>
          <div className="flex flex-row gap-x-3 justify-center items-center">
            <RoomCode code={id} />
            <div className="max-h-10">
              <Button onClick={handleEndRoom} isSecodary>
                Encerrar Sala
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-4xl m-0 w-screen mt-8">
        <div className="mt-8 mx-0 mb-6 flex items-center">
          <h1 className="font-display text-2xl text-p-black font-semibold">
            Sala {title}
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

        <section className="my-8 flex flex-col gap-y-3">
          {questions.map((question: QuestionProps) => (
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
        </section>
      </main>
    </div>
  );
};

export default AdminRoom;
