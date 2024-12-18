import React from 'react';
import { Container, Snackbar, Alert } from '@mui/material';
import BookingForm from '../components/BookingForm';
import BookingsList from '../components/BookingsList';

const Reservations = () => {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success',
  });

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
      <BookingForm onSubmitSuccess={handleSubmitSuccess} />
      <BookingsList />
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
