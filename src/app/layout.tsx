import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ReactNode } from "react";
import ThemeProvider from './ThemeProvider'; // ajuste o caminho conforme necessário
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cadastro",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Cadastro
              </Typography>
              <Button color="inherit" component={Link} href="/">
                Início
              </Button>
              <Button color="inherit" component={Link} href="/about">
                Sobre
              </Button>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md">
            <Box my={4}>
              {children}
            </Box>
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
