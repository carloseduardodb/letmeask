import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { database } from "../../../services/firebase";

type DataRooms = {
  authorId: string;
  countQuestions: string;
  countResponses: boolean;
  endedAt: Date;
  roomKey: string;
  title: string;
};

const Room = ({
  countQuestions,
  countResponses,
  endedAt,
  roomKey,
  title,
}: DataRooms) => {
  const { user } = useAuth();
  const history = useHistory();
  async function handleReopenRoom() {
    await database.ref(`users/${user?.id}/${roomKey}/endedAt`).remove();
    await database.ref(`rooms/${roomKey}/endedAt`).remove();
    history.push(`/admin/rooms/${roomKey}`);
  }
  return (
    <>
      {endedAt === undefined ? (
        <div className="bg-gradient-to-tr from-blue-700 to-blue-600 px-5 py-4 rounded">
          <h3 className="font-bold mb-2 text-xl uppercase text-p-white">
            {title}
          </h3>
          <ul className="text-p-white-dark">
            <li>{countQuestions} perguntas</li>
            <li>{countResponses} respondidas</li>
          </ul>
          <div className="flex flex-row justify-between items-center mt-5">
            <p className="text-white font-bold">Sala aberta</p>
            <Link
              to={`/admin/rooms/${roomKey}`}
              className="bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition delay-75 duration-150"
            >
              Entrar
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-tr from-blue-700 to-blue-600 px-5 py-4 rounded">
          <h3 className="font-bold mb-2 text-xl uppercase text-p-white">
            {title}
          </h3>
          <ul className="text-p-white-dark">
            <li>{countQuestions} perguntas</li>
            <li>{countResponses} respondidas</li>
          </ul>
          <div className="flex flex-row justify-between items-center mt-5">
            <p className="text-p-black font-bold bg-yellow-200 px-2 py-2 rounded-md">
              Sala fechada
            </p>
            <button
              onClick={handleReopenRoom}
              className="bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition delay-75 duration-150"
            >
              Reabrir
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Room;
