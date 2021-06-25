import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

const NewRoom = () => {
  const { user } = useAuth();
  const [newRoom, setNewRoom] = useState("");
  const history = useHistory();

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

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <div className="md:flex lg:flex-row sm:flex-col items-center h-screen">
      <aside
        className="flex-7 sm:py-14 bg-blue-700 md:h-full flex flex-col items-center text-p-white justify-around 
        py-8 px-10
      "
      >
        <div>
          <img
            className="sm:max-w-xs 2xl:max-w-full 2xl:mt-24 mb-5"
            src={illustrationImg}
            alt="Ilustração simbolizando perguntas e respostas"
          />
          <div className="flex flex-col">
            <strong className="font-bold text-4xl font-display leading-10 mt-4">
              Crie salas de perguntas ao vivo
            </strong>
            <p className="text-2xl leading-8 mt-4 text-p-white">
              Seus alunos ficarão impressionados! :)
            </p>
          </div>
        </div>
      </aside>
      <main className="flex-8 flex px-8 items-center justify-center pb-10 pt-5">
        <div className="flex flex-col w-full max-w-xs items-stretch text-center">
          <img src={logoImg} alt="Letmeask" className="self-center" />
          <h2 className="text-2xl mt-16 mb-6 font-display">
            Criar uma nova sala
          </h2>
          <form className="flex flex-col gap-3" onSubmit={handleCreateRoom}>
            <input
              className="h-12 rounded-lg w-full px-4 bg-white border-2 
              border-p-gray focus:outline-none transition duration-150 focus:ring-2 
              focus:border-transparent focus:ring-blue-400"
              type="text"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
              placeholder="Nome da sala"
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p className="text-sm text-p-gray-dark mt-4">
            Quer entrar em uma sala existente?{" "}
            <Link
              to="/"
              className="text-indigo-500 hover:text-indigo-600 transition duration-150"
            >
              clique aqui
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default NewRoom;
