"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Pedido(){
  const [formData, setFormData] = useState({
    clienteID: '',
    valores: '',
    data: '',
    produtosID: '',
  });
  const [clientes, setClientes] = useState([]);
  const [Produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/cliente/')
      .then(response => {
        console.log('Dados dos clientes:', response.data);
        setClientes(response.data);
      })
      .catch(error => console.error('Erro ao recuperar endereços:', error));
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/produtos/')
      .then(response => {
        console.log('Dados dos Produtos:', response.data);
        setProdutos(response.data);
      })
      .catch(error => console.error('Erro ao recuperar produtos:', error));
  }, []);

  const handleChange = (e) => {
    const {name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleClienteChange = (e) =>{
    const clienteID = e.target.value;
    const clienteSelecionado = clientes.find(cliente_id => cliente_id.id === parseInt(clienteID));
    console.log('Cliente Selecionado:', clienteSelecionado);
    setFormData(prevState => ({
      ...prevState,
      clienteID: clienteID
    }));
  };

  const handleProdutosChange = (e) =>{
    const produtosID = e.target.value;
    const produtosSelecionado = Produtos.find(produtos_id => produtos_id.id === parseInt(produtosID));
    console.log('Produto Selecionado:', produtosSelecionado);
    setFormData(prevState => ({
      ...prevState,
      produtosID: produtosID
    }));
  };

  const handleSubmit = (e) =>{
    e.preventDefault();

    const dados = {
      cliente_id: formData.clienteID,
      valores: formData.valores,
      data: formData.data,
      produtos_id: formData.produtosID 
    };

    axios.post('http://127.0.0.1:8000/pedido/', dados)
     .then(response => {
      console.log('Resposta do servidor:', response.data);
      alert('Obrigado! Sua mensagem foi recebida.');
     })
     .catch(error => {
      console.error('Erro ao enviar formulário:', error);
      alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
     });

    setFormData({
      clienteID: '',
      valores: '',
      data: '',
      produtosID: '',
    });
  };

  return (
    <div className="container mx-auto p-5">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="clienteID" className="block mb-2">Cliente ID:</label>
          <select
            id="clienteID"
            name="clienteID"
            value={formData.clienteID}
            onChange={handleClienteChange}
            required
            className="border p-2 w-full text-black"
          >
            <option value="">Selecione um cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
            ))}
          </select>
        </div>
  
        <div>
          <label htmlFor="valores" className="block mb-2">Valores:</label>
          <input
            type="text"
            id="valores"
            name="valores"
            value={formData.valores}
            onChange={handleChange}
            required
            className="border p-2 w-full text-black"
          />
        </div>
  
        <div>
          <label htmlFor="data" className="block mb-2">Data:</label>
          <input
            type="date"
            id="data"
            name="data"
            value={formData.data}
            onChange={handleChange}
            required
            className="border p-2 w-full text-black"
          />
        </div>
  
        <div>
          <label htmlFor="produtosID" className="block mb-2">Produtos ID:</label>
          <select
            id="produtosID"
            name="produtosID"
            value={formData.produtosID}
            onChange={handleProdutosChange}
            required
            className="border p-2 w-full text-black"
          >
            <option value="">Selecione um produto</option>
            {Produtos.map(produto => (
              <option key={produto.id} value={produto.id}>{produto.nome}</option>
            ))}
          </select>
        </div>
  
        <button type="submit" className="bg-blue-500 text-white p-2 w-full hover:underline">Enviar</button>
      </form>
      <button
        type="button"
        className="container flex mt-12 justify-between mb-8 hover:underline"
        onClick={() => window.history.back()}
      >
        Voltar
      </button>
    </div>
  );
}