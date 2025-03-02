// GoogleSignInButton.tsx

import React from 'react';
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useSetUser } from '../../providers/UserProvider';
import { GOOGLE_CLIENT_ID } from '../../constants/auth';

export const GoogleSignInButton = () => {
  const setUser = useSetUser();

  const handleSuccess = (response: CredentialResponse) => {
    if (response.credential) {
      const jwt = response.credential;
      const decoded = jwtDecode(jwt);
      setUser({
        jwt,
        decoded,
        clientId: response.clientId || null,
      });
      if (window.gtag) {
        window.gtag('event', 'login', {
          method: 'Google',
          user_id: decoded.sub,
          name: (decoded as any).name,
        });
      }
      console.log('Login Success:', decoded);
    }
  };

  const handleError: any = (error: any) => {
    console.log('Login Failed:', error);
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        theme="outline" // Options: 'outline', 'filled_blue', 'filled_black'
        size="medium" // Options: 'large', 'medium', 'small'
        text="signin_with" // Options: 'signin_with', 'signup_with', 'continue_with'
        shape="pill" // Options: 'rectangular', 'pill', 'circle', 'square'
      />
    </GoogleOAuthProvider>
  );
};
