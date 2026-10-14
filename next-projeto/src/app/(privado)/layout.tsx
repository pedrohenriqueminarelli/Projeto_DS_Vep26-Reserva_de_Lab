import { Header } from "./componentesPrivados/Header";

export default function LayoutPrivado({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}