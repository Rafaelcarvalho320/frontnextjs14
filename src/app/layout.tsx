import type { Metadata } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import ThemeProvider from './ThemeProvider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import'@fontsource/roboto/700.css';

export const metadata: Metadata = {
  title: "Cadastro",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
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
