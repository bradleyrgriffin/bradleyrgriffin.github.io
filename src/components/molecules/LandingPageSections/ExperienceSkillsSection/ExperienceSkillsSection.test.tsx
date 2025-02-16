// __tests__/ExperienceSkillsSection.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ExperienceSkillsSection } from './ExperienceSkillsSection';

describe('ExperienceSkillsSection', () => {
  test('renders the ExperienceSkillsSection component', () => {
    render(<ExperienceSkillsSection />);

    // Check for the heading
    expect(screen.getByText('Skills')).toBeInTheDocument();

    // Check for each skill card
    const skills = [
      'JavaScript',
      'React',
      'Next.js',
      'Material-UI',
      'Docker',
      'Azure',
      'AWS',
      'GitHub Actions',
      'CI/CD',
      'DevOps',
      'Agile',
      'Spring Boot',
      'GraphQL',
      'Elasticsearch',
      'RDBMS',
      'NoSQL',
      'OAuth2 & OIDC',
      'Modernization Projects',
      'Technical Leadership',
      'Mentoring'
    ];

    skills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });
});
