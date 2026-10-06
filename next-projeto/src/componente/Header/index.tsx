import Link from "next/link";

export function Header(){
    return (
    <header className="flex px-2 py-4 bg-red-900 text-white">
      <div className="flex items-center justify-between w-full mx-auto max-w-3xl">
        <div className="flex px-2 py-4 text-white">
          <h1 className="text-center font-bold m-2 text-2xl">
            Reserva de Recursos
          </h1>
        </div>
      </div>
      <nav>
        <ul className="flex items-center justify-center gap-10 px-2 py-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/cadRecurso">Cadastrar Recurso</Link>
          </li>
          <li>
            <Link href="/cadUsuario">Cadastrar Usuario</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}