import * as React from 'react';
import { Container, Typography } from '@mui/material';
import { IssueSubmissionSection } from '../components/molecules/LandingPageSections/IssueSubmissionSection';

export default function BugReportPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Report a Bug
      </Typography>
      <IssueSubmissionSection />
    </Container>
  );
}
