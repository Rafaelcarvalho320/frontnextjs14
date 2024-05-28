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

export default function Cliente() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    idade: '',
    enderecoId: '',
    rua: '',
    bairro: '',
  });
  const [enderecos, setEnderecos] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/endereco/')
      .then(response => {
        console.log('Dados dos endereços:', response.data);
        setEnderecos(response.data);
      })
      .catch(error => console.error('Erro ao recuperar endereços:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEnderecoChange = (e) => {
    const enderecoId = e.target.value;
    const enderecoSelecionado = enderecos.find(endereco => endereco.id === parseInt(enderecoId));
    console.log('Endereço selecionado:', enderecoSelecionado);
    setFormData(prevState => ({
      ...prevState,
      enderecoId: enderecoId,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dados = {
      nome: formData.nome,
      email: formData.email,
      idade: formData.idade,
      endereco: formData.enderecoId 
    };

    axios.post('http://127.0.0.1:8000/cliente/', dados)
      .then(response => {
        console.log('Resposta do servidor:', response.data);
        alert('Obrigado! Sua mensagem foi recebida.');
      })
      .catch(error => {
        console.error('Erro ao enviar formulário:', error);
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
      });

    setFormData({
      nome: '',
      email: '',
      idade: '',
      enderecoId: '',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}>
      <FormControl fullWidth>
        <TextField
          label="Nome"
          id="nome"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Idade"
          type="number"
          id="idade"
          name="idade"
          value={formData.idade}
          onChange={handleChange}
          required
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="endereco-label">Endereço</InputLabel>
          <Select
            labelId="endereco-label"
            id="endereco"
            name="enderecoId"
            value={formData.enderecoId}
            onChange={handleEnderecoChange}
            required
          >
            <MenuItem value="">
              <em>Selecione um endereço</em>
            </MenuItem>
            {enderecos.map(endereco => (
              <MenuItem key={endereco.id} value={endereco.id}>
                {endereco.rua}, {endereco.bairro}
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
