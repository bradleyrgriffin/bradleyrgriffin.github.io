// Drawer.tsx

import React, { useState, useEffect } from 'react';
import { useUser, useClearUser } from '../../providers/UserProvider';
import styles from './Drawer.module.css';
import { Button } from '@mui/material';
import Image from 'next/image';

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
    <div className={styles.drawer}>
      <div className={styles.drawerContent}>
        <button className={styles.drawerClose} onClick={handleClose}>
          X
        </button>
        <div className={styles.avatar}>
          <Image
            src={user.decoded?.picture}
            alt="User Avatar"
            width={50}
            height={50}
          />
        </div>
        <h3>Thank you for logging in!</h3>
        <p>Name: {user.decoded?.name}</p>
        <p>Email: {user.decoded?.email}</p>
        <p>Thank you for testing out the OAuth2/OIDC functionality.</p>
        <Button color="error" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};
