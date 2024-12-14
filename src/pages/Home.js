import React from 'react';
import { Container, Typography, Button, Box, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "'Markazi Text', serif",
                  fontSize: { xs: '3rem', md: '4rem' },
                  mb: 2,
                }}
              >
                Little Lemon
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "'Markazi Text', serif",
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  mb: 3,
                }}
              >
                Chicago
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
              </Typography>
              <Button
                component={RouterLink}
                to="/reservations"
                variant="contained"
                color="secondary"
                size="large"
                sx={{ mr: 2 }}
              >
                Reserve a Table
              </Button>
              <Button
                component={RouterLink}
                to="/menu"
                variant="outlined"
                color="inherit"
                size="large"
              >
                View Menu
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Add hero image here */}
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h2" align="center" gutterBottom>
              This Week's Specials
            </Typography>
          </Grid>
          {/* Add special menu items here */}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
