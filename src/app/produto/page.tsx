"use client";
import axios from 'axios';
import { useState } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

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
          label="Marca"
          id="marca"
          name="marca"
          value={formData.marca}
          onChange={handleChange}
          required
        />
        <TextField
          label="Valor"
          type="number"
          id="valor"
          name="valor"
          value={formData.valor}
          onChange={handleChange}
          required
        />
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
