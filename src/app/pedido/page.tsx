"use client";
import { useState, useEffect} from 'react';
import axios from 'axios';

export default function Pedido() {
    const [formData, setFormData]= useState({
        cliente_id: '',
        valores: '',
        data: '',
        produtos_id: '',
    });
    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/cliente/')
          .then(response => {
            console.log('Dados dos endereços:', response.data);
            setClientes(response.data);
          })
          .catch(error => console.error('Erro ao recuperar endereços:', error));
      }, []);

      const [produtos, setProdutos] = useState([]);

      useEffect(() => {
          axios.get('http://127.0.0.1:8000/produtos/')
            .then(response => {
              console.log('Dados dos produtos:', response.data);
              setProdutos(response.data);
            })
            .catch(error => console.error('Erro ao recuperar endereços:', error));
        }, []);
      
      const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData(prevState =>({
            ...prevState,
            [name]:value
        }));
      };

      const handleClienteChange = (e) =>{
        const cliente_id = e.target.value
        const clienteSelecionado = clientes.find(cliente => cliente.id === parseInt(cliente_id));
        console.log('Cliente selecionado:', clienteSelecionado);
        setFormData(prevState => ({
            ...prevState,
            cliente_id: cliente_id,
        }));
      };

      const handleProdutosChange = (e) =>{
        const produtos_id = e.target.value
        const produtoSelecionado = produtos.find(produtos => produtos.id === parseInt(produtos_id));
        console.log('Pedidos selecionados:', produtoSelecionado);
        setFormData(prevState => ({
            ...prevState,
            produtos_id: produtos_id,
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();

        const dados = {
            cliente_id: formData.cliente_id,
            valores: formData.valores,
            data: formData.data,
            produtos_id: formData.produtos_id
        };
        axios.post('http://127.0.0.1:8000/pedido/')
            .then(response => {
      }
}