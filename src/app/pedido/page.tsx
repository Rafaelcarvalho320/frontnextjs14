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
          <label htmlFor="nome" className="block mb-2">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="border p-2 w-full text-black"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border p-2 w-full text-black"
          />
        </div>

        <div>
          <label htmlFor="idade" className="block mb-2">Idade:</label>
          <input
            type="number"
            id="idade"
            name="idade"
            value={formData.idade}
            onChange={handleChange}
            required
            className="border p-2 w-full text-black"
          />
        </div>

        <div>
          <label htmlFor="endereco" className="block mb-2">Endereço:</label>
          <select
            id="endereco"
            name="enderecoId"
            value={formData.enderecoId}
            onChange={handleEnderecoChange}
            required
            className="border p-2 w-full text-black"
          >
            <option value="">Selecione um endereço</option>
            {enderecos.map(endereco => (
              <option key={endereco.id} value={endereco.id}>{endereco.rua}, {endereco.bairro}</option>
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