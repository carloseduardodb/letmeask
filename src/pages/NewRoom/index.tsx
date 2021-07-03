import { FormEvent, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import Button from "../../components/All/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import Room from "../../components/All/Room";
import useMyRooms from "../../hooks/useMyRooms";
import ButtonTheme from "../../components/All/ButtonTheme";
import VoidImage from "./../../assets/images/void-page.svg";

const NewRoom = () => {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState("");
  const history = useHistory();
  const { dataRooms } = useMyRooms();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    const userRoomRef = database.ref(`users/${user?.id}/${firebaseRoom.key}`);

    await userRoomRef.update({
      title: newRoom,
      authorId: user?.id,
      roomKey: firebaseRoom.key,
      countResponses: 0,
      countQuestions: 0,
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <>
      {user ? (
        <div className="md:flex lg:flex-row sm:flex-col items-center h-screen">
          <ButtonTheme />
          <aside className="py-8 px-10 text-center">
            <div>
              <img
                className="sm:max-w-xs 2xl:max-w-full lg:flex hidden"
                src={logo}
                alt="Ilustração simbolizando perguntas e respostas"
              />
              <div className="flex flex-col">
                <p className="text-lg leading-8 hidden text-p-black">
                  Proporcionando comunicações inteligentes
                </p>
              </div>
            </div>
            <p className="text-sm text-p-gray-dark">
              Quer entrar em uma sala existente?{" "}
              <Link
                to="/"
                className="text-indigo-500 hover:text-indigo-600 transition duration-150"
              >
                clique aqui
              </Link>
            </p>
          </aside>
          <main className="flex-8 flex-col h-screen py-5 dark:bg-gray-900 w-screen">
            <div
              style={{ height: "max-content" }}
              className="flex flex-row justify-center text-center px-5 py-8 h-auto rounded w-12/12"
            >
              <div className="text-left lg:w-8/12 w-11/12">
                <h1 className="font-display text-2xl my-2 dark:text-p-white text-p-black font-semibold mb-5">
                  Criar uma nova sala
                </h1>
                <form
                  className="flex flex-row gap-3 relative"
                  onSubmit={handleCreateRoom}
                >
                  <input
                    className="h-12 rounded-lg w-full px-4 bg-white border-2 
              border-p-gray focus:outline-none transition duration-150 focus:ring-2 
              focus:border-transparent focus:ring-blue-400"
                    type="text"
                    onChange={(event) => setNewRoom(event.target.value)}
                    value={newRoom}
                    placeholder="Nome da sala"
                  />
                  <Button
                    type="submit"
                    className="w-max p-5 absolute -mt-4 -right-5 bg-blue-600 
                rounded-full hover:bg-blue-700 transition-all delay-75 
                duration-100"
                  >
                    <FiPlus size={40} color="white" />
                  </Button>
                </form>
              </div>
            </div>
            <section className="flex flex-col items-center">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 my-5 w-10/12">
                {dataRooms.map((dataRoom) => (
                  <Room
                    authorId={dataRoom.authorId}
                    countQuestions={dataRoom.countQuestions}
                    countResponses={dataRoom.countResponses}
                    endedAt={dataRoom.endedAt}
                    key={dataRoom.roomKey}
                    roomKey={dataRoom.roomKey}
                    title={dataRoom.title}
                  />
                ))}
              </div>
            </section>
          </main>
        </div>
      ) : (
        <div className="flex flex-col my-20 gap-y-9 items-center">
          <h1 className="font-display text-2xl text-p-black font-semibold">
            Oooooooops <span className="text-red-700">acesso restrito</span>
            !
            <br />
            <Link className="text-base underline text-purple-900" to="/">
              Faça o login
            </Link>
          </h1>
          <img src={VoidImage} width={550} alt="Vazio" />
        </div>
      )}
    </>
  );
};

export default NewRoom;
