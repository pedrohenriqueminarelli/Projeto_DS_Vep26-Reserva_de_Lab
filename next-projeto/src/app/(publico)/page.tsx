export default function Home() {
  return (
    <div>
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1>
              A Reserva de selas e laboratório nunca foi tão fácil!
          </h1>
          <p>Reserve seu laboratório e consulte reservasa de onde quer que você esteja.</p>
          <p>Espaço reservado para fotos dos laboratórios e salas </p>
          <h2>Funcionamento</h2>
          <h3>Por onde começar?</h3>
          <ol>
            <li>Faça seu cadastro - Coloque suas informações.</li>
            <li>Faça o login - Para ter acesso as funcionalidades.</li>
          </ol>
          <h3>O que você pode fazer?</h3>
          <ul>
            <li>Home - Local onde fica as intruções e informações, caso você queira consultar novamente!</li>
            <li>Minhas reservas - Consulte todas as suas reservas em um lugar só de forma prática e rápida.</li>
            <li>Reservar - Faça a reserva de um laboratório ou sala, basta preencher as informações necessárias.</li>
            <li>Cadastro de um novo recurso - Um novo recurso, é uma nova sala ou laboratório disponível para uso de todos. Essa funcionalidade só pode ser utilizada por pessoas autorizadas!</li>
            <li>Sair - Saia da sua conta, caso queira usar uma outra conta.</li>
          </ul>
          </div>
        </main>
    </div>
  );
}
