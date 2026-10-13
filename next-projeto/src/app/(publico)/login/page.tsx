import styles from ".login.module.css";
export default function Login(){
     return (
    <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="max-w-md mx-auto mt-10 p-6 bg-red-100 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-2">Faça o seu Login</h2>

            <div className="font-medium mb-4">
            Insira os seu dados!
            </div>
    
        <form>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Email:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="email"
                    name="email"/>
                </label>

                <label className="block text-sm font-medium text-gray-700">
                Senha:
                <input className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:bg-red-400 bg-red-100 transition duration-200"
                    type="password"
                    name="senha"/>
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