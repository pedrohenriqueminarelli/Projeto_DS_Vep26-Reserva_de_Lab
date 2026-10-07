export default function CadRecurso() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-md mx-auto mt-10 p-6 bg-red-100 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-2">Formulário de Cadastro</h2>

            <div className="font-medium mb-4">
            Insira os dados de usuario!
            </div>
    
        <form>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome completo:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="text"
                    name="nome"/>
                </label>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                E-mail para contato:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="email"
                    name="email"/>
                </label>

                <label className="block text-sm font-medium text-gray-700">
                Senha:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="text"
                    name="senha"/>
                </label>
                <label className="mt-2 block text-sm font-medium text-gray-700">
                Data de Nascimento:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="date"
                    name="nascimento"/>
                </label>
                <label className="mt-2 block text-sm font-medium text-gray-700">
                Número de celular:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="number"
                    name="numero"/>
                </label>
                <br></br>
                <button type="submit" className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200">
                Enviando Dados
                </button>
            </form>
        </div>
    </div>
  );
}