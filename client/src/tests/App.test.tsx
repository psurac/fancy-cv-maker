import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

test('renders NavBar', () => {
  render(<App />);
  const linkElement = screen.getByText(/fancy cv maker/i);
  expect(linkElement).toBeInTheDocument();
});

test ('render style Selector', () => {
  render(<App />);
  const styleSelectorElement = screen.getByLabelText(/CV Style/);
  expect(styleSelectorElement).toBeInTheDocument();
})

test ('render CVPages', () => {
  render(<App />);
  const cvPageSelectorElement = screen.getByTestId(/cv-page/);
  expect(cvPageSelectorElement).toBeInTheDocument();
})
