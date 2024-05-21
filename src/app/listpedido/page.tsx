"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/pedido/')
      .then(response => {
        console.log('Dados dos pedidos:', response.data);
        setPedidos(response.data);
      })
      .catch(error => console.error('Erro ao recuperar pedidos:', error));
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/cliente/')
      .then(response => {
        console.log('Dados dos clientes:', response.data);
        setClientes(response.data);
      })
      .catch(error => console.error('Erro ao recuperar clientes:', error));
  }, []);

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Todos os Pedidos</h5>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {pedidos.length > 0 ? (
            pedidos.map(pedido => (
              <li key={pedido.id} className="py-3 sm:py-4">
                <div className="flex items-center">
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    <span className="mr-2">ID:</span>
                    {pedido.id}
                  </div>
                  <div className="flex-1 min-w-0 ml-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Cliente: {pedido.cliente_id}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Valores: {pedido.valores}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Data: {pedido.data}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Produtos ID: {pedido.produtos_id.join(', ')}
                    </p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>Nenhum pedido encontrado.</p>
          )}
        </ul>
      </div>
    </div>
  );
  
}
