import Link from "next/link";

export function HeaderPublico(){
    return (
    <header className="flex px-2 py-4 bg-red-900 text-white">
      <div className="flex items-center justify-between w-full mx-auto max-w-3xl">
        <div className="flex px-2 py-4 text-white">
          <h1 className="text-center font-bold m-2 text-2xl">
            Reservar uma sala ou laboratório nunca foi tão fácil
          </h1>
        </div>
      </div>
      <nav>
        <ul className="flex items-center justify-center gap-10 px-2 py-4">
          <li>
            <Link href="/login">login</Link>
          </li>
          <li>
            <Link href="/cadUsuario">Cadastro</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}