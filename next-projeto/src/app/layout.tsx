import "./globals.css";
import { Header } from "../componente/Header";

export default function RootLayout(
  { children }: LayoutProps<"/">) {
  return (
    <html>
      <body>
        <Header/>

        {children}
      </body>
    </html>
  );
}