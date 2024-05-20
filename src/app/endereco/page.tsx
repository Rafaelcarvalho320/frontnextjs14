"use client";
import axios from 'axios';
import { useState,useRef} from 'react';

export default function Endereco() {
  const [formData, setFormData] = useState({
    rua: '',
    bairro: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [key, subKey] = name.split('.');
      setFormData(prevState => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          [subKey]: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dados = {
      rua: formData.rua,
      bairro: formData.bairro
    };

    axios.post('http://127.0.0.1:8000/endereco/', dados)
      .then(response => {
        console.log('Resposta do servidor:', response.data);
        alert('Obrigado! Sua mensagem foi recebida.');
      })
      .catch(error => {
        console.error('Erro ao enviar formulário:', error);
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
      });
    
    setFormData({
      rua: '',
      bairro: '',
    });
  }

   
    return (
        <div className="container mx-auto p-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <fieldset className="p-4 border border-gray-300 rounded-lg my-4 bg-grey-200">
              <legend className="bg-yellow-200 text-black px-1 rounded">Endereço:</legend>
              <div>
                <label htmlFor="rua" className="block mb-2">Rua</label>
                <input type="text"
                id="rua"
                name="rua"
                value={formData.rua}
                onChange={handleChange}
                required
                className="border p-2 w-full text-black"
                 />
              </div>
              <div>
                <label htmlFor="bairro" className="block mb-2">Bairro</label>
                <input 
                type="text"
                id="bairro"
                name="bairro"
                value={formData.bairro}
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
          className=" mt-10 container flex justify-between mb-8 hover:underline"
          onClick={()=> window.history.back()}>Voltar</button>
        </div>
      );


}
