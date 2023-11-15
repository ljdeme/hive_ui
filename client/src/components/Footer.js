import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import logo2 from '../images/hex2.png';

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
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: 'gray',
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily:'Chakra Petch',
          }}
        >
          <img src={logo2} alt='hive logo' width={50}/>
          <Container maxWidth="sm">
            <Link color="inherit" href="/" sx={{ marginRight: 2 }}>
              Home
            </Link>
            <Link color="inherit" href="/about-us" sx={{ marginRight: 2 }}>
              About
            </Link>
            <Link color="inherit" href="/documentation" sx={{ marginRight: 2 }}>
              Docs
            </Link>
            <Link color="inherit" href="https://github.com/marc4813/HIVE" sx={{ marginRight: 2 }}>
              GitHub
            </Link>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}