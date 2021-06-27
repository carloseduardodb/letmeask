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
import emptyQuestions from "../../assets/images/empty-questions.svg";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";
import useMyRooms from "../../hooks/useMyRooms";

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
  const { user } = useAuth();
  const history = useHistory();
  const { id } = params;
  const { questions, title } = useRoom(id);
  const { dataRooms } = useMyRooms();

  useEffect(() => {
    if (dataRooms !== null) {
      if (dataRooms[0]) dataRooms[0].authorId !== user?.id && history.push("/");
    }
    if (!user) {
      history.push("/");
    }
  }, [user?.id, dataRooms, history]);

  async function handleEndRoom() {
    await database.ref(`rooms/${id}`).update({
      endedAt: new Date(),
    });

    await database.ref(`users/${user?.id}/${id}`).update({
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
      <header className="px-5 py-4 border-b border-p-white-dark bg-white w-screen pt-4">
        <div className="max-w-6xl m-auto flex flex-col md:flex-row justify-between items-center">
          <Link to="/">
            <img src={logoImg} alt="Letmeask" className="max-h-14" />
          </Link>
          <div className="flex flex-col md:flex-row gap-x-3 gap-y-3 md:gap-y-0">
            <RoomCode code={id} />
            <div className="max-h-10 w-full">
              <Button
                onClick={handleEndRoom}
                className="h-10 bg-p-white w-full hover:bg-p-white-dark text-red-700 border border-red-700 rounded-lg font-medium  
                transition-colors delay-75 flex justify-center items-center 
                cursor-pointer px-8 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Encerrar Sala
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-4xl m-0 w-screen mt-0 px-5">
        <div className="mt-8 mx-0 mb-6 flex items-center">
          <h1 className="font-display text-md text-p-black font-semibold">
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

        <section className="my-4 flex flex-col gap-y-3">
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
          {questions.length === 0 && (
            <div>
              <h3>
                Sua aula está tão boa que seus alunos estão sem palavras
                <br />
                <span className="text-blue-700 font-bold">OU</span>
                <br />
                Eles foram abduzidos
              </h3>
              <div className="flex justify-center">
                <img
                  src={emptyQuestions}
                  width={250}
                  alt="Imagem de uma pessoa sendo abduzida"
                />
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminRoom;
