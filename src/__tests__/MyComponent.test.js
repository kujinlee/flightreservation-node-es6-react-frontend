import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import for toBeInTheDocument
import MyComponent from '../MyComponent'; // Ensure this path is correct

test('renders MyComponent with correct content', () => {
  render(<MyComponent />);
  const linkElement = screen.getByText(/Welcome to Flight Reservation/i);
  expect(linkElement).toBeInTheDocument();
});
