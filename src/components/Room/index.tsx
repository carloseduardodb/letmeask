import { Link } from "react-router-dom";

type DataRooms = {
  authorId: string;
  countQuestions: string;
  countResponses: boolean;
  endedAt: Date;
  roomKey: string;
  title: string;
};

const Room = ({
  authorId,
  countQuestions,
  countResponses,
  endedAt,
  roomKey,
  title,
}: DataRooms) => {
  return (
    <>
      <div className="bg-white px-5 py-4 rounded">
        <h3 className="font-bold mb-2">{title}</h3>
        <ul>
          <li>{countQuestions} perguntas</li>
          <li>{countResponses} respondidas</li>
        </ul>
        <div className="flex flex-row justify-between items-center mt-5">
          <p className="text-green-600 font-bold">Sala aberta</p>
          <Link
            to={`/admin/rooms/${roomKey}`}
            className="bg-blue-700 text-white py-2 px-3 rounded-lg hover:bg-blue-800 transition delay-75 duration-150"
          >
            Entrar
          </Link>
        </div>
      </div>
    </>
  );
};

export default Room;

/**
 * <div className="bg-gray-200 px-5 py-4 rounded">
        <h3 className="font-bold mb-2">Sala com nome</h3>
        <ul>
          <li>356 perguntas</li>
          <li>45 perguntas respondidas</li>
        </ul>
        <div className="flex flex-row justify-between items-center mt-5">
          <p className="text-red-600 font-bold">Sala fechada</p>
          <button className="bg-yellow-200 py-2 px-3 rounded-lg hover:bg-yellow-300 transition delay-75 duration-150">
            Reabrir
          </button>
        </div>
      </div>
 */
