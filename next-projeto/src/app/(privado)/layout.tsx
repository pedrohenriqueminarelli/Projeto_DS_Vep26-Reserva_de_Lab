import { Header } from "../../componente/Header";

export default function LayoutPrivado({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}