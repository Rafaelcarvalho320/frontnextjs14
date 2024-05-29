"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

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
      <Box component="form" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}>
          <FormControl fullWidth>
        <TextField
          label="Rua"
          id="rua"
          name="rua"
          value={formData.rua}
          onChange={handleChange}
          required
        />
        <TextField
          label="Bairro"
          id="bairro"
          name="bairro"
          value={formData.bairro}
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
         