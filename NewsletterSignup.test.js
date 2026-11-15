import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';
import { axe } from 'jest-axe'; // We'll need to export it for testing
import { NewsletterSignup } from '../pages/index.js';

// In pages/index.js, you'll need to export the component:
// export const NewsletterSignup = () => { ... }
// And then change the default export to:
// export default function App() { ... }

expect.extend(toHaveNoViolations);

describe('NewsletterSignup', () => {
  let emailInput, subscribeButton;

  beforeEach(() => {
    render(<NewsletterSignup />);
    emailInput = screen.getByLabelText(/email address for subscription/i);
    subscribeButton = screen.getByRole('button', { name: /subscribe for alerts/i });
  });

  it('should display a success message with a valid email', async () => {
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(subscribeButton);

    const successMessage = await screen.findByText(/Success! Your Sentinel Alerts will be sent/i);
    expect(successMessage).toBeInTheDocument();
    expect(successMessage).toHaveClass('text-white');
  });

  it('should display an error message with an invalid email', async () => {
    fireEvent.click(subscribeButton); // Submit with empty input

    const errorMessage = await screen.findByText(/please enter a valid email address/i);
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-red-400');
  });

  it('should have a descriptive placeholder in the email input', () => {
    expect(emailInput).toHaveAttribute('placeholder', 'your.email@example.com');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<NewsletterSignup />); // Re-render for isolated container
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});