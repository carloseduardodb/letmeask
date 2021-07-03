import Button from "./../Button";
import { Link } from "react-router-dom";
import IdentifyUser from "./../IdentifyUser";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type FormProps = {
  handleSendQuestion: (event: React.FormEvent<HTMLFormElement>) => void;
  setNewQuestion: (value: string) => void;
  user: User | undefined;
  newQuestion: string;
};

const SendQuestion = ({
  handleSendQuestion,
  user,
  setNewQuestion,
  newQuestion,
}: FormProps) => {
  return (
    <form onSubmit={handleSendQuestion}>
      <textarea
        className="w-full px-5 py-4 mb-5 rounded-sm shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
        onChange={(event) => setNewQuestion(event.target.value)}
        value={newQuestion}
        rows={4}
        placeholder="O que você quer perguntar?"
      />
      <div className="flex flex-col-reverse md:flex-row-reverse gap-y-5 items-start justify-between">
        <div className="w-full md:w-4/12">
          <Button
            type="submit"
            disabled={!user}
            className={`
                  h-14 bg-blue-700 hover:bg-blue-800 text-white
                  rounded-lg font-medium  w-full
                  transition-colors delay-75  flex justify-center items-center 
                  cursor-pointer border-0 px-8 disabled:opacity-50 disabled:cursor-not-allowed
              `}
          >
            Enviar pergunta
          </Button>
        </div>
        {!user ? (
          <span>
            Para enviar uma pergunta,{" "}
            <Link to="/" className="text-blue-700">
              faça seu login
            </Link>
            .
          </span>
        ) : (
          <IdentifyUser avatar={user.avatar} author name={user.name} />
        )}
      </div>
    </form>
  );
};

export default SendQuestion;
