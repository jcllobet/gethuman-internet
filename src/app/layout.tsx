import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar from "./components/Header/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebAuthn Passwordless authentication",
  description: "Demo of passwordless authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
