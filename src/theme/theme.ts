// Filename - src/theme.js

import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#f0f0f0',
      contrastText: '#ffa500'
    },
    error: {
      main: red.A400,
    },
  },
});
