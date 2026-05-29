// pages/index.tsx
import * as React from 'react';
import { Container } from '@mui/material';
import { ExperienceSkillsSection } from '../components/molecules/LandingPageSections/ExperienceSkillsSection';
import { AboutSection } from '../components/molecules/LandingPageSections/AboutSection';
import { EducationSection } from '../components/molecules/LandingPageSections/EducationSection';
import { IssueSubmissionSection } from '../components/molecules/LandingPageSections/IssueSubmissionSection';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <AboutSection />
      <IssueSubmissionSection />
      <ExperienceSkillsSection />
      <EducationSection />
    </Container>
  );
}
