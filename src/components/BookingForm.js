import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useBookings } from '../hooks/useBookings';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../pages/DatePicker.css';
import {
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Form validation schema
const bookingSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Invalid email address'),
  phone: z.string()
    .regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  date: z.date()
    .refine(date => date >= new Date(new Date().setHours(0, 0, 0, 0)), 'Date cannot be in the past'),
  time: z.string()
    .min(1, 'Please select a time'),
  guests: z.number()
    .min(1, 'Minimum 1 guest required')
    .max(10, 'Maximum 10 guests allowed'),
  occasion: z.string()
    .min(1, 'Please select an occasion'),
  seating: z.string()
    .min(1, 'Please select a seating preference'),
  specialRequests: z.string()
    .max(500, 'Special requests must be less than 500 characters')
    .optional(),
});

const occasions = [
  'Birthday', 'Anniversary', 'Date Night', 'Business Meal',
  'Family Gathering', 'Other',
];

const seatingOptions = [
  'Indoor', 'Outdoor', 'Bar', 'No Preference',
];

const BookingForm = ({ onSubmitSuccess, initialValues, onCancel, isEditing }) => {
  const navigate = useNavigate();
  const { getAvailableTimeSlots, addBooking, error } = useBookings();
  const [availableTimes, setAvailableTimes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: initialValues,
    mode: 'onBlur'
  });

  const { handleSubmit, formState: { isValid } } = form;

  const selectedDate = form.watch('date');

  React.useEffect(() => {
    let isMounted = true;

    const fetchTimes = async () => {
      if (!selectedDate) return;
      
      setIsLoading(true);
      try {
        const times = await getAvailableTimeSlots(selectedDate);
        if (isMounted) {
          setAvailableTimes(times || []);
          form.setValue('time', '');
        }
      } catch (error) {
        console.error('Error fetching times:', error);
        if (isMounted) {
          setAvailableTimes([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchTimes();

    return () => {
      isMounted = false;
    };
  }, [selectedDate, getAvailableTimeSlots, form.setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const success = await addBooking(data);
      if (success) {
        if (isEditing) {
          onSubmitSuccess?.();
        } else {
          navigate('/booking-confirmed');
        }
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label="Table reservation form">
      <Grid container spacing={3} component="div" role="group" aria-label="Reservation details">
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            {isEditing ? 'Edit Booking' : 'Make a Reservation'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Name"
            {...form.register('name')}
            error={!!form.formState.errors.name}
            helperText={form.formState.errors.name?.message}
            aria-invalid={!!form.formState.errors.name}
            aria-describedby={form.formState.errors.name ? 'name-error' : undefined}
            inputProps={{
              'aria-label': 'Name',
            }}
          />
          {form.formState.errors.name && (
            <Typography id="name-error" role="alert" color="error" variant="caption">
              {form.formState.errors.name.message}
            </Typography>
          )}
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...form.register('email')}
            error={!!form.formState.errors.email}
            helperText={form.formState.errors.email?.message}
            aria-invalid={!!form.formState.errors.email}
            aria-describedby={form.formState.errors.email ? 'email-error' : undefined}
            inputProps={{
              'aria-label': 'Email address',
            }}
          />
          {form.formState.errors.email && (
            <Typography id="email-error" role="alert" color="error" variant="caption">
              {form.formState.errors.email.message}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            type="tel"
            {...form.register('phone')}
            error={!!form.formState.errors.phone}
            helperText={form.formState.errors.phone?.message}
            aria-invalid={!!form.formState.errors.phone}
            aria-describedby={form.formState.errors.phone ? 'phone-error' : undefined}
            inputProps={{
              'aria-label': 'Phone number',
              pattern: '[0-9]{10}'
            }}
          />
          {form.formState.errors.phone && (
            <Typography id="phone-error" role="alert" color="error" variant="caption">
              {form.formState.errors.phone.message}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!form.formState.errors.date}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => form.setValue('date', date)}
              minDate={new Date()}
              placeholderText="Select Date"
              className="custom-datepicker"
              aria-label="Reservation date"
              aria-invalid={!!form.formState.errors.date}
              aria-describedby={form.formState.errors.date ? 'date-error' : undefined}
            />
            {form.formState.errors.date && (
              <Typography id="date-error" role="alert" color="error" variant="caption">
                {form.formState.errors.date.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!form.formState.errors.time}>
            <Select
              {...form.register('time')}
              displayEmpty
              placeholder="Select a time"
              aria-label="Reservation time"
              aria-invalid={!!form.formState.errors.time}
              aria-describedby={form.formState.errors.time ? 'time-error' : undefined}
              sx={{
                '& .MuiSelect-select': {
                  color: form.watch('time') ? 'inherit' : 'text.secondary',
                }
              }}
            >
              <MenuItem value="" disabled>
                <em>Select a time</em>
              </MenuItem>
              {availableTimes.map((time) => (
                <MenuItem 
                  key={time} 
                  value={time}
                  aria-label={`Reserve table for ${time}`}
                >
                  {time}
                </MenuItem>
              ))}
            </Select>
            {form.formState.errors.time && (
              <Typography id="time-error" role="alert" color="error" variant="caption">
                {form.formState.errors.time.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!form.formState.errors.guests}>
            <TextField
              {...form.register('guests')}
              label="Number of Guests"
              type="number"
              InputProps={{ 
                inputProps: { 
                  min: 1, 
                  max: 10,
                  'aria-label': 'Number of guests',
                }
              }}
              onChange={(e) => form.setValue('guests', Number(e.target.value))}
              aria-invalid={!!form.formState.errors.guests}
              aria-describedby={form.formState.errors.guests ? 'guests-error' : undefined}
            />
            {form.formState.errors.guests && (
              <Typography id="guests-error" role="alert" color="error" variant="caption">
                {form.formState.errors.guests.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!form.formState.errors.occasion}>
            <InputLabel id="occasion-label">Occasion</InputLabel>
            <Select
              {...form.register('occasion')}
              labelId="occasion-label"
              label="Occasion"
              aria-label="Occasion"
              aria-invalid={!!form.formState.errors.occasion}
              aria-describedby={form.formState.errors.occasion ? 'occasion-error' : undefined}
            >
              {occasions.map((occasion) => (
                <MenuItem key={occasion} value={occasion}>
                  {occasion}
                </MenuItem>
              ))}
            </Select>
            {form.formState.errors.occasion && (
              <Typography id="occasion-error" role="alert" color="error" variant="caption">
                {form.formState.errors.occasion.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={!!form.formState.errors.seating}>
            <InputLabel id="seating-label">Seating Preference</InputLabel>
            <Select
              {...form.register('seating')}
              labelId="seating-label"
              label="Seating Preference"
              aria-label="Seating preference"
              aria-invalid={!!form.formState.errors.seating}
              aria-describedby={form.formState.errors.seating ? 'seating-error' : undefined}
            >
              {seatingOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {form.formState.errors.seating && (
              <Typography id="seating-error" role="alert" color="error" variant="caption">
                {form.formState.errors.seating.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Special Requests"
            multiline
            rows={4}
            {...form.register('specialRequests')}
            error={!!form.formState.errors.specialRequests}
            helperText={form.formState.errors.specialRequests?.message}
            aria-label="Special requests"
            aria-invalid={!!form.formState.errors.specialRequests}
            aria-describedby={form.formState.errors.specialRequests ? 'special-requests-error' : undefined}
          />
          {form.formState.errors.specialRequests && (
            <Typography id="special-requests-error" role="alert" color="error" variant="caption">
              {form.formState.errors.specialRequests.message}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            {onCancel && (
              <Button onClick={onCancel} variant="outlined">
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || isLoading}
            >
              {isEditing ? 'Save Changes' : 'Reserve Table'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default BookingForm;
