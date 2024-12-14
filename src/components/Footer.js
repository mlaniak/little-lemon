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
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Little Lemon
            </Typography>
            <Typography variant="body2">
              A charming Mediterranean restaurant bringing the flavors of the coast to your table.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Navigation
            </Typography>
            <Link component={RouterLink} to="/" color="inherit" display="block">
              Home
            </Link>
            <Link component={RouterLink} to="/menu" color="inherit" display="block">
              Menu
            </Link>
            <Link component={RouterLink} to="/reservations" color="inherit" display="block">
              Reservations
            </Link>
            <Link component={RouterLink} to="/about" color="inherit" display="block">
              About
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" display="block">
              Contact
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              123 Main Street<br />
              Chicago, IL 60601<br />
              Tel: (312) 555-0123<br />
              Email: info@littlelemon.com
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ mt: 4, textAlign: 'center' }}>
          © {new Date().getFullYear()} Little Lemon Restaurant. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
