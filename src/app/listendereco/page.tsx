"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

export default function Enderecos() {
  const [enderecos, setEnderecos] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/endereco/')
      .then(response => {
        console.log('Dados dos endereços:', response.data);
        setEnderecos(response.data);
      })
      .catch(error => console.error('Erro ao recuperar endereços:', error));
  }, []);

  return (
    <Box sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}>
      <Typography variant="h5" mb={4} fontWeight="bold" color="text.primary">Endereços</Typography>
      <List>
        {enderecos.length > 0 ? (
          enderecos.map(endereco => (
            <ListItem key={endereco.id} alignItems="flex-start" divider>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6" component="span" color="text.primary">{endereco.rua}</Typography>}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">ID: {endereco.id}</Typography>
                    <Typography variant="body2" color="text.secondary">Bairro: {endereco.bairro}</Typography>
                  </>
                }
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">Nenhum endereço encontrado.</Typography>
        )}
      </List>
      <Button variant="outlined" onClick={() => window.history.back()}>
        Voltar
      </Button>
    </Box>
  );
}