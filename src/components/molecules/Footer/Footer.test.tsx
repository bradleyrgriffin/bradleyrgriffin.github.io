// __tests__/Footer.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';
import { email } from '../../constants/contactInformation';

describe('Footer', () => {
  test('renders the footer component', () => {
    render(<Footer />);

    // Check for the heading
    expect(screen.getByText('Connect with Me')).toBeInTheDocument();

    // Check for the icons
    const facebookIcon = screen.getByTestId('FacebookIcon');
    const linkedInIcon = screen.getByTestId('LinkedInIcon');
    const emailIcon = screen.getByTestId('EmailIcon');

    expect(facebookIcon).toBeInTheDocument();

    expect(linkedInIcon).toBeInTheDocument();

    expect(emailIcon).toBeInTheDocument();

    // Check for the footer texts
    expect(
      screen.getByText(`© ${new Date().getFullYear()}. All rights reserved.`)
    ).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText(`Contact: ${email}`)).toBeInTheDocument();
  });
});
