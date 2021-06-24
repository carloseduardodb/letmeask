import logoImg from "../../assets/images/logo.svg";
import Button from "./../../components/Button";
import Question from "../../components/Question";
import RoomCode from "../../components/RoomCode";
import { useParams } from "react-router-dom";
import { FormEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import IdentifyUser from "../../components/IdentifyUser";
import useRoom from "../../hooks/useRoom";
import { FiThumbsUp } from "react-icons/fi";

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
  const { id } = params;
  const { questions, title } = useRoom(id);

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

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
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
    <div className="justify-items-center items-center flex flex-col">
      <header className="p-6 border-b border-p-white-dark w-screen">
        <div className="max-w-6xl m-auto flex justify-between items-center">
          <img src={logoImg} alt="Letmeask" className="max-h-11" />
          <RoomCode code={id} />
        </div>
      </header>
      <main className="max-w-4xl m-0 w-screen mt-8">
        <div className="mt-8 mx-0 mb-6 flex items-center">
          <h1 className="font-display text-2xl text-p-black font-semibold">
            Sala {title}
          </h1>
          {questions.length > 0 && (
            <span
              className="ml-8 bg-p-pink-dark rounded-full py-2 px-4 
                          text-p-white text-xs"
            >
              {questions.length} perguntas
            </span>
          )}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            className="w-full px-5 py-4 rounded-sm shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-p-pink-dark focus:ring-opacity-50"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
            rows={4}
            placeholder="O que você quer perguntar?"
          />
          <div className="flex flex-row-reverse items-center justify-between">
            <div>
              <Button type="submit" disabled={!user}>
                Enviar pergunta
              </Button>
            </div>
            {!user ? (
              <span>
                Para enviar uma pergunta,{" "}
                <button className="text-p-pink-dark">faça seu login</button>.
              </span>
            ) : (
              <IdentifyUser avatar={user.avatar} author name={user.name} />
            )}
          </div>
        </form>
        <section className="my-8 flex flex-col gap-y-3">
          {questions.map((question: QuestionProps) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
            >
              <button
                onClick={() => {
                  handleLikeQuestion(question.id, question.likeId);
                }}
                className="flex flex-row items-center"
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
                      : "text-p-purple hover:text-p-purple-dark"
                  } transition delay-150 duration-300 ease-in-out`}
                />
              </button>
            </Question>
          ))}
        </section>
      </main>
    </div>
  );
};

export default Room;
