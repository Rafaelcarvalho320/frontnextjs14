"use client";
import axios from 'axios';
import { useState } from 'react';

export default function Produto() {
  const [formData, setFormData] = useState({
    nome: '',
    marca: '',
    valor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dados = {
      nome: formData.nome,
      marca: formData.marca,
      valor: formData.valor
    };

    axios.post('http://127.0.0.1:8000/produtos/', dados)
      .then(response => {
        console.log('Resposta do servidor:', response.data);
        alert('Obrigado! Seu produto foi registrado.');
      })
      .catch(error => {
        console.error('Erro ao enviar formulário:', error);
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
      });

    setFormData({
      nome: '',
      marca: '',
      valor: '',
    });
  }

  return (
    <div className="container mx-auto p-5">
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="p-4 border border-gray-300 rounded-lg my-4 bg-grey-200">
          <legend className="bg-yellow-200 text-black px-1 rounded">Produto:</legend>
          <div>
            <label htmlFor="nome" className="block mb-2">Nome</label>
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
            <label htmlFor="marca" className="block mb-2">Marca</label>
            <input
              type="text"
              id="marca"
              name="marca"
              value={formData.marca}
              onChange={handleChange}
              required
              className="border p-2 w-full text-black"
            />
          </div>
          <div>
            <label htmlFor="valor" className="block mb-2">Valor</label>
            <input
              type="text"
              id="valor"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
            required
            className="border p-2 w-full text-black"
          />
        </div>
        </fieldset>

        <button type="submit" className="bg-blue-500 text-white p-2 w-full hover:underline">Enviar</button>
      </form>
      <button
        type="button"
        className="mt-10 container flex justify-between mb-8 hover:underline"
        onClick={() => window.history.back()}
      >
        Voltar
      </button>
    </div>

		  );
}
