import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import ImageGallery from '../components/ImageGallery';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?auto=format&fit=crop&w=800',
    title: 'Restaurant Interior',
  },
  {
    url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800',
    title: 'Our Chef',
  },
  {
    url: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&w=800',
    title: 'Cooking in Action',
  },
  {
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800',
    title: 'Fresh Ingredients',
  },
  {
    url: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800',
    title: 'Signature Dish',
  },
  {
    url: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800',
    title: 'Our Team',
  },
];

const About = () => {
  return (
    <Container maxWidth="lg">
      <Typography 
        variant="h2" 
        sx={{
          fontFamily: "'Markazi Text', serif",
          fontSize: { xs: '2.5rem', md: '3rem' },
          mb: 4,
          textAlign: 'center',
          color: 'primary.main'
        }}
      >
        About Us
      </Typography>

      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h5" 
            sx={{
              fontFamily: "'Markazi Text', serif",
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              mb: 2,
              color: 'primary.main'
            }}
          >
            Our Story
          </Typography>
          <Typography 
            variant="body1" 
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.8,
              mb: 3
            }}
          >
            Little Lemon is a charming Mediterranean restaurant that brings the flavors of the 
            Mediterranean coast to Chicago. Our story began with a passion for authentic cuisine 
            and a dream to create a warm, welcoming space where people can gather to enjoy 
            delicious food and create lasting memories.
          </Typography>
          <Typography 
            variant="body1" 
            sx={{
              fontSize: { xs: '1rem', md: '1.1rem' },
              lineHeight: 1.8
            }}
          >
            Founded by the Antonopoulos family, our restaurant combines traditional recipes 
            passed down through generations with modern culinary techniques. Every dish we 
            serve is crafted with love, using the freshest ingredients sourced from local 
            markets and trusted Mediterranean suppliers.
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: { xs: 2, md: 3 },
              overflow: 'hidden',
              boxShadow: { 
                xs: '0 2px 4px rgba(0,0,0,0.1)', 
                md: '0 4px 8px rgba(0,0,0,0.1)' 
              },
            }}
          >
            <ImageGallery images={galleryImages} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
