import React, { useContext, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BookingsContext } from '../contexts/BookingsContext';
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
  Box,
  Stepper,
  Step,
  StepLabel,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

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
    .min(1, 'At least 1 guest is required')
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
  const { getAvailableTimeSlots, addBooking } = useContext(BookingsContext);
  const [availableTimes, setAvailableTimes] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);

  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    date: null,
    time: '',
    guests: '',
    occasion: '',
    seating: '',
    specialRequests: ''
  };

  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: initialValues || defaultValues,
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });

  const { handleSubmit, watch, formState: { errors, dirtyFields }, getValues, trigger } = form;
  const selectedDate = watch('date');

  // Define fields object at component scope
  const fields = {
    0: ['name', 'email', 'phone'],
    1: ['date', 'time', 'guests'],
    2: ['occasion', 'seating']
  };

  // Format time to 12-hour format
  const formatTime = (time) => {
    // Check if time already includes AM/PM
    if (time.includes('AM') || time.includes('PM')) {
      return time;
    }

    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const isStepValid = useCallback((step) => {
    const currentFields = fields[step] || [];
    const values = getValues();
    
    // Debug values
    console.log('Step:', step);
    console.log('Current fields:', currentFields);
    console.log('Form values:', values);
    console.log('Dirty fields:', dirtyFields);
    console.log('Errors:', errors);
    
    const stepIsValid = currentFields.every(field => {
      const value = values[field];
      const hasValue = value && value.toString().trim() !== '';
      console.log(`Field ${field}:`, { value, hasValue });
      return hasValue;
    });

    console.log('Step is valid:', stepIsValid);
    return stepIsValid;
  }, [getValues, dirtyFields, errors]);

  const handleNext = useCallback(async () => {
    const currentFields = fields[activeStep];
    const stepValid = isStepValid(activeStep);
    console.log('Attempting next step. Valid:', stepValid);
    
    if (stepValid) {
      setActiveStep((prev) => Math.min(prev + 1, 2));
    }
  }, [activeStep, isStepValid, fields]);

  const handleBack = useCallback(() => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleFormSubmit = (data) => {
    setFormData(data);
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);
    try {
      const success = await addBooking(formData);
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

  React.useEffect(() => {
    let isMounted = true;

    const fetchTimes = async () => {
      setIsLoading(true);
      try {
        const times = await getAvailableTimeSlots(selectedDate);
        if (isMounted) {
          setAvailableTimes(times || []);
          form.setValue('time', '');
        }
      } catch (error) {
        console.error('Error fetching times:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (selectedDate) {
      fetchTimes();
    }

    return () => {
      isMounted = false;
    };
  }, [selectedDate, getAvailableTimeSlots, form]);

  const renderStepContent = useCallback((step) => {
    switch (step) {
      case 0:
        return (
          <Paper elevation={0} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Contact Information</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Tooltip title="Enter your full name as it appears on your ID">
                  <FormControl fullWidth error={!!errors.name}>
                    <TextField
                      id="name"
                      fullWidth
                      label="Name"
                      {...form.register('name')}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      InputLabelProps={{
                        shrink: true,
                        id: 'name-label'
                      }}
                      inputProps={{
                        'aria-label': 'Full name',
                        'aria-required': 'true',
                        minLength: 2,
                        maxLength: 50,
                        required: true,
                        autoComplete: 'name'
                      }}
                    />
                  </FormControl>
                </Tooltip>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Tooltip title="Enter a valid email address where we can send your confirmation">
                  <FormControl fullWidth error={!!errors.email}>
                    <TextField
                      id="email"
                      fullWidth
                      label="Email"
                      type="email"
                      {...form.register('email')}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      InputLabelProps={{
                        shrink: true,
                        id: 'email-label'
                      }}
                      inputProps={{
                        'aria-label': 'Email address',
                        'aria-required': 'true',
                        required: true,
                        pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$',
                        autoComplete: 'email'
                      }}
                    />
                  </FormControl>
                </Tooltip>
              </Grid>

              <Grid item xs={12}>
                <Tooltip title="Enter your 10-digit phone number without spaces or special characters">
                  <FormControl fullWidth error={!!errors.phone}>
                    <TextField
                      id="phone"
                      fullWidth
                      label="Phone"
                      type="tel"
                      {...form.register('phone')}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      InputLabelProps={{
                        shrink: true,
                        id: 'phone-label'
                      }}
                      inputProps={{
                        'aria-label': 'Phone number',
                        'aria-required': 'true',
                        required: true,
                        pattern: '[0-9]{10}',
                        title: 'Phone number must be 10 digits',
                        autoComplete: 'tel'
                      }}
                    />
                  </FormControl>
                </Tooltip>
              </Grid>
            </Grid>
          </Paper>
        );

      case 1:
        return (
          <Paper elevation={0} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Reservation Details</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Tooltip title="Select your preferred date for the reservation">
                  <FormControl fullWidth error={!!errors.date}>
                    <DatePicker
                      id="date"
                      selected={selectedDate}
                      onChange={(date) => form.setValue('date', date)}
                      minDate={new Date()}
                      placeholderText="Select Date"
                      className="custom-datepicker"
                      aria-label="Reservation date"
                      aria-invalid={!!errors.date}
                      aria-describedby={errors.date ? 'date-error' : undefined}
                      aria-required="true"
                      required
                      customInput={
                        <TextField
                          label="Date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      }
                    />
                  </FormControl>
                </Tooltip>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Tooltip title="Choose your preferred dining time">
                  <FormControl fullWidth error={!!errors.time}>
                    <InputLabel id="time-label">Time</InputLabel>
                    <Select
                      id="time"
                      {...form.register('time')}
                      labelId="time-label"
                      label="Time"
                      aria-label="Reservation time"
                      aria-invalid={!!errors.time}
                      aria-describedby={errors.time ? 'time-error' : undefined}
                      aria-required="true"
                    >
                      <MenuItem value="" disabled>
                        <em>Select a time</em>
                      </MenuItem>
                      {availableTimes.map((time) => (
                        <MenuItem 
                          key={time} 
                          value={time}
                          role="option"
                          aria-label={`Reserve table for ${formatTime(time)}`}
                        >
                          {formatTime(time)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Tooltip>
              </Grid>

              <Grid item xs={12}>
                <Tooltip title="Specify the number of guests (maximum 10 per table)">
                  <FormControl fullWidth error={!!errors.guests}>
                    <TextField
                      id="guests"
                      type="number"
                      label="Number of Guests"
                      {...form.register('guests', { valueAsNumber: true })}
                      InputLabelProps={{
                        shrink: true,
                        id: 'guests-label'
                      }}
                      InputProps={{ 
                        inputProps: { 
                          min: 1, 
                          max: 10,
                          'aria-label': 'Number of guests',
                          'aria-required': 'true',
                        }
                      }}
                      error={!!errors.guests}
                      helperText={errors.guests?.message}
                      aria-invalid={!!errors.guests}
                      aria-describedby={errors.guests ? 'guests-error' : undefined}
                    />
                  </FormControl>
                </Tooltip>
              </Grid>
            </Grid>
          </Paper>
        );

      case 2:
        return (
          <Paper elevation={0} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Preferences</Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Tooltip title="Select the occasion you're celebrating (if any)">
                  <FormControl fullWidth error={!!errors.occasion}>
                    <InputLabel id="occasion-label">Occasion</InputLabel>
                    <Select
                      id="occasion"
                      {...form.register('occasion')}
                      labelId="occasion-label"
                      label="Occasion"
                      aria-label="Select occasion"
                      aria-invalid={!!errors.occasion}
                      aria-describedby={errors.occasion ? 'occasion-error' : undefined}
                      aria-required="true"
                    >
                      {occasions.map((occasion) => (
                        <MenuItem 
                          key={occasion} 
                          value={occasion}
                          role="option"
                          aria-label={occasion}
                        >
                          {occasion}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Tooltip>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Tooltip title="Choose your preferred seating area">
                  <FormControl fullWidth error={!!errors.seating}>
                    <InputLabel id="seating-label">Seating Preference</InputLabel>
                    <Select
                      id="seating"
                      {...form.register('seating')}
                      labelId="seating-label"
                      label="Seating Preference"
                      aria-label="Select seating preference"
                      aria-invalid={!!errors.seating}
                      aria-describedby={errors.seating ? 'seating-error' : undefined}
                      aria-required="true"
                    >
                      {seatingOptions.map((option) => (
                        <MenuItem 
                          key={option} 
                          value={option}
                          role="option"
                          aria-label={option}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Tooltip>
              </Grid>

              <Grid item xs={12}>
                <Tooltip title="Add any special requests or dietary requirements">
                  <FormControl fullWidth error={!!errors.specialRequests}>
                    <TextField
                      id="specialRequests"
                      fullWidth
                      label="Special Requests"
                      placeholder="E.g., dietary restrictions, accessibility needs, or special occasions"
                      multiline
                      rows={4}
                      {...form.register('specialRequests')}
                      error={!!errors.specialRequests}
                      helperText={errors.specialRequests?.message}
                      aria-label="Special requests"
                      aria-invalid={!!errors.specialRequests}
                      aria-describedby={errors.specialRequests ? 'special-requests-error' : undefined}
                      InputLabelProps={{
                        shrink: true,
                        id: 'special-requests-label'
                      }}
                    />
                  </FormControl>
                </Tooltip>
              </Grid>
            </Grid>
          </Paper>
        );
    }
  }, [form, errors, availableTimes]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} aria-label="Reservation form" role="form" noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            {isEditing ? 'Edit Booking' : 'Make a Reservation'}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Stepper activeStep={activeStep} alternativeLabel>
            <Step>
              <StepLabel>Contact Info</StepLabel>
            </Step>
            <Step>
              <StepLabel>Reservation Details</StepLabel>
            </Step>
            <Step>
              <StepLabel>Preferences</StepLabel>
            </Step>
          </Stepper>
        </Grid>

        <Grid item xs={12}>
          {renderStepContent(activeStep)}
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              variant="outlined"
            >
              Back
            </Button>
            <Box>
              {onCancel && (
                <Button 
                  onClick={onCancel} 
                  variant="outlined"
                  aria-label="Cancel reservation"
                  sx={{ mr: 1 }}
                >
                  Cancel
                </Button>
              )}
              {activeStep === 2 ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isStepValid(2) || isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : isEditing ? 'Update Booking' : 'Reserve Table'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={!isStepValid(activeStep)}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Dialog
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        aria-labelledby="confirmation-dialog-title"
      >
        <DialogTitle id="confirmation-dialog-title">
          Confirm Reservation
        </DialogTitle>
        <DialogContent>
          {formData && (
            <Box>
              <Typography variant="body1" paragraph>
                Please confirm your reservation details:
              </Typography>
              <Typography><strong>Name:</strong> {formData.name}</Typography>
              <Typography><strong>Date:</strong> {format(formData.date, 'MMMM d, yyyy')}</Typography>
              <Typography><strong>Time:</strong> {formatTime(formData.time)}</Typography>
              <Typography><strong>Guests:</strong> {formData.guests}</Typography>
              <Typography><strong>Occasion:</strong> {formData.occasion}</Typography>
              <Typography><strong>Seating:</strong> {formData.seating}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmation(false)}>
            Edit
          </Button>
          <Button onClick={handleConfirmSubmit} variant="contained" color="primary">
            Confirm Reservation
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default BookingForm;
