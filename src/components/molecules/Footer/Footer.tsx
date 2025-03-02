// components/Footer.tsx
import * as React from 'react';
import { Box, Typography, IconButton, Container } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import {
  email,
  facebook,
  linkedIn,
} from '@/components/constants/contactInformation';

export const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: 'secondary.main', py: 4, mt: 8 }}>
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Connect with Me</Typography>
          <Box>
            <IconButton
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton href={`mailto:${email}`}>
              <EmailIcon />
            </IconButton>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2" color="textSecondary">
              © {new Date().getFullYear()}. All rights reserved.
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <a
                href="/privacy-policy"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Privacy Policy
              </a>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              <a
                href="/terms-of-service"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Terms of Service
              </a>
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="textSecondary">
              Contact: {email}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
