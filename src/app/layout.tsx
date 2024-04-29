import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cadastro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="container flex justify-between mb-8">
          <div className="text-xl font-bold">Cadastro</div>
          <nav className="flex gap-5">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/about" className="hover:underline">
              Sobre
            </Link>
          </nav>
        </header>
        <main className="container max-w-[800px]">{children}</main>
      </body>
    </html>
 );
}
