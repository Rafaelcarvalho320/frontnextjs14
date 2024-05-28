"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [enderecos, setEnderecos] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/cliente/')
      .then(response => {
        console.log('Dados dos clientes:', response.data);
        setClientes(response.data);
      })
      .catch(error => console.error('Erro ao recuperar clientes:', error));
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/endereco/')
      .then(response => {
        console.log('Dados dos endereços:', response.data);
        setEnderecos(response.data);
      })
      .catch(error => console.error('Erro ao recuperar endereços:', error));
  }, []);

  const getEndereco = (enderecoId) => {
    const endereco = enderecos.find(endereco => endereco.id === enderecoId);
    console.log(`Procurando endereço para ID: ${enderecoId}`, endereco);
    return endereco ? `${endereco.rua}, ${endereco.bairro}` : 'Endereço não encontrado';
  };

  return (
    <Box sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}>
      <Typography variant="h5" mb={4} fontWeight="bold" color="text.primary">Clientes</Typography>
      <List>
        {clientes.length > 0 ? (
          clientes.map(cliente => (
            <ListItem key={cliente.id} alignItems="flex-start" divider>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6" component="span" color="text.primary">{cliente.nome}</Typography>}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">ID: {cliente.id}</Typography>
                    <Typography variant="body2" color="text.secondary">Email: {cliente.email}</Typography>
                    <Typography variant="body2" color="text.secondary">Idade: {cliente.idade} anos</Typography>
                    <Typography variant="body2" color="text.secondary">Endereço: {getEndereco(cliente.endereco)}</Typography>
                  </>
                }
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">Nenhum cliente encontrado.</Typography>
        )}
      </List>
      <Button variant="outlined" onClick={() => window.history.back()}>
            Voltar
          </Button>
    </Box>
  );
}
