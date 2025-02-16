// __tests__/EducationSection.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { EducationSection } from './EducationSection';

describe('EducationSection', () => {
  test('renders the EducationSection component', () => {
    render(<EducationSection />);

    // Check for the heading
    expect(screen.getByText('Education')).toBeInTheDocument();

    // Check for the School icon
    const schoolIcon = screen.getByTestId('SchoolIcon');
    expect(schoolIcon).toBeInTheDocument();

    // Check for the list items
    expect(screen.getByText(', Thomas College')).toBeInTheDocument();
    expect(screen.getByText(', Kennebec Valley Community College')).toBeInTheDocument();
  });
});
