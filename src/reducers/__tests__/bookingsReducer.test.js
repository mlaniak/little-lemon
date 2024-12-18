import { 
  bookingsReducer, 
  initialState, 
  ACTIONS, 
  initializeTimes, 
  updateTimes 
} from '../bookingsReducer';

describe('BookingsReducer', () => {
  test('initializeTimes returns the expected times array', () => {
    const times = initializeTimes();
    expect(times).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
  });

  test('updateTimes returns the same value that is provided in the state', () => {
    const state = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    const newState = updateTimes(state, { type: 'UPDATE_TIMES' });
    expect(newState).toEqual(state);
  });
});
