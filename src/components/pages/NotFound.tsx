const NotFound = () => {
  return (
    <div className="min-h-[90svh] flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-[#D05858] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Página no encontrada
        </h2>
        <p className="text-gray-600 mb-8">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-[#D05858] text-white rounded-lg hover:bg-[#b94444] transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
