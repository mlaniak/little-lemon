import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Snackbar,
  Alert,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import BookingForm from '../components/BookingForm';
import BookingsList from '../components/BookingsList';

const Reservations = () => {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const theme = useTheme();

  const handleSubmitSuccess = () => {
    setSnackbar({
      open: true,
      message: 'Reservation submitted successfully! We will confirm shortly.',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container 
      component="section"
      maxWidth="lg" 
      sx={{ 
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 3 }
      }}
    >
      <Typography 
        variant="h1" 
        component="h1"
        align="center" 
        gutterBottom
        sx={{
          fontSize: { xs: '2rem', md: '2.5rem' },
          mb: { xs: 3, md: 4 },
          color: 'primary.main'
        }}
        role="heading"
        aria-level="1"
      >
        Reserve a Table
      </Typography>

      <Paper 
        component="main"
        elevation={3}
        sx={{ 
          p: 4, 
          mt: 4 
        }}
        aria-label="Reservation form"
      >
        <BookingForm onSubmitSuccess={handleSubmitSuccess} />
        <BookingsList />
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        role="alert"
        aria-live="polite"
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Reservations;
