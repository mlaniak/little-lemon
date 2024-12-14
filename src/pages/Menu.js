import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

const Menu = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Our Menu
      </Typography>
      <Grid container spacing={4}>
        {/* Add menu items here */}
      </Grid>
    </Container>
  );
};

export default Menu;
