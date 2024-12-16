import React, { Suspense } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.css';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FormSkeleton from '../components/FormSkeleton';
import useFormPersist from '../hooks/useFormPersist';

// Form validation schema
const reservationSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Invalid email address'),
  phone: z.string()
    .regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  date: z.date()
    .min(new Date(), 'Date cannot be in the past'),
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

const Reservations = () => {
  const form = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: new Date(),
      time: '',
      guests: 2,
      occasion: '',
      seating: '',
      specialRequests: '',
    },
  });

  const { clearSavedData } = useFormPersist(form, 'reservation-form');

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const availableTimes = [
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
  ];

  const occasions = [
    'Birthday', 'Anniversary', 'Date Night', 'Business Meal',
    'Family Gathering', 'Other',
  ];

  const seatingOptions = [
    'Indoor', 'Outdoor', 'Bar', 'No Preference',
  ];

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSnackbar({
        open: true,
        message: 'Reservation submitted successfully! We will confirm shortly.',
        severity: 'success',
      });
      
      clearSavedData();
      reset();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to submit reservation. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 3 }
      }}
    >
      <Typography 
        variant="h2" 
        align="center" 
        gutterBottom
        sx={{
          fontSize: { xs: '2rem', md: '2.5rem' },
          mb: { xs: 3, md: 4 },
          color: 'primary.main'
        }}
      >
        Reserve a Table
      </Typography>

      <Suspense fallback={<FormSkeleton fields={8} />}>
        <Paper 
          elevation={3}
          sx={{ 
            p: { xs: 3, md: 4 },
            borderRadius: { xs: 2, md: 3 }
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  {...register('phone')}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
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
                        className={`date-picker ${errors.date ? 'error' : ''}`}
                      />
                      {errors.date && (
                        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                          {errors.date.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.time}>
                  <InputLabel>Time</InputLabel>
                  <Select
                    label="Time"
                    {...register('time')}
                  >
                    {availableTimes.map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.time && (
                    <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                      {errors.time.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Number of Guests"
                  type="number"
                  InputProps={{ inputProps: { min: 1, max: 10 } }}
                  {...register('guests', { valueAsNumber: true })}
                  error={!!errors.guests}
                  helperText={errors.guests?.message}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.occasion}>
                  <InputLabel>Occasion</InputLabel>
                  <Select
                    label="Occasion"
                    {...register('occasion')}
                  >
                    {occasions.map((occasion) => (
                      <MenuItem key={occasion} value={occasion}>
                        {occasion}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.occasion && (
                    <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                      {errors.occasion.message}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.seating}>
                  <InputLabel>Seating Preference</InputLabel>
                  <Select
                    label="Seating Preference"
                    {...register('seating')}
                  >
                    {seatingOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.seating && (
                    <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                      {errors.seating.message}
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
                  {...register('specialRequests')}
                  error={!!errors.specialRequests}
                  helperText={errors.specialRequests?.message}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth={isMobile}
                  disabled={isSubmitting}
                  sx={{ 
                    py: 1.5,
                    px: 4
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Reserve Table'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Suspense>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Reservations;
