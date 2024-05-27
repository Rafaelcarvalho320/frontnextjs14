import Link from "next/link";

export default function Home() {
  return (
    <>
  <>
  <div className="flex justify-between">
    <div className="max-w-md p-6 border border-gray-300 rounded-lg shadow-lg border-2 rounded-3xl mr-4">
      <h1 className="text-4xl font-bold text-center mb-7">Realizar Cadastro:</h1>

      <div className="flex flex-col space-y-4">
        <Link href="/cliente" className="hover:underline">Cliente</Link>
        <Link href="/endereco" className="hover:underline">Endereço</Link>
        <Link href="/pedido" className="hover:underline">Pedido</Link>
        <Link href="/produto" className="hover:underline">Produtos</Link>
      </div>
    </div>

    <div className="max-w-md p-6 border border-gray-300 rounded-lg shadow-lg border-2 rounded-3xl ml-4">
      <h1 className="text-4xl font-bold text-center mb-7">Ver Lista:</h1>

      <div className="flex flex-col space-y-4">
        <Link href="/listcliente" className="hover:underline">Clientes</Link>
        <Link href="/listendereco" className="hover:underline">Endereço</Link>
        <Link href="/listpedido" className="hover:underline">Pedidos</Link>
        <Link href="/listproduto" className="hover:underline">Produtos</Link>
      </div>
    </div>
  </div>
</>


</>

  );
}
