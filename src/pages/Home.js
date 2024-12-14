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
          py: { xs: 4, md: 8 },
          mb: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "'Markazi Text', serif",
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                  mb: { xs: 1, md: 2 },
                }}
              >
                Little Lemon
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: "'Markazi Text', serif",
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                  mb: { xs: 2, md: 3 },
                }}
              >
                Chicago
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: { xs: 3, md: 4 },
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  lineHeight: 1.6
                }}
              >
                We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
              </Typography>
              <Box className="button-container">
                <Button
                  component={RouterLink}
                  to="/reservations"
                  variant="contained"
                  color="secondary"
                  size="large"
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
              </Box>
            </Grid>
            <Grid 
              item 
              xs={12} 
              md={6}
              sx={{
                display: { xs: 'none', md: 'block' }
              }}
            >
              {/* Add hero image here */}
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item xs={12}>
            <Typography 
              variant="h2" 
              align="center" 
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                mb: { xs: 3, md: 4 }
              }}
            >
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
