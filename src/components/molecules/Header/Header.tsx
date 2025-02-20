// components/Header.tsx
'use client';
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from 'next/link';
import { email, linkedIn } from '@/components/constants/contactInformation';

export const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: 'Home', href: '/' },
    { text: 'LinkedIn', href: linkedIn },
    { text: 'Projects', href: '/projects' },
    { text: 'Contact', href: `mailto:${email}` },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Button} href="/" color="inherit">
          Brad Griffin
        </Typography>
        <Box sx={{ flexGrow: 1 }}></Box>
        {isMobile ? (
          <div>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.text}
                  onClick={handleClose}
                  component={Link}
                  href={item.href}
                >
                  {item.text}
                </MenuItem>
              ))}
            </Menu>
          </div>
        ) : (
          <Box sx={{ display: 'flex' }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={Link}
                href={item.href}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
