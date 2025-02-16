// __tests__/AboutSection.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AboutSection } from './AboutSection';

jest.mock('../../../../../public/profile.jpg', () => 'test-file-stub');

describe('AboutSection', () => {
  test('renders the AboutSection component', () => {
    render(<AboutSection />);

    // Check for the heading
    expect(screen.getByText('About Me')).toBeInTheDocument();

    // Check for the description text
    expect(
      screen.getByText(
        /As an experienced technical leader, I have successfully delivered/
      )
    ).toBeInTheDocument();

    // Check for the professional icon and label
    const professionalIcon = screen.getByTestId('WorkIcon');
    expect(professionalIcon).toBeInTheDocument();

    const professionalLabel = screen.getByText('Professional');
    expect(professionalLabel).toBeInTheDocument();
  });
});
