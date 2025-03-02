import React, { useState, useEffect } from 'react';
import { useUser, useClearUser } from '../../providers/UserProvider';
import { Box, Button, Typography, IconButton, useTheme } from '@mui/material';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';

export const Drawer = () => {
  const user = useUser();
  const clearUser = useClearUser();
  const [visible, setVisible] = useState(false);
  const theme = useTheme(); // Access MUI theme

  useEffect(() => {
    if (user.jwt) {
      setVisible(true);
    }
  }, [user.jwt]);

  const handleClose = () => {
    setVisible(false);
  };

  const handleLogout = () => {
    clearUser();
    handleClose();
  };

  if (!visible) return null;

  console.log('User:', user);
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 300,
        backgroundColor: theme.palette.background.paper,
        boxShadow: 3,
        borderRadius: 2,
        padding: 2,
        zIndex: 1000,
      }}
    >
      <Box sx={{ position: 'relative', textAlign: 'center' }}>
        {/* Close Button */}
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={handleClose}
          color="inherit"
        >
          <CloseIcon />
        </IconButton>

        {/* Avatar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Image
            src={user.decoded?.picture}
            alt="User Avatar"
            width={50}
            height={50}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
            priority
          />
        </Box>

        {/* User Info */}
        <Typography variant="h6">Thank you for logging in!</Typography>
        <Typography variant="body2">Name: {user.decoded?.name}</Typography>
        <Typography variant="body2">Email: {user.decoded?.email}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Thank you for testing out the OAuth2/OIDC functionality.
        </Typography>

        {/* Logout Button */}
        <Button
          color="error"
          variant="contained"
          onClick={handleLogout}
          sx={{ mt: 2 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};
