import { Inter } from "next/font/google";
import "./globals.css";
import connect from "../dbconnect";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  await connect();
  return (
    <html lang="en" className="h-full">
      <body style={{backgroundImage : "url(bg.png)", backgroundRepeat : "no-repeat", backgroundSize : "100%"}} className = "h-full">{children}</body>
    </html>
  );
}
