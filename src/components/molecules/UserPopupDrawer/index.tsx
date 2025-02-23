// Drawer.tsx

import React, { useState, useEffect } from 'react';
import { useUser, useClearUser } from '../../providers/UserProvider';
import './Drawer.css';
import { Button } from '@mui/material';

export const Drawer = () => {
  const user = useUser();
  const clearUser = useClearUser();
  const [visible, setVisible] = useState(false);

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

  return (
    <div className="drawer">
      <div className="drawer-content">
        <button className="drawer-close" onClick={handleClose}>
          X
        </button>
        <div className="avatar">
          <img src={user.decoded?.picture} alt="User Avatar" />
        </div>
        <h3>Thank you for logging in!</h3>
        <p>Name: {user.decoded?.name}</p>
        <p>Email: {user.decoded?.email}</p>
        <p>Thank you for testing out the OAuth2/OIDC functionality.</p>
        <Button color="error" className="logout-button" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};
