import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/theme';
import { UserProvider } from '../../providers/UserProvider';

test('test header', () => {
  render(
    <ThemeProvider theme={theme}>
      <UserProvider>
      <Header />
      </UserProvider>
    </ThemeProvider>
  );
  expect(screen.getByText('Brad Griffin')).toBeInTheDocument();
});
