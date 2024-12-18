import { createContext, useContext } from 'react';

export const BookingsContext = createContext(null);

export const useBookingsContext = () => {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error('useBookingsContext must be used within a BookingsProvider');
  }
  return context;
};
