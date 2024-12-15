import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import ImageGallery from '../components/ImageGallery';

const galleryImages = [
  {
    url: '/images/restaurant.jpg',
    title: 'Restaurant Interior',
  },
  {
    url: '/images/chef.jpg',
    title: 'Our Chef',
  },
  {
    url: '/images/cooking.jpg',
    title: 'Cooking in Action',
  },
  {
    url: '/images/ingredients.jpg',
    title: 'Fresh Ingredients',
  },
  {
    url: '/images/dish.jpg',
    title: 'Signature Dish',
  },
  {
    url: '/images/team.jpg',
    title: 'Our Team',
  },
];

const About = () => {
  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 3 }
      }}
    >
      <Typography 
        variant="h2" 
        align="center" 
        gutterBottom
        sx={{
          fontSize: { xs: '2rem', md: '2.5rem' },
          mb: { xs: 3, md: 4 },
          color: 'primary.main'
        }}
      >
        About Little Lemon
      </Typography>

      <Grid container spacing={{ xs: 3, md: 4 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: { xs: 3, md: 4 } }}>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                mb: 2,
                color: 'primary.main'
              }}
            >
              Our Story
            </Typography>
            <Typography 
              variant="body1" 
              paragraph
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8,
                mb: { xs: 2, md: 3 }
              }}
            >
              Little Lemon is a charming Mediterranean restaurant that brings the flavors of the 
              Mediterranean coast to Chicago. Our story began with a passion for authentic cuisine 
              and a dream to create a warm, welcoming space where people can gather to enjoy 
              delicious food and create lasting memories.
            </Typography>
            <Typography 
              variant="body1" 
              paragraph
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
          </Box>

          <Box>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                mb: 2,
                color: 'primary.main'
              }}
            >
              Our Philosophy
            </Typography>
            <Typography 
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8
              }}
            >
              We believe that great food has the power to bring people together. Our mission is 
              to create an authentic Mediterranean dining experience that transports our guests 
              to the sunny coasts of Greece, Italy, and Spain. We're committed to sustainability, 
              supporting local farmers, and reducing our environmental impact.
            </Typography>
          </Box>
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
