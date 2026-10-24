import Link from "next/link";
import styles from "../../../styles/header.module.css"

export function HeaderPublico(){
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
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/cadUsuario">Cadastro</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
}