import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="white">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        hivetgs.co
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Footer() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        </Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: '#ffffff40',
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Container maxWidth="sm">
            <Link color="inherit" href="/" sx={{ marginRight: 2 }}>
              Home
            </Link>
            <Link color="inherit" href="/about-us" sx={{ marginRight: 2 }}>
              About
            </Link>
            <Link color="inherit" href="/documentation">
              Docs
            </Link>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}