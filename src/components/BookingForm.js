import React, { useContext, useState, useCallback, useMemo, useEffect } from 'react';
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
  FormHelperText,
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
  IconButton
} from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
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
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState(null);
  
  // Add undo/redo state
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [lastUpdate, setLastUpdate] = useState(null);

  const defaultValues = useMemo(() => ({
    name: '',
    email: '',
    phone: '',
    date: null,
    time: '',
    guests: 2,
    occasion: '',
    seating: 'no preference',
    specialRequests: ''
  }), []);

  const form = useForm({
    resolver: zodResolver(bookingSchema),
    mode: 'onChange',
    defaultValues: initialValues || defaultValues,
  });

  const { handleSubmit, formState: { errors }, setValue, watch } = form;
  
  const isUndoDisabled = currentIndex <= 0;
  const isRedoDisabled = currentIndex >= history.length - 1;

  const addToHistory = useCallback((values) => {
    const valuesToStore = { ...values };
    if (valuesToStore.date instanceof Date) {
      valuesToStore.date = valuesToStore.date.toISOString();
    }
    
    setHistory(prev => {
      const newHistory = prev.slice(0, currentIndex + 1);
      return [...newHistory, valuesToStore];
    });
    setCurrentIndex(prev => prev + 1);
    setLastUpdate(Date.now());
  }, [currentIndex]);

  const handleUndo = useCallback(() => {
    if (!isUndoDisabled && history.length > 0) {
      const previousValues = history[currentIndex - 1];
      if (previousValues) {
        // Reset form to previous state
        Object.entries(previousValues).forEach(([field, value]) => {
          if (value !== undefined && value !== null) {
            if (field === 'date' && value) {
              setValue(field, new Date(value));
            } else {
              setValue(field, value);
            }
          }
        });
        setCurrentIndex(prev => prev - 1);
      }
    }
  }, [history, currentIndex, isUndoDisabled, setValue]);

  const handleRedo = useCallback(() => {
    if (!isRedoDisabled && history.length > 0) {
      const nextValues = history[currentIndex + 1];
      if (nextValues) {
        Object.entries(nextValues).forEach(([field, value]) => {
          if (value !== undefined && value !== null) {
            if (field === 'date' && value) {
              setValue(field, new Date(value));
            } else {
              setValue(field, value);
            }
          }
        });
        setCurrentIndex(prev => prev + 1);
      }
    }
  }, [history, currentIndex, isRedoDisabled, setValue]);

  // Watch for form changes with debouncing
  const watchAllFields = watch();
  useEffect(() => {
    // Prevent rapid updates
    const now = Date.now();
    if (lastUpdate && now - lastUpdate < 500) {
      return;
    }

    // Skip empty or default values
    const hasChanges = Object.entries(watchAllFields).some(([field, value]) => {
      if (value === undefined || value === null) return false;
      if (value === defaultValues[field]) return false;
      if (typeof value === 'string' && value.trim() === '') return false;
      return true;
    });

    if (hasChanges) {
      const lastEntry = history[currentIndex];
      const currentValues = { ...watchAllFields };
      
      // Convert date for comparison
      if (currentValues.date instanceof Date) {
        currentValues.date = currentValues.date.toISOString();
      }

      // Only add if different from last entry
      if (!lastEntry || JSON.stringify(lastEntry) !== JSON.stringify(currentValues)) {
        addToHistory(watchAllFields);
      }
    }
  }, [watchAllFields, addToHistory, history, currentIndex, lastUpdate, defaultValues]);

  // Add keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleUndo, handleRedo]);

  const selectedDate = watch('date');

  // Add form value watching for debugging
  const watchedValues = watch(['name', 'email', 'phone']);
  console.log('Watched form values:', watchedValues);

  const watchedStep2Values = watch(['date', 'time', 'guests']);
  console.log('Watched step 2 values:', watchedStep2Values);

  // Format time to 12-hour format
  const formatTime = useMemo(() => (time) => {
    if (!time) return '';
    if (time.includes('AM') || time.includes('PM')) {
      return time;
    }

    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  }, []);

  const isStepValid = useCallback((step) => {
    const values = watch();
    console.log('Current form values:', values);
    
    // For step 1 (contact info)
    if (step === 0) {
      const { name, email, phone } = values;
      console.log('Step 1 fields:', { name, email, phone });
      return Boolean(name) && Boolean(email) && Boolean(phone);
    }
    
    // For step 2 (reservation details)
    if (step === 1) {
      const { date, time, guests } = values;
      const guestsNumber = Number(guests);
      
      console.log('Step 2 validation check:', {
        date: date instanceof Date ? date.toISOString() : date,
        time,
        guests,
        guestsNumber,
        dateType: typeof date,
        timeType: typeof time,
        guestsType: typeof guests
      });
      
      const isDateValid = date instanceof Date || (typeof date === 'string' && date.length > 0);
      const isTimeValid = typeof time === 'string' && time.length > 0;
      const isGuestsValid = !isNaN(guestsNumber) && guestsNumber >= 1 && guestsNumber <= 10;
      
      console.log('Step 2 field validation:', { isDateValid, isTimeValid, isGuestsValid });
      
      return isDateValid && isTimeValid && isGuestsValid;
    }
    
    // For step 3 (preferences)
    if (step === 2) {
      const { occasion, seating } = values;
      return Boolean(occasion) && Boolean(seating);
    }
    
    return false;
  }, [watch]);

  const handleNext = useCallback(() => {
    if (isStepValid(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  }, [isStepValid, activeStep, setValue]);

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
      setIsSubmitting(true);
      try {
        const times = await getAvailableTimeSlots(selectedDate);
        if (isMounted) {
          setAvailableTimes(times || []);
          setValue('time', '');
        }
      } catch (error) {
        console.error('Error fetching times:', error);
      } finally {
        if (isMounted) {
          setIsSubmitting(false);
        }
      }
    };

    if (selectedDate) {
      fetchTimes();
    }

    return () => {
      isMounted = false;
    };
  }, [selectedDate, getAvailableTimeSlots, setValue]);

  const renderStepContent = useCallback((step) => {
    switch (step) {
      case 0:
        return (
          <Paper elevation={0} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Contact Information</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Tooltip title="Enter your full name" placement="top">
                  <FormControl fullWidth error={!!errors.name}>
                    <TextField
                      id="name-input"
                      label="Name"
                      {...form.register('name')}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      inputProps={{
                        'aria-label': 'Name',
                        'aria-describedby': errors.name ? 'name-error' : undefined
                      }}
                    />
                  </FormControl>
                </Tooltip>
              </Grid>
              
              <Grid item xs={12}>
                <Tooltip title="Enter your email address" placement="top">
                  <FormControl fullWidth error={!!errors.email}>
                    <TextField
                      id="email-input"
                      label="Email"
                      type="email"
                      {...form.register('email')}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      inputProps={{
                        'aria-label': 'Email',
                        'aria-describedby': errors.email ? 'email-error' : undefined
                      }}
                    />
                  </FormControl>
                </Tooltip>
              </Grid>
              
              <Grid item xs={12}>
                <Tooltip title="Enter your phone number" placement="top">
                  <FormControl fullWidth error={!!errors.phone}>
                    <TextField
                      id="phone-input"
                      label="Phone"
                      {...form.register('phone')}
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      inputProps={{
                        'aria-label': 'Phone',
                        'aria-describedby': errors.phone ? 'phone-error' : undefined
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
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth error={!!errors.date}>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setValue('date', date)}
                    minDate={new Date()}
                    customInput={
                      <TextField
                        id="date-input"
                        fullWidth
                        label="Date"
                        error={!!errors.date}
                        helperText={errors.date?.message}
                        inputProps={{
                          'aria-label': 'Date',
                          'aria-describedby': errors.date ? 'date-error' : undefined
                        }}
                      />
                    }
                  />
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FormControl fullWidth error={!!errors.time}>
                  <InputLabel id="time-label">Time</InputLabel>
                  <Select
                    labelId="time-label"
                    id="time-input"
                    label="Time"
                    {...form.register('time')}
                    error={!!errors.time}
                    inputProps={{
                      'aria-label': 'Time',
                      'aria-describedby': errors.time ? 'time-error' : undefined
                    }}
                  >
                    {availableTimes.map((time) => (
                      <MenuItem key={time} value={time}>
                        {formatTime(time)}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.time && (
                    <FormHelperText error>{errors.time.message}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <FormControl fullWidth error={!!errors.guests}>
                  <TextField
                    id="guests-input"
                    label="Number of guests"
                    type="number"
                    {...form.register('guests', {
                      valueAsNumber: true,
                      setValueAs: v => Number(v)
                    })}
                    error={!!errors.guests}
                    helperText={errors.guests?.message}
                    inputProps={{
                      min: 1,
                      max: 10,
                      'aria-label': 'Number of guests',
                      'aria-describedby': errors.guests ? 'guests-error' : undefined
                    }}
                  />
                </FormControl>
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
                      id="occasion-input"
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
                      id="seating-input"
                      {...form.register('seating')}
                      labelId="seating-label"
                      label="Seating Preference"
                      aria-label="Select seating preference"
                      aria-invalid={!!errors.seating}
                      aria-describedby={errors.seating ? 'seating-error' : undefined}
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
                      id="special-requests-input"
                      fullWidth
                      label="Special Requests"
                      placeholder="E.g., dietary restrictions, accessibility needs, or special occasions"
                      multiline
                      rows={4}
                      {...form.register('specialRequests')}
                      error={!!errors.specialRequests}
                      helperText={errors.specialRequests?.message}
                      inputProps={{
                        'aria-label': 'Special requests',
                        'aria-describedby': errors.specialRequests ? 'special-requests-error' : undefined
                      }}
                    />
                  </FormControl>
                </Tooltip>
              </Grid>
            </Grid>
          </Paper>
        );
      default:
        return null;
    }
  }, [form, errors, availableTimes, selectedDate]);

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 3 } }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 0 }}>
            {isEditing ? 'Edit Booking' : 'Make a Reservation'}
          </Typography>
          <Box>
            <Tooltip title="Undo (Ctrl+Z)">
              <span>
                <IconButton 
                  onClick={handleUndo} 
                  disabled={isUndoDisabled}
                  size="small"
                >
                  <UndoIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Redo (Ctrl+Shift+Z)">
              <span>
                <IconButton 
                  onClick={handleRedo} 
                  disabled={isRedoDisabled}
                  size="small"
                >
                  <RedoIcon />
                </IconButton>
              </span>
            </Tooltip>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(handleFormSubmit)} aria-label="Reservation form">
          <Grid container spacing={3}>
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Box>
                  {activeStep > 0 && (
                    <Button onClick={handleBack} sx={{ mr: 1 }}>
                      Back
                    </Button>
                  )}
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
                  <Typography><strong>Special Requests:</strong> {formData.specialRequests}</Typography>
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
      </Paper>
    </Box>
  );
};

export default BookingForm;
