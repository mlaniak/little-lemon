// Simulated API for Little Lemon restaurant bookings
const seededRandom = function (seed) {
  const m = 2**35 - 31;
  const a = 185852;
  let s = seed % m;
  
  return function () {
    return (s = s * a % m) / m;
  };
};

/**
 * Convert 24h time to 12h format
 * @param {string} time24h - Time in 24h format (HH:mm)
 * @returns {string} Time in 12h format (h:mm AM/PM)
 */
const convertTo12Hour = (time24h) => {
  const [hours, minutes] = time24h.split(':');
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes} ${period}`;
};

/**
 * Fetch available booking times for a given date
 * @param {Date} date - The date to check availability for
 * @returns {Promise<string[]>} Array of available time slots
 */
window.fetchAPI = function(date) {
  console.log('API received date:', date);
  const result = [];
  const random = seededRandom(date.getDate());
  
  const times = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];
  
  // Randomly make some time slots unavailable
  times.forEach(time => {
    if(random() < 0.5) { 
      result.push(convertTo12Hour(time));
    }
  });

  console.log('API returning times:', result);
  return Promise.resolve(result);
};

/**
 * Submit a booking request
 * @param {Object} formData - The booking form data
 * @returns {Promise<boolean>} True if booking was successful
 */
window.submitAPI = function(formData) {
  console.log('API received form data:', formData);
  // Simulate API call with 90% success rate
  const random = Math.random();
  const success = random < 0.9;
  
  console.log('API returning success:', success);
  return Promise.resolve(success);
};
