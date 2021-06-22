import { useHistory } from "react-router-dom";

import illustrationImg from "../../assets/images/illustration.svg";
import logoImg from "../../assets/images/logo.svg";
import googleIconImg from "../../assets/images/google-icon.svg";

import Button from "../../components/Button";

import "./styles.css";
import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();

  async function handleCreateRoom() {
    !user ? await signInWithGoogle() : history.push("/rooms/new");
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
          <button
            onClick={handleCreateRoom}
            className="mt-16 h-14 rounded-lg font-medium bg-red-500 hover:bg-red-600 transition-colors delay-75 text-white flex justify-center items-center cursor-pointer border-0"
          >
            <img src={googleIconImg} alt="Icone do google" className="mr-2" />
            Crie sua sala com o Google
          </button>
          <div className="text-sm text-p-gray my-8 flex items-center or-entry">
            ou entre em uma sala
          </div>
          <form action="">
            <input
              className="h-12 rounded-lg w-full px-4 bg-white border-2 border-p-gray"
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Home;
