export const initialState = {
  bookings: [],
  availableTimeSlots: {},
  error: null
};

// Action types
export const ACTIONS = {
  INITIALIZE_SLOTS: 'INITIALIZE_SLOTS',
  UPDATE_SLOTS: 'UPDATE_SLOTS',
  ADD_BOOKING: 'ADD_BOOKING',
  RELEASE_BOOKING: 'RELEASE_BOOKING',
  SET_ERROR: 'SET_ERROR',
  LOAD_BOOKINGS: 'LOAD_BOOKINGS'
};

export const initializeTimes = () => {
  return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
};

export const updateTimes = (state) => {
  return state;
};

export const bookingsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INITIALIZE_SLOTS: {
      const { startDate, availableTimes } = action.payload;
      const dateStr = startDate.toISOString().split('T')[0];
      
      return {
        ...state,
        availableTimeSlots: {
          ...state.availableTimeSlots,
          [dateStr]: availableTimes
        }
      };
    }

    case ACTIONS.UPDATE_SLOTS: {
      const { date, availableTimes } = action.payload;
      const dateStr = date.toISOString().split('T')[0];

      return {
        ...state,
        availableTimeSlots: {
          ...state.availableTimeSlots,
          [dateStr]: availableTimes
        }
      };
    }

    case ACTIONS.ADD_BOOKING: {
      const { booking } = action.payload;
      
      return {
        ...state,
        bookings: [...state.bookings, booking]
      };
    }

    case ACTIONS.RELEASE_BOOKING: {
      const { index } = action.payload;
      const newBookings = [...state.bookings];
      newBookings.splice(index, 1);
      
      return {
        ...state,
        bookings: newBookings
      };
    }

    case ACTIONS.SET_ERROR: {
      return {
        ...state,
        error: action.payload.error
      };
    }

    case ACTIONS.LOAD_BOOKINGS: {
      return {
        ...state,
        bookings: action.payload.bookings
      };
    }

    default:
      return state;
  }
};
