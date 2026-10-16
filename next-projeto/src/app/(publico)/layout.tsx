import { HeaderPublico } from "./componentesPublicos/HeaderPublico";
export default function LayoutPrivado({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderPublico/>
      {children}
    </>
  );
}