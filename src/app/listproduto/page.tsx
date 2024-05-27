"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Produtos(){
    const [produto, setProdutos] = useState([]);

    useEffect(() =>{
        axios.get('http://127.0.0.1:8000/produtos/')
          .then(response => {
            console.log('Nome dos Produtos:', response.data);
            setProdutos(response.data);
          })
          .catch(error => console.error('Erro ao recuperar produtos:', error));
    }, []);
    return (
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Endereços</h5>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {produto.length > 0 ? (
                produto.map(produtos => {
                  console.log('Produtos:', produtos);
                  return (
                    <li key={produtos.id} className="py-3 sm:py-4">
                      <div className="flex items-center">
                        <div className="inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
                          <span className="mr-2">ID:</span>
                          {produtos.id}
                        </div>
                        <div className="flex-1 min-w-0 ml-4">
                          <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                             {produtos.nome}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            Marca: {produtos.marca}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            Valor: R$ {produtos.valor}
                           </p>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <p>Nenhum Endereço encontrado.</p>
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