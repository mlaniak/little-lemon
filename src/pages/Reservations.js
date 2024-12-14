import React from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';

const Reservations = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Reserve a Table
      </Typography>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Grid container spacing={4}>
          {/* Add reservation form here */}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Reservations;
