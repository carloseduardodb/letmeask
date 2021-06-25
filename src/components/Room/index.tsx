const Room = () => {
  return (
    <>
      <div className="bg-white px-5 py-4 rounded">
        <h3 className="font-bold mb-2">Sala com nome</h3>
        <ul>
          <li>356 perguntas</li>
          <li>45 respondidas</li>
        </ul>
        <div className="flex flex-row justify-between items-center mt-5">
          <p className="text-green-600 font-bold">Sala aberta</p>
          <button className="bg-blue-700 text-white py-2 px-3 rounded-lg hover:bg-blue-800 transition delay-75 duration-150">
            Entrar
          </button>
        </div>
      </div>
      <div className="bg-gray-200 px-5 py-4 rounded">
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
    </>
  );
};

export default Room;
