import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { useBookingsContext } from '../contexts/BookingsContext';
import useFormPersist from '../hooks/useFormPersist';
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
  const { getAvailableTimeSlots, addBooking, error } = useBookingsContext();
  const [availableTimes, setAvailableTimes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = useState({
    name: initialValues?.name || '',
    email: initialValues?.email || '',
    phone: initialValues?.phone || '',
    date: initialValues?.date || new Date(),
    time: initialValues?.time || '',
    guests: initialValues?.guests || 2,
    occasion: initialValues?.occasion || '',
    seating: initialValues?.seating || '',
    specialRequests: initialValues?.specialRequests || '',
  });

  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: formData,
    mode: 'onBlur'
  });

  const { clearSavedData } = useFormPersist(form, 'booking-form');

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const selectedDate = watch('date');

  useEffect(() => {
    let isMounted = true;

    const fetchTimes = async () => {
      if (!selectedDate) return;
      
      setIsLoading(true);
      try {
        const times = await getAvailableTimeSlots(selectedDate);
        if (isMounted) {
          setAvailableTimes(times || []);
          setValue('time', '');
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
  }, [selectedDate, getAvailableTimeSlots, setValue]);

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
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            inputProps={{
              'aria-label': 'Name',
            }}
          />
          {errors.name && (
            <Typography id="name-error" role="alert" color="error" variant="caption">
              {errors.name.message}
            </Typography>
          )}
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            inputProps={{
              'aria-label': 'Email address',
            }}
          />
          {errors.email && (
            <Typography id="email-error" role="alert" color="error" variant="caption">
              {errors.email.message}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            type="tel"
            {...register('phone')}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            inputProps={{
              'aria-label': 'Phone number',
              pattern: '[0-9]{10}'
            }}
          />
          {errors.phone && (
            <Typography id="phone-error" role="alert" color="error" variant="caption">
              {errors.phone.message}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.date}>
                <DatePicker
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  minDate={new Date()}
                  placeholderText="Select Date"
                  className="custom-datepicker"
                  aria-label="Reservation date"
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? 'date-error' : undefined}
                />
                {errors.date && (
                  <Typography id="date-error" role="alert" color="error" variant="caption">
                    {errors.date.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="time"
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.time}>
                <Select
                  {...field}
                  displayEmpty
                  placeholder="Select a time"
                  aria-label="Reservation time"
                  aria-invalid={!!errors.time}
                  aria-describedby={errors.time ? 'time-error' : undefined}
                  sx={{
                    '& .MuiSelect-select': {
                      color: field.value ? 'inherit' : 'text.secondary',
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
                {errors.time && (
                  <Typography id="time-error" role="alert" color="error" variant="caption">
                    {errors.time.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="guests"
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.guests}>
                <TextField
                  {...field}
                  label="Number of Guests"
                  type="number"
                  InputProps={{ 
                    inputProps: { 
                      min: 1, 
                      max: 10,
                      'aria-label': 'Number of guests',
                    }
                  }}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  aria-invalid={!!errors.guests}
                  aria-describedby={errors.guests ? 'guests-error' : undefined}
                />
                {errors.guests && (
                  <Typography id="guests-error" role="alert" color="error" variant="caption">
                    {errors.guests.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="occasion"
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.occasion}>
                <InputLabel id="occasion-label">Occasion</InputLabel>
                <Select
                  {...field}
                  labelId="occasion-label"
                  label="Occasion"
                  aria-label="Occasion"
                  aria-invalid={!!errors.occasion}
                  aria-describedby={errors.occasion ? 'occasion-error' : undefined}
                >
                  {occasions.map((occasion) => (
                    <MenuItem key={occasion} value={occasion}>
                      {occasion}
                    </MenuItem>
                  ))}
                </Select>
                {errors.occasion && (
                  <Typography id="occasion-error" role="alert" color="error" variant="caption">
                    {errors.occasion.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="seating"
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.seating}>
                <InputLabel id="seating-label">Seating Preference</InputLabel>
                <Select
                  {...field}
                  labelId="seating-label"
                  label="Seating Preference"
                  aria-label="Seating preference"
                  aria-invalid={!!errors.seating}
                  aria-describedby={errors.seating ? 'seating-error' : undefined}
                >
                  {seatingOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                {errors.seating && (
                  <Typography id="seating-error" role="alert" color="error" variant="caption">
                    {errors.seating.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Special Requests"
            multiline
            rows={4}
            {...register('specialRequests')}
            error={!!errors.specialRequests}
            helperText={errors.specialRequests?.message}
            aria-label="Special requests"
            aria-invalid={!!errors.specialRequests}
            aria-describedby={errors.specialRequests ? 'special-requests-error' : undefined}
          />
          {errors.specialRequests && (
            <Typography id="special-requests-error" role="alert" color="error" variant="caption">
              {errors.specialRequests.message}
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
