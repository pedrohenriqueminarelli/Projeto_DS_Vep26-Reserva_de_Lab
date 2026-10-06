<div className="min-h-screen flex items-center justify-center bg-white">
    <div className="max-w-md mx-auto mt-10 p-6 bg-red-100 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-2">Formulário de Contato</h2>

        <div className="font-medium mb-4">
          Obrigado por entrar em contato!
        </div>
  
      <form>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome completo:
            <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                type="text"
                name="nome"/>
            </label>

            <label className="block text-sm font-medium text-gray-700 mb-2">
            Capacidade:
            <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                type="text"
                name="email"/>
            </label>

            <label className="block text-sm font-medium text-gray-700">
            Deixe sua mensagem:
            <textarea className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                name="mensagem"/>
            </label>
            <br></br>
            <button type="submit" className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200">
            Enviando Dados
            </button>
        </form>
    </div>
</div>