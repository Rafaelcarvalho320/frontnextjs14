"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, Button, ListItemIcon } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/produtos/')
      .then(response => {
        console.log('Dados dos produtos:', response.data);
        setProdutos(response.data);
      })
      .catch(error => console.error('Erro ao recuperar produtos:', error));
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={4} fontWeight="bold" color="text.primary">Produtos</Typography>
      <List>
        {produtos.length > 0 ? (
          produtos.map(produto => (
            <ListItem key={produto.id} alignItems="flex-start" divider>
              <ListItemIcon>
              <ProductionQuantityLimitsIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6" component="span" color="text.primary">ID: {produto.id}</Typography>}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">Nome: {produto.nome}</Typography>
                    <Typography variant="body2" color="text.secondary">Marca: {produto.marca}</Typography>
                    <Typography variant="body2" color="text.secondary">Valor: R$ {produto.valor}</Typography>
                  </>
                }
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">Nenhum produto encontrado.</Typography>
        )}
      </List>
      <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => window.history.back()}>Voltar</Button>
    </Box>
  );
}
