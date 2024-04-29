import Link from "next/link";

export default function Home() {
  return (
    <>
    <h1 className="text-xl font-bold mb-7">Realizar Cadastro:</h1>

    <div className="flex flex-col">
      <Link href="/cliente" className="hover:underline">Cliente</Link>
      <Link href="/endereco" className="hover:underline">Endeço</Link>
      <Link href="/pedido" className="hover:underline">Pedido</Link>
      <Link href="/produto" className="hover:underline">Produtos</Link>
    </div>
    </>
  );
}
