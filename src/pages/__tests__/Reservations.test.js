import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Reservations from '../Reservations';
import { BookingsContext } from '../../contexts/BookingsContext';

// Create a theme instance
const theme = createTheme();

// Mock window.fetchAPI and window.submitAPI
const mockAvailableTimes = [
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00"
];

global.fetchAPI = jest.fn().mockResolvedValue(mockAvailableTimes);
global.submitAPI = jest.fn().mockResolvedValue(true);

// Mock context value
const mockContextValue = {
  getAvailableTimeSlots: jest.fn().mockResolvedValue(mockAvailableTimes),
  addBooking: jest.fn().mockResolvedValue(true),
  bookings: [],
  availableTimeSlots: {
    '2024-12-17': mockAvailableTimes
  },
  error: null
};

const TestWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <BookingsContext.Provider value={mockContextValue}>
      {children}
    </BookingsContext.Provider>
  </ThemeProvider>
);

describe('Reservations Component', () => {
  beforeEach(() => {
    render(<Reservations />, { wrapper: TestWrapper });
  });

  it('should display the reservation heading', () => {
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/reserve a table/i);
  });

  it('should display the booking form', () => {
    const form = screen.getByRole('form', { name: /table reservation form/i });
    expect(form).toBeInTheDocument();
  });

  it('should display all form field labels', () => {
    const expectedLabels = [
      'Name',
      'Email address',
      'Phone number',
      'Reservation date',
      'Reservation time',
      'Number of guests',
      'Occasion',
      'Seating preference',
      'Special requests'
    ];

    expectedLabels.forEach(label => {
      expect(screen.getByLabelText(new RegExp(label, 'i'))).toBeInTheDocument();
    });
  });

  it('should display the submit button', () => {
    const submitButton = screen.getByRole('button', { name: /reserve table/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('should have proper region role with label', () => {
    const region = screen.getByRole('region', { name: /reservation form/i });
    expect(region).toBeInTheDocument();
  });
});
