import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import Button from "../../components/Button";
import { AuthContext } from "../../contexts/AuthContext";
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

    history.push(`${firebaseRoom.key}`);
  }

  return (
    <div className="flex items-stretch h-screen">
      <aside
        className="flex-7 bg-p-purple text-p-white flex-col justify-center 
        py-28 px-20
  "
      >
        <img
          className="max-w-xs"
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong className="font-bold text-4xl font-display leading-10 mt-4">
          Crie salas de perguntas ao vivo
        </strong>
        <p className="text-2xl leading-8 mt-4 text-p-white">
          Tire as duvidas de sua audiencia em tempo real
        </p>
      </aside>
      <main className="flex-8 flex px-8 items-center justify-center">
        <div className="flex flex-col w-full max-w-xs items-stretch text-center">
          <img src={logoImg} alt="Letmeask" className="self-center" />
          <h2 className="text-2xl mt-16 mb-6 font-display">
            Criar uma nova sala
          </h2>
          <form onSubmit={handleCreateRoom}>
            <input
              className="h-12 rounded-lg w-full px-4 bg-white border-2 border-p-gray"
              type="text"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
              placeholder="Nome da sala"
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p className="text-sm text-p-gray-dark mt-4">
            Quer entrar em uma sala existente?{" "}
            <Link to="/" className="text-p-pink-dark">
              clique aqui
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default NewRoom;
