import { Box, Typography, Button} from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box display="flex" justifyContent="space-between">
      <Box sx={{
          width: "md",
          borderRadius: 16,
          bgcolor: '2px solid gray',
        }} >
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Realizar Cadastro:
        </Typography>

        <Box display="flex" flexDirection="column">
          <Button variant="outlined" component={Link} href="/cliente">
            Cliente
          </Button>
          <Button variant="outlined" component={Link} href="/endereco">
            Endereço
          </Button>
          <Button variant="outlined" component={Link} href="/pedido">
            Pedido
          </Button>
          <Button variant="outlined" component={Link} href="/produto">
            Produtos
          </Button>
        </Box>
      </Box>

      <Box sx={{
          width: "md",
          borderRadius: 16,
          bgcolor: '2px solid gray',
        }} >
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          Ver Lista:
        </Typography>

        <Box display="flex" flexDirection="column">
          <Button variant="outlined" component={Link} href="/listcliente" className="hover:underline">
            Clientes
          </Button>
          <Button variant="outlined" component={Link} href="/listendereco" className="hover:underline">
            Endereço
          </Button>
          <Button variant="outlined" component={Link} href="/listpedido" className="hover:underline">
            Pedidos
          </Button>
          <Button variant="outlined" component={Link} href="/listproduto" className="hover:underline">
            Produtos
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
