"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText, Button, ListItemIcon } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChecklistIcon from '@mui/icons-material/Checklist';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/pedido/')
      .then(response => {
        console.log('Dados dos pedidos:', response.data);
        setPedidos(response.data);
      })
      .catch(error => console.error('Erro ao recuperar pedidos:', error));
  }, []);

  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/cliente/')
      .then(response => {
        console.log('Dados dos clientes:', response.data);
        setClientes(response.data);
      })
      .catch(error => console.error('Erro ao recuperar clientes:', error));
  }, []);
  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/produtos/')
      .then(response  => {
        console.log('Produtos encontrados:', response.data);
        setProdutos(response.data);
      })
      .catch(error => console.error('Erro ao recuperar produtos:', error));
  }, []);

  const getClienteNome = (clienteId) => {
    const cliente = clientes.find(cliente => cliente.id === clienteId);
    return cliente ? cliente.nome : 'Cliente não encontrado';
  };
  const getProdutoNome = (produtoIds: number[]) => {
    if (!Array.isArray(produtoIds)) {
      return 'Nenhum produto encontrado';
    }
    return produtoIds.map(produtoId => {
      const produto = produtos.find(produto => produto.id === produtoId);
      return produto ? produto.nome : 'Produto não encontrado';
    }).join(', ');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" mb={4} fontWeight="bold" color="text.primary">Todos os Pedidos</Typography>
      <List>
        {pedidos.length > 0 ? (
          pedidos.map(pedido => (
            <ListItem key={pedido.id} alignItems="flex-start" divider>
              <ListItemIcon>
              <ChecklistIcon />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6" component="span" color="text.primary">ID: {pedido.id}</Typography>}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">Cliente: {getClienteNome(pedido.cliente_id)}</Typography>
                    <Typography variant="body2" color="text.secondary">Valor: R$ {pedido.valores}</Typography>
                    <Typography variant="body2" color="text.secondary">Data: {pedido.data}</Typography>
                    <Typography variant="body2" color="text.secondary">Produto(s): {getProdutoNome(pedido.produtos_id)}</Typography>
                  </>
                }
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">Nenhum pedido encontrado.</Typography>
        )}
      </List>
      <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => window.history.back()}>Voltar</Button>
    </Box>
  );
}
