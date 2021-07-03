import logoImg from "../../assets/images/logo.svg";
import Question from "../../components/Question";
import { Link } from "react-router-dom";
import RoomCode from "../../components/RoomCode";
import { useParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import useRoom from "../../hooks/useRoom";
import { FiThumbsUp } from "react-icons/fi";
import { FaArrowCircleLeft, FaQuestion } from "react-icons/fa";
import SendQuestion from "../../components/SendQuestion";
import VoidImage from "./../../assets/images/void-page.svg";

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

const Room = () => {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const [viewBoxQuestion, setViewBoxQuestion] = useState(false);
  const { id } = params;
  const {
    questionsAnswered,
    questionHighlighted,
    questionsMostVoted,
    questions,
    title,
  } = useRoom(id);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };
    await database.ref(`rooms/${id}/questions`).push(question);
    setNewQuestion("");
  }

  async function handleViewBoxQuestion() {
    viewBoxQuestion ? setViewBoxQuestion(false) : setViewBoxQuestion(true);
  }

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
    if (!user) {
      alert("Voce precisa efetuar o login");
      return;
    }
    if (likeId) {
      await database
        .ref(`rooms/${id}/questions/${questionId}/likes/${likeId}`)
        .remove();
    } else {
      await database.ref(`rooms/${id}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  return (
    <div className="justify-items-center items-center flex flex-col min-h-screen overflow-x-hidden dark:bg-gray-900">
      <header className="px-5 py-4 border-b border-p-white-dark bg-white dark:bg-gray-900 dark:border-gray-800 w-screen pt-4">
        <div className="max-w-6xl m-auto flex flex-col md:flex-row w-full justify-between items-center">
          <Link to="/">
            <img
              src={logoImg}
              alt="Letmeask"
              className="max-h-14 dark:bg-p-white rounded-md px-5"
            />
          </Link>
          <div className="flex justify-center items-center">
            <RoomCode code={id} />
          </div>
        </div>
      </header>
      <main className="max-w-5xl m-0 w-screen mt-0 px-5">
        <div className="flex gap-x-5 flex-row-reverse">
          <div className="w-5/12 py-5 gap-y-4 flex flex-col h-96">
            <h1 className="font-display text-md my-4 text-p-black font-semibold dark:text-p-white">
              Últimas questões respondidas
            </h1>
            <div className="overflow-y-scroll scrollbar scrollbar-thumb-blue-500 scrollbar-thin scrollbar-track-transparent flex flex-col gap-y-5">
              {questionsAnswered.map((question: QuestionProps) => (
                <div className="mr-5">
                  <Question
                    key={question.id}
                    content={question.content.substr(0, 150) + "..."}
                    author={question.author}
                    isAnswered={question.isAnswered}
                    isHighlighted={question.isHighlighted}
                  ></Question>
                </div>
              ))}
            </div>
          </div>
          <div className="w-7/12">
            <div className="mt-8 mx-0 mb-6 flex items-center">
              <h1 className="font-display text-md text-p-black font-semibold dark:text-p-white">
                {title}
              </h1>
              {questions.length > 0 && (
                <span
                  className="ml-8 bg-yellow-200 rounded-full py-2 px-4 
                          text-p-dark text-xs"
                >
                  {questions.length} perguntas
                </span>
              )}
            </div>
            <div>
              <button
                onClick={handleViewBoxQuestion}
                className="flex items-center text-white gap-x-2 
              bg-gradient-to-br font-bold to-blue-700 from-purple-500 
              transition-all delay-50 duration-100 transform hover:-rotate-6 
              px-3 py-2 mb-4 mt-2 rounded-md"
              >
                {viewBoxQuestion ? "Recolher" : "Perguntar"}
                {viewBoxQuestion ? (
                  <FaArrowCircleLeft
                    size={25}
                    className="bg-yellow-200 p-1.5 rounded-sm text-black transform -rotate-12"
                  />
                ) : (
                  <FaQuestion
                    size={25}
                    className="bg-yellow-200 p-1.5 rounded-sm text-black transform rotate-12"
                  />
                )}
              </button>
              {viewBoxQuestion ? (
                <SendQuestion
                  handleSendQuestion={handleSendQuestion}
                  setNewQuestion={setNewQuestion}
                  newQuestion={newQuestion}
                  user={user}
                />
              ) : (
                <>
                  {questionHighlighted.map(
                    (question: QuestionProps, index) =>
                      question.isHighlighted && (
                        <Question
                          key={question.id}
                          content={question.content}
                          author={question.author}
                          isAnswered={question.isAnswered}
                          isHighlighted={question.isHighlighted}
                        ></Question>
                      )
                  )}
                  {questionHighlighted.length === 0 && (
                    <div className="flex flex-col items-center gap-y-5 text-sm font-bold text-purple-900">
                      Sem perguntas destacadas! <br /> Tente puxar uma folha do
                      caderno...
                      <img
                        src={VoidImage}
                        className="w-52"
                        alt="Uma imagem de conteudo vazio"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <section className="my-8 flex flex-col">
          <h1 className="font-display text-md text-p-black font-semibold dark:text-p-white">
            Mais Votadas
          </h1>
          <div className="grid grid-cols-2 gap-5 py-5">
            {questionsMostVoted.slice(0, 2).map((question: QuestionProps) => (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <button
                    onClick={() => {
                      handleLikeQuestion(question.id, question.likeId);
                    }}
                    className="flex flex-row items-center focus:outline-none focus:border-transparent"
                    aria-label="Marcar como gostei"
                  >
                    {question.likeCount > 0 && (
                      <span className="mr-1.5 text-p-gray-dark">
                        {question.likeCount}
                      </span>
                    )}
                    <FiThumbsUp
                      size={22}
                      className={`p-0 ${
                        !question.likeId
                          ? "text-p-gray hover:text-p-gray-dark"
                          : "text-blue-700 hover:text-blue-700"
                      } transition delay-150 duration-300 ease-in-out`}
                    />
                  </button>
                )}
              </Question>
            ))}
          </div>
        </section>
        <section className="my-8 flex flex-col gap-y-5">
          {questionsMostVoted
            .slice(2, questionsMostVoted.length)
            .map((question: QuestionProps) => (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <button
                    onClick={() => {
                      handleLikeQuestion(question.id, question.likeId);
                    }}
                    className="flex flex-row items-center focus:outline-none focus:border-transparent"
                    aria-label="Marcar como gostei"
                  >
                    {question.likeCount > 0 && (
                      <span className="mr-1.5 text-p-gray-dark">
                        {question.likeCount}
                      </span>
                    )}
                    <FiThumbsUp
                      size={22}
                      className={`p-0 ${
                        !question.likeId
                          ? "text-p-gray hover:text-p-gray-dark"
                          : "text-blue-700 hover:text-blue-700"
                      } transition delay-150 duration-300 ease-in-out`}
                    />
                  </button>
                )}
              </Question>
            ))}
        </section>
      </main>
    </div>
  );
};

export default Room;
