import Link from "next/link";
import styles from "../../../styles/header.module.css"

export function Header(){
    return (
      <header className={styles.header}>
        <div>
          <div>
            <h1 className={styles.h1}>
              Reserva de Recursos
            </h1>
          </div>
        </div>
        <nav>
          <ul className={styles.nav}>
            <li>
              <Link href="/home">Home</Link>
            </li>
            <li>
              <Link href="/tReservas">Reservas</Link>
            </li>
            <li>
              <Link href="/mReserva">Minhas Reservas</Link>
            </li>
            <li>
              <Link href="/resRecurso">Reservar</Link>
            </li>
            <li>
              <Link href="/cadRecurso">Cadastrar Recurso</Link>
            </li>
            <li>
              <Link href="/">sair</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
}