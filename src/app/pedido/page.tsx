"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Checkbox, ListItemText } from '@mui/material';

export default function Pedido() {
  const [formData, setFormData] = useState({
    clienteID: '',
    valores: '',
    data: '',
    produtosID: [], 
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
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleClienteChange = (e) => {
    const clienteID = e.target.value;
    const clienteSelecionado = clientes.find(cliente => cliente.id === parseInt(clienteID));
    console.log('Cliente Selecionado:', clienteSelecionado);
    setFormData(prevState => ({
      ...prevState,
      clienteID: clienteID
    }));
  };

  const handleProdutosChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      produtosID: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleSubmit = (e) => {
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
      produtosID: [],
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}>
      <FormControl fullWidth>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="clienteID-label">Cliente</InputLabel>
          <Select
            labelId="clienteID-label"
            id="clienteID"
            name="clienteID"
            value={formData.clienteID}
            onChange={handleClienteChange}
            required
          >
            <MenuItem value="">
              <em>Selecione um Cliente</em>
            </MenuItem>
            {clientes.length > 0 ? (
              clientes.map(cliente => (
                <MenuItem key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Carregando clientes...</MenuItem>
            )}
          </Select>
        </FormControl>
        <TextField
          label="Valores"
          type="number"
          id="valores"
          name="valores"
          value={formData.valores}
          onChange={handleChange}
          required
        />
        <TextField
          label="Data"
          type="date"
          id="data"
          name="data"
          value={formData.data}
          onChange={handleChange}
          required
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="produtosID-label">Produtos</InputLabel>
          <Select
            labelId="produtosID-label"
            id="produtosID"
            multiple
            value={formData.produtosID}
            onChange={handleProdutosChange}
            renderValue={(selected) => selected.join(', ')}
          >
              {Produtos.map(produto => (
                <MenuItem key={produto.id} value={produto.id}>
                  <Checkbox checked={formData.produtosID.indexOf(produto.id) > -1}/>
                  <ListItemText primary={`${produto.nome} - ${produto.marca} - ${produto.valor}`} />
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Stack direction="row" spacing={6} sx={{ m: 2 }}>
          <Button variant="contained" type="submit" endIcon={<SendIcon />}>
            Enviar
          </Button>
          <Button variant="outlined" onClick={() => window.history.back()}>
            Voltar
          </Button>
        </Stack>
      </FormControl>
    </Box>
  );
}
