import React, { useReducer, useEffect, useCallback, useState } from 'react';
import { BookingsContext } from '../contexts/BookingsContext';
import { 
  bookingsReducer, 
  initialState, 
  ACTIONS
} from '../reducers/bookingsReducer';

const STORAGE_KEY = 'little-lemon-bookings';

export const BookingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingsReducer, initialState);
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const loadSavedBookings = () => {
      try {
        const savedBookings = localStorage.getItem(STORAGE_KEY);
        if (savedBookings) {
          const { bookings: savedBookingsList } = JSON.parse(savedBookings);
          dispatch({
            type: ACTIONS.LOAD_BOOKINGS,
            payload: {
              bookings: savedBookingsList.map(booking => ({
                ...booking,
                date: new Date(booking.date)
              }))
            }
          });
        }
      } catch (error) {
        console.error('Error loading bookings:', error);
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: { error: 'Failed to load saved bookings' }
        });
      }
    };

    loadSavedBookings();
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    if (!isInitialized) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        bookings: state.bookings
      }));
    } catch (error) {
      console.error('Error saving bookings:', error);
    }
  }, [state.bookings, isInitialized]);

  // Initialize available times when provider mounts
  useEffect(() => {
    const initTimes = async () => {
      try {
        if (typeof window.fetchAPI !== 'function') {
          throw new Error('API functions not loaded');
        }
        await initializeAvailableSlots(new Date());
        setIsInitialized(true);
      } catch (error) {
        console.error('Initialization error:', error);
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: { error: 'Booking system temporarily unavailable' }
        });
      }
    };
    
    initTimes();
  }, []);

  const initializeAvailableSlots = async (date) => {
    if (typeof window.fetchAPI !== 'function') {
      console.error('fetchAPI not available');
      return;
    }

    try {
      console.log('Fetching times for date:', date);
      const availableTimes = await window.fetchAPI(date);
      console.log('Received times:', availableTimes);
      dispatch({
        type: ACTIONS.INITIALIZE_SLOTS,
        payload: { startDate: date, availableTimes }
      });
    } catch (error) {
      console.error('Error fetching available times:', error);
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { error: 'Failed to fetch available times' }
      });
    }
  };

  const bookingsApi = {
    submitBooking: useCallback(async (formData) => {
      try {
        const success = await window.submitAPI(formData);
        if (success) {
          dispatch({
            type: ACTIONS.ADD_BOOKING,
            payload: { booking: formData }
          });
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error submitting booking:', error);
        return false;
      }
    }, []),
    
    releaseBooking: useCallback((index) => {
      dispatch({
        type: ACTIONS.RELEASE_BOOKING,
        payload: { index }
      });
    }, []),

    editBooking: useCallback((index, updatedBooking) => {
      dispatch({
        type: ACTIONS.EDIT_BOOKING,
        payload: { index, booking: updatedBooking }
      });
    }, [])
  };

  const getAvailableTimeSlots = useCallback(async (date) => {
    if (!date || typeof window.fetchAPI !== 'function') {
      return [];
    }

    try {
      const availableTimes = await window.fetchAPI(date);
      if (Array.isArray(availableTimes)) {
        dispatch({
          type: ACTIONS.UPDATE_SLOTS,
          payload: { date, availableTimes }
        });
        return availableTimes;
      }
      return [];
    } catch (error) {
      console.error('Error fetching times:', error);
      return [];
    }
  }, []);

  const value = {
    bookings: state.bookings,
    error: state.error,
    availableTimeSlots: state.availableTimeSlots,
    addBooking: bookingsApi.submitBooking,
    releaseBooking: bookingsApi.releaseBooking,
    editBooking: bookingsApi.editBooking,
    getAvailableTimeSlots
  };

  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  );
};
