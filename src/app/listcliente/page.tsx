"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [enderecos, setEnderecos] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/cliente/')
      .then(response => {
        console.log('Dados dos clientes:', response.data);
        setClientes(response.data);
      })
      .catch(error => console.error('Erro ao recuperar clientes:', error));
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/endereco/')
      .then(response => {
        console.log('Dados dos endereços:', response.data);
        setEnderecos(response.data);
      })
      .catch(error => console.error('Erro ao recuperar endereços:', error));
  }, []);

  const getEndereco = (enderecoId) => {
    const endereco = enderecos.find(endereco => endereco.id === enderecoId);
    console.log(`Procurando endereço para ID: ${enderecoId}`, endereco);
    return endereco ? `${endereco.rua}, ${endereco.bairro}` : 'Endereço não encontrado';
  };

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Clientes</h5>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
          {clientes.length > 0 ? (
            clientes.map(cliente => {
              console.log('Cliente:', cliente);
              return (
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
                        Email: {cliente.email}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        Idade: {cliente.idade} anos
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        Endereço: {getEndereco(cliente.endereco)}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <p>Nenhum cliente encontrado.</p>
          )}
        </ul>
      </div>
      <button
        type="button"
        className="container flex mt-12 justify-between mb-8 hover:underline"
        onClick={() => window.history.back()}>
          Voltar
      </button>
    </div>
  );
}
