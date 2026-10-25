import styles from "../styles/corpo.module.css"

export default function Home() {
  return (
    <div>
      <main className={styles.corpo}>
        <div>
          <h1 className={styles.h1}>
              A Reserva de salas e laboratórios nunca foi tão fácil !
          </h1>
          <p>Reserve seu laboratório e consulte reservas de onde quer que você esteja !</p>
          <h3 className={styles.h3}>Por onde começar?</h3>
          <ol>
            <li>Faça seu cadastro - Coloque suas informações.</li>
            <li>Faça o login - Para ter acesso as funcionalidades.</li>
          </ol>
          <h3 className={styles.h3}>O que você pode fazer?</h3>
          <ul>
            <li><span className={styles.span}>Home -</span> Local onde fica as intruções e informações, caso você queira consultar novamente!</li>
            <hr className={styles.hr} />
            <li><span className={styles.span}>Reservas -</span> Mostra todas as reservas que foram feitas e os status dos laboratório no momento.</li>
            <hr className={styles.hr} />
            <li><span className={styles.span}>Minhas reservas -</span> Consulte todas as suas reservas em um lugar só de forma prática e rápida.</li>
            <hr className={styles.hr} />
            <li><span className={styles.span}>Reservar -</span> Faça a reserva de um laboratório ou sala, basta preencher as informações necessárias.</li>
            <hr className={styles.hr} />
            <li><span className={styles.span}>Cadastro de um novo recurso -</span> Um novo recurso, é uma nova sala ou laboratório disponível para uso de todos. Essa funcionalidade só pode ser utilizada por pessoas autorizadas!</li>
            <hr className={styles.hr} />
            <li><span className={styles.span}>Sair -</span> Saia da sua conta, caso queira usar uma outra conta.</li>
          </ul>
          </div>
        </main>
    </div>
    );
}