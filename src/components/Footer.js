import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: { xs: 4, md: 6 },
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12} sm={4}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                mb: { xs: 1, md: 2 }
              }}
            >
              Little Lemon
            </Typography>
            <Typography 
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                lineHeight: 1.6
              }}
            >
              A charming Mediterranean restaurant bringing the flavors of the coast to your table.
            </Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                mb: { xs: 1, md: 2 }
              }}
            >
              Navigation
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1, md: 1.5 } }}>
              <Link 
                component={RouterLink} 
                to="/" 
                color="inherit" 
                sx={{ 
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  '&:hover': { color: 'secondary.main' }
                }}
              >
                Home
              </Link>
              <Link 
                component={RouterLink} 
                to="/menu" 
                color="inherit"
                sx={{ 
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  '&:hover': { color: 'secondary.main' }
                }}
              >
                Menu
              </Link>
              <Link 
                component={RouterLink} 
                to="/reservations" 
                color="inherit"
                sx={{ 
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  '&:hover': { color: 'secondary.main' }
                }}
              >
                Reservations
              </Link>
              <Link 
                component={RouterLink} 
                to="/about" 
                color="inherit"
                sx={{ 
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  '&:hover': { color: 'secondary.main' }
                }}
              >
                About
              </Link>
              <Link 
                component={RouterLink} 
                to="/contact" 
                color="inherit"
                sx={{ 
                  fontSize: { xs: '0.875rem', md: '1rem' },
                  '&:hover': { color: 'secondary.main' }
                }}
              >
                Contact
              </Link>
            </Box>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                mb: { xs: 1, md: 2 }
              }}
            >
              Contact Us
            </Typography>
            <Typography 
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', md: '1rem' },
                lineHeight: 1.6
              }}
            >
              123 Main Street<br />
              Chicago, IL 60601<br />
              (312) 555-0123<br />
              info@littlelemon.com
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ mt: 4, textAlign: 'center' }}>
          {new Date().getFullYear()} Little Lemon Restaurant. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
