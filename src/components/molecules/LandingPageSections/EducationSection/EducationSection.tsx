// components/EducationSection.tsx
import * as React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { School } from '@mui/icons-material';

export const EducationSection: React.FC = () => {
  return (
    <Box sx={{ p: 4, mt: 4 }} id="education-section">
      <Grid2 container spacing={4} alignItems="center">
        <Grid2
          container
          size={{ xs: 12, md: 2 }}
          display="flex"
          justifyContent="center"
        >
          <School color="primary" fontSize="large" />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 10 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Education
          </Typography>
          <List>
            <ListItem>
              <strong>Bachelors - Computer Science</strong>, Thomas College
            </ListItem>
            <ListItem>
              <strong>Associates - Computer Systems Integration</strong>,
              Kennebec Valley Community College
            </ListItem>
          </List>
        </Grid2>
      </Grid2>
    </Box>
  );
};
