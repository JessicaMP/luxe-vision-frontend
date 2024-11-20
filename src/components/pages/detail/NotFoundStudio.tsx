const NotFoundStudio = () => {
  return (
    <div className="min-h-[74svh] w-fullbg-[#1C1C1C] flex flex-col justify-center items-center px-4">
      <div className="max-w-lg w-full bg-[#242424] rounded-lg shadow-xl p-8 text-center">
        <h1 className="text-8xl font-bold bg-gradient-to-r from-[#FF3B30] to-[#FF6B6B] text-transparent bg-clip-text mb-4">
          404
        </h1>

        <div className="mb-4">
          <svg
            className="w-20 h-20 text-[#FF3B30] mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          ¡Oops! Estudio no encontrado
        </h2>

        <p className="text-gray-400 mb-8">
          Lo sentimos, pero no pudimos encontrar el estudio que estás buscando.
          Por favor, verifica la dirección o intenta con una búsqueda diferente.
        </p>

        <button
          onClick={() => window.history.back()}
          className="bg-[#FF3B30] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#FF6B6B] transition-colors duration-300"
        >
          Volver atrás
        </button>
      </div>
    </div>
  );
};

export default NotFoundStudio;
