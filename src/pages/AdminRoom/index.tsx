import logoImg from "../../assets/images/logo.svg";
import Button from "./../../components/Button";
import Question from "../../components/Question";
import RoomCode from "../../components/RoomCode";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import useRoom from "../../hooks/useRoom";

type QuestionProps = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

type RoomParams = {
  id: string;
};

const AdminRoom = () => {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const { id } = params;
  const { questions, title } = useRoom(id);

  return (
    <div className="justify-items-center items-center flex flex-col">
      <header className="p-6 border-b border-p-white-dark w-screen">
        <div className="max-w-6xl m-auto flex justify-between items-center">
          <img src={logoImg} alt="Letmeask" className="max-h-11" />
          <div className="flex flex-row gap-x-3 justify-center items-center">
            <RoomCode code={id} />
            <div className="max-h-10">
              <Button isSecodary>Encerrar Sala</Button>
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
              className="ml-8 bg-p-pink-dark rounded-full py-2 px-4 
                          text-p-white text-xs"
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
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default AdminRoom;
