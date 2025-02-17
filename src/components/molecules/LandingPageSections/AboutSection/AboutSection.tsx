// components/AboutSection.tsx
import * as React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import profilePic from '../../../../../public/profile.jpg';
import { Work } from '@mui/icons-material';

export const AboutSection: React.FC = () => {
  return (
    <Paper
    id="about-section"
      sx={{ p: 4, mt: 4, borderRadius: 2, backgroundColor: 'secondary.main' }}
    >
      <Grid2 container spacing={4} alignItems="center">
        <Grid2 size={{ xs: 12, md: 4 }}>
          <Avatar
            alt="Profile Picture"
            src={profilePic.src}
            sx={{ width: 150, height: 150, mb: 2, mx: 'auto' }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            About Me
          </Typography>
          <Typography variant="body1">
            As an experienced technical leader, I have successfully delivered
            complex projects across the healthcare industry and state
            government. My expertise spans maintaining and enhancing legacy
            systems, as well as migrating them to modern platforms. With a
            strong background in front-end, middle layer, and back-end ETL
            processes, I have designed robust architectures and implemented
            secure networking solutions for new cloud accounts.
            <br />
            <br />I am dedicated to ensuring compliance with industry and
            company-specific standards, minimizing technical debt, and promoting
            long-term supportability of the products I build. My focus on
            technical excellence and adherence to best practices has
            consistently delivered reliable and scalable solutions that meet the
            evolving needs of my clients.
          </Typography>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Box textAlign="center">
              <Work color="primary" fontSize="large" />
              <Typography variant="subtitle1">Professional</Typography>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Paper>
  );
};
