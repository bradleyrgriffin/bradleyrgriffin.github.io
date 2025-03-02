// Filename - src/theme.js

import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#f0f0f0',
      contrastText: '#ffa500',
    },
    error: {
      main: red.A400,
    },
  },
});

export const darkModeTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // A softer blue for better contrast on dark backgrounds
    },
    secondary: {
      main: '#212121', // Dark grey for subtle contrast
      contrastText: '#ffb74d', // A warmer orange for good readability
    },
    error: {
      main: '#ef5350', // Softer red for better visibility on dark backgrounds
    },
    background: {
      default: '#121212', // Standard dark theme background
      paper: '#1e1e1e', // Slightly lighter for contrast with cards, dialogs, etc.
    },
    text: {
      primary: '#ffffff', // Ensures good readability
      secondary: '#b0bec5', // Slightly muted text for contrast
    },
  },
});
