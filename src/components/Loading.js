import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        gap: 2,
      }}
    >
      <CircularProgress
        size={40}
        thickness={4}
        sx={{
          color: 'primary.main',
        }}
      />
      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          fontSize: { xs: '0.875rem', md: '1rem' },
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;
