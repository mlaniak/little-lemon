import React from 'react';
import { Container, Typography, Paper, Grid } from '@mui/material';

const Contact = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Our Location
            </Typography>
            <Typography variant="body1" paragraph>
              123 Main Street
              Chicago, IL 60601
            </Typography>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body1">
              Phone: (312) 555-0123
              Email: info@littlelemon.com
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            {/* Add contact form here */}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Contact;
