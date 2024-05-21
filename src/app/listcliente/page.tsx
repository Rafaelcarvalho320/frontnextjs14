"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/cliente/')
      .then(response => {
        console.log('Dados dos clientes:', response.data);
        setClientes(response.data);
      })
      .catch(error => console.error('Erro ao recuperar clientes:', error));
  }, []);

  return (
    <div className="w-full max-width: 50rem; p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Clientes</h5>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {clientes.map(cliente => (
            <li key={cliente.id} className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                  <span className="mr-2">ID:</span>
                  {cliente.id}
                </div>
                <div className="flex-1 min-w-0 ml-4">
                  <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                    {cliente.nome}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {cliente.email}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {cliente.idade} anos
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    Endereço ID: {cliente.endereco} 
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
  
}
