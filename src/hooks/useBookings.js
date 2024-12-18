import { useReducer, useEffect } from 'react';
import { 
  bookingsReducer, 
  initialState, 
  ACTIONS, 
  defaultTimeSlots 
} from '../reducers/bookingsReducer';

const STORAGE_KEY = 'little-lemon-bookings';

const useBookings = () => {
  const [state, dispatch] = useReducer(bookingsReducer, initialState);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem(STORAGE_KEY);
    if (savedBookings) {
      try {
        const { bookings: savedBookingsList, availableSlots } = JSON.parse(savedBookings);
        dispatch({
          type: ACTIONS.LOAD_BOOKINGS,
          payload: {
            bookings: savedBookingsList.map(booking => ({
              ...booking,
              date: new Date(booking.date)
            })),
            availableSlots
          }
        });
      } catch (error) {
        console.error('Error loading bookings:', error);
        dispatch({
          type: ACTIONS.SET_ERROR,
          payload: { error: 'Failed to load saved bookings' }
        });
        initializeAvailableSlots(new Date());
      }
    } else {
      initializeAvailableSlots(new Date());
    }
  }, []);

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      bookings: state.bookings,
      availableSlots: state.availableTimeSlots
    }));
  }, [state.bookings, state.availableTimeSlots]);

  // Initialize available slots for a date range starting from the given date
  const initializeAvailableSlots = (startDate) => {
    dispatch({
      type: ACTIONS.INITIALIZE_SLOTS,
      payload: { startDate }
    });
  };

  // Get available time slots for a specific date
  const getAvailableTimeSlots = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    
    // Initialize slots for this date if they don't exist
    if (!state.availableTimeSlots[dateStr]) {
      dispatch({
        type: ACTIONS.INITIALIZE_SLOTS,
        payload: { startDate: date }
      });
      return defaultTimeSlots;
    }
    
    return state.availableTimeSlots[dateStr];
  };

  // Add a new booking
  const addBooking = (bookingData) => {
    try {
      dispatch({
        type: ACTIONS.ADD_BOOKING,
        payload: { booking: bookingData }
      });
      return true;
    } catch (error) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: { error: 'Failed to add booking' }
      });
      return false;
    }
  };

  return {
    bookings: state.bookings,
    error: state.error,
    getAvailableTimeSlots,
    addBooking,
    initializeAvailableSlots
  };
};

export default useBookings;
