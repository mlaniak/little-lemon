import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';

const ConfirmedBooking = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
        textAlign: 'center',
        p: 4
      }}
    >
      <CheckCircleOutlineIcon
        sx={{ fontSize: 64, color: 'success.main', mb: 2 }}
      />
      <Typography variant="h4" gutterBottom>
        Booking Confirmed!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Thank you for choosing Little Lemon. Your table has been successfully reserved.
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        You will receive a confirmation email shortly with your booking details.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          onClick={() => navigate('/reservations')}
          sx={{ mr: 2 }}
        >
          Make Another Booking
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate('/')}
        >
          Return to Home
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmedBooking;
