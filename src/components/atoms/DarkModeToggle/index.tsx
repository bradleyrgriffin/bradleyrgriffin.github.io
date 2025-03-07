import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { DarkModeToggleProps } from './DarkModeToggle.types';
export const DarkModeToggle = ({
  toggleDarkMode,
  darkMode,
}: DarkModeToggleProps) => {
  return (
    <div style={{ padding: 20 }}>
      <Tooltip title="Toggle dark mode">
      <IconButton onClick={toggleDarkMode} color="inherit">
        {darkMode ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      </Tooltip>
    </div>
  );
};
