import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders NavBar', () => {
  render(<App />);
  const linkElement = screen.getByText(/fancy cv maker/i);
  expect(linkElement).toBeInTheDocument();
});
