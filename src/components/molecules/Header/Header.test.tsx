import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '@mui/material/Button';
import { Header } from './Header';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/theme';

test('test header', () => {
  render(
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
  );
  expect(screen.getByText('Brad Griffin')).toBeInTheDocument();
});
