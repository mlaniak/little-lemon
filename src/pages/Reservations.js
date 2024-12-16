import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  useMediaQuery,
  Snackbar,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../components/DatePicker.css";

const Reservations = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: null,
    hour: '',
    minute: '',
    guests: '',
    occasion: '',
    specialRequests: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.date || !formData.hour || !formData.minute || !formData.guests) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      setSnackbar({
        open: true,
        message: 'Thank you for your reservation! We\'ll send a confirmation email shortly.',
        severity: 'success',
      });
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setSnackbar({
        open: true,
        message: 'Failed to submit reservation. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  // Generate hours from 11 AM to 10 PM
  const hours = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 11;
    return {
      value: hour.toString().padStart(2, '0'),
      label: `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? ' PM' : ' AM'}`
    };
  });

  // Generate minutes in 15-minute intervals
  const minutes = Array.from({ length: 4 }, (_, i) => {
    const minute = i * 15;
    return {
      value: minute.toString().padStart(2, '0'),
      label: `:${minute.toString().padStart(2, '0')}`
    };
  });

  if (submitted) {
    return (
      <Container 
        maxWidth="sm" 
        sx={{ 
          py: { xs: 4, md: 8 },
          px: { xs: 2, md: 3 }
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 4 },
            borderRadius: { xs: 2, md: 3 },
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              color: 'primary.main',
              mb: 3
            }}
          >
            Reservation Confirmed!
          </Typography>
          <Alert 
            severity="success" 
            sx={{ 
              mb: 4,
              '& .MuiAlert-message': {
                fontSize: { xs: '0.875rem', md: '1rem' }
              }
            }}
          >
            Thank you for your reservation! We'll send a confirmation email shortly.
          </Alert>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                email: '',
                phone: '',
                date: null,
                hour: '',
                minute: '',
                guests: '',
                occasion: '',
                specialRequests: '',
              });
            }}
            sx={{
              py: 1.5,
              px: 4,
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Make Another Reservation
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container 
      maxWidth={false}
      sx={{ 
        maxWidth: 'lg',
        width: '100%',
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 4, md: 6 }
      }}
    >
      <Typography 
        variant="h2" 
        sx={{
          fontFamily: "'Markazi Text', serif",
          fontSize: { xs: '2.5rem', md: '3rem' },
          mb: 4,
          textAlign: 'center',
          color: 'primary.main'
        }}
      >
        Reserve a Table
      </Typography>

      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          bgcolor: 'background.paper',
          maxWidth: 800,
          mx: 'auto'
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="guests-label">Number of Guests</InputLabel>
                <Select
                  labelId="guests-label"
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  label="Number of Guests"
                  onChange={handleChange}
                  required
                >
                  {[...Array(20)].map((_, i) => (
                    <MenuItem key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
                minDate={new Date()}
                placeholderText="Select a date"
                customInput={
                  <TextField
                    required
                    fullWidth
                    label="Date"
                    sx={{ backgroundColor: 'white' }}
                  />
                }
                popperProps={{
                  positionFixed: true
                }}
                popperPlacement="bottom-start"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Hour</InputLabel>
                    <Select
                      name="hour"
                      value={formData.hour}
                      label="Hour"
                      onChange={handleChange}
                    >
                      {hours.map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Minute</InputLabel>
                    <Select
                      name="minute"
                      value={formData.minute}
                      label="Minute"
                      onChange={handleChange}
                    >
                      {minutes.map(({ value, label }) => (
                        <MenuItem key={value} value={value}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Occasion (Optional)</InputLabel>
                <Select
                  name="occasion"
                  value={formData.occasion}
                  label="Occasion (Optional)"
                  onChange={handleChange}
                >
                  <MenuItem value="birthday">Birthday</MenuItem>
                  <MenuItem value="anniversary">Anniversary</MenuItem>
                  <MenuItem value="date">Date Night</MenuItem>
                  <MenuItem value="business">Business Meal</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Special Requests (Optional)"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                multiline
                rows={4}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth={isMobile}
                disabled={loading}
                sx={{
                  mt: { xs: 2, md: 3 },
                  py: 1.5,
                  px: 4,
                  width: { xs: '100%', sm: 'auto' }
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Reserve Now'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

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
