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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';

const Reservations = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: null,
    time: null,
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

  const handleTimeChange = (time) => {
    setFormData((prev) => ({
      ...prev,
      time: time,
    }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.date || !formData.time || !formData.guests) {
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
                time: null,
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

      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 3, md: 4 }, 
          mt: { xs: 2, md: 4 },
          borderRadius: { xs: 2, md: 3 }
        }}
      >
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 4,
              '& .MuiAlert-message': {
                fontSize: { xs: '0.875rem', md: '1rem' }
              }
            }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
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
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={formData.date}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                  disabled={loading}
                  minDate={new Date()}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <TimePicker
                  label="Time"
                  value={formData.time}
                  onChange={handleTimeChange}
                  renderInput={(params) => (
                    <TextField {...params} fullWidth required />
                  )}
                  disabled={loading}
                  minTime={new Date(0, 0, 0, 11)}
                  maxTime={new Date(0, 0, 0, 22)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Occasion (Optional)</InputLabel>
                <Select
                  name="occasion"
                  value={formData.occasion}
                  label="Occasion (Optional)"
                  onChange={handleChange}
                  disabled={loading}
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
                disabled={loading}
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
