import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" align="center" gutterBottom>
        About Little Lemon
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="body1" paragraph>
            Little Lemon is a charming Mediterranean restaurant that brings the flavors of the Mediterranean coast to Chicago. 
            Our story began with a passion for authentic cuisine and a dream to create a warm, welcoming space where people 
            can gather to enjoy delicious food and create lasting memories.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
