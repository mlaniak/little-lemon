import React from 'react';
import { Container, Typography, Button, Box, Card, CardContent, CardMedia, Rating, Avatar, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SocialShare from '../components/SocialShare';
import GridLayout from '../components/GridLayout';
import FlexLayout from '../components/FlexLayout';

const Home = () => {
  const specials = [
    {
      title: "Greek salad",
      price: "$12.99",
      description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=500"
    },
    {
      title: "Bruchetta",
      price: "$ 5.99",
      description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.",
      image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=500"
    },
    {
      title: "Lemon Dessert",
      price: "$ 5.00",
      description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined.",
      image: "https://images.unsplash.com/photo-1582716401301-b2407dc7563d?q=80&w=500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      review: "Best Mediterranean food in Chicago! The atmosphere is wonderful and the service is excellent.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
      date: "January 2022"
    },
    {
      name: "John D.",
      rating: 5,
      review: "The Greek salad and bruschetta are must-tries. Will definitely be coming back!",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
      date: "February 2022"
    },
    {
      name: "Emily R.",
      rating: 5,
      review: "Perfect place for special occasions. The lemon dessert is absolutely divine!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
      date: "March 2022"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section aria-label="hero">
        <Box sx={{ bgcolor: 'primary.main', color: 'white', py: { xs: 6, md: 8 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 'bold',
                    mb: 2
                  }}
                >
                  Little Lemon
                </Typography>
                <Typography 
                  variant="h2"
                  sx={{
                    fontSize: { xs: '1.75rem', md: '2.5rem' },
                    mb: 3
                  }}
                >
                  Chicago
                </Typography>
                <Typography 
                  variant="body1"
                  sx={{
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    mb: 4,
                    maxWidth: 'md'
                  }}
                >
                  We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                </Typography>
                <Button
                  component={RouterLink}
                  to="/reservations"
                  variant="contained"
                  sx={{
                    bgcolor: 'secondary.main',
                    color: 'text.primary',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    py: 1.5,
                    px: 4,
                    '&:hover': {
                      bgcolor: 'secondary.dark'
                    }
                  }}
                >
                  Reserve a Table
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src={`${process.env.PUBLIC_URL}/assets/images/restaurant.jpg`}
                  alt="Restaurant interior"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: 3
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </section>

      {/* Specials Section */}
      <section aria-label="specials">
        <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
          <FlexLayout justify="space-between" align="center" sx={{ mb: 4 }}>
            <Typography 
              variant="h2"
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' }
              }}
            >
              This week's specials!
            </Typography>
            <Button
              component={RouterLink}
              to="/menu"
              variant="contained"
              sx={{
                bgcolor: 'secondary.main',
                color: 'text.primary',
                fontSize: { xs: '0.9rem', md: '1rem' },
                py: 1,
                px: 3,
                '&:hover': {
                  bgcolor: 'secondary.dark'
                }
              }}
            >
              Online Menu
            </Button>
          </FlexLayout>

          <GridLayout>
            {specials.map((special, index) => (
              <Card 
                key={index}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  borderRadius: 2, 
                  overflow: 'hidden', 
                  boxShadow: 2, 
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    pt: '56.25%', // 16:9 aspect ratio
                    overflow: 'hidden'
                  }}
                >
                  <CardMedia
                    component="img"
                    image={special.image}
                    alt={special.name}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <FlexLayout justify="space-between" align="center" sx={{ mb: 2 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                      {special.title}
                    </Typography>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'primary.main',
                        fontWeight: 'bold' 
                      }}
                    >
                      {special.price}
                    </Typography>
                  </FlexLayout>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {special.description}
                  </Typography>
                  <Button
                    variant="text"
                    color="primary"
                    sx={{
                      p: 0,
                      '&:hover': {
                        bgcolor: 'transparent',
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Order a delivery
                  </Button>
                </CardContent>
              </Card>
            ))}
          </GridLayout>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section aria-label="testimonials">
        <Box sx={{ bgcolor: 'primary.main', py: { xs: 6, md: 8 }, color: 'white' }}>
          <Container maxWidth="lg">
            <Typography variant="h4" component="h2" align="center" sx={{ mb: 6, color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>
              What our customers say
            </Typography>
            <GridLayout>
              {testimonials.map((testimonial, index) => (
                <Card 
                  key={index}
                  sx={{ 
                    height: '100%',
                    minHeight: '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent 
                    sx={{ 
                      p: 3, 
                      flex: 1,
                      display: 'flex', 
                      flexDirection: 'column',
                      gap: 2
                    }}
                  >
                    <FlexLayout align="center" sx={{ mb: 1 }}>
                      <Avatar 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        sx={{ 
                          width: 64, 
                          height: 64, 
                          mr: 2, 
                          border: 2, 
                          borderColor: 'primary.main' 
                        }} 
                      />
                      <Box>
                        <Typography 
                          variant="h6" 
                          component="h3" 
                          sx={{ 
                            fontWeight: 'bold', 
                            color: 'text.primary',
                            mb: 0.5
                          }}
                        >
                          {testimonial.name}
                        </Typography>
                        <Rating value={testimonial.rating} readOnly size="small" sx={{ color: 'secondary.main' }} />
                      </Box>
                    </FlexLayout>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        flex: 1,
                        fontStyle: 'italic',
                        color: 'text.secondary',
                        lineHeight: 1.6
                      }}
                    >
                      "{testimonial.review}"
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {testimonial.date}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </GridLayout>
          </Container>
        </Box>
      </section>

      {/* About Section */}
      <section aria-label="about">
        <Box sx={{ bgcolor: 'background.paper', py: { xs: 8, md: 12 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="h2" component="h2" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main' }}>
                    Little Lemon
                  </Typography>
                  <Typography variant="h4" component="h3" sx={{ mb: 4, color: 'text.primary' }}>
                    Chicago
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.8 }}>
                    Little Lemon opened in 1995 by two Italian brothers, bringing their grandmother's recipes from the Mediterranean to Chicago. The restaurant has been serving delicious, authentic Mediterranean cuisine ever since, using fresh, locally-sourced ingredients and traditional cooking methods.
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                    Our cozy atmosphere and friendly staff make every visit special, whether you're joining us for a casual dinner or celebrating a special occasion.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ position: 'relative', height: 500, width: '100%' }}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '60%',
                      height: '350px',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: 3,
                      zIndex: 1
                    }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800" 
                      alt="Chef cooking with flames" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: '60%',
                      height: '350px',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: 3,
                      zIndex: 2
                    }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800" 
                      alt="Chef presenting a dish" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </section>

      {/* Social Share Section */}
      <section aria-label="social-share">
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            align="center" 
            sx={{ 
              mb: 2,
              color: 'text.primary',
              fontWeight: 'bold'
            }}
          >
            Share Little Lemon
          </Typography>
          <Typography 
            variant="body1" 
            align="center" 
            sx={{ 
              mb: 3,
              color: 'text.secondary'
            }}
          >
            Love our food? Share the experience with your friends!
          </Typography>
          <SocialShare 
            title="Little Lemon - Mediterranean Restaurant in Chicago"
            description="Experience authentic Mediterranean cuisine with a modern twist at Little Lemon, Chicago's favorite family-owned restaurant."
            image={`${window.location.origin}/og-image.jpg`}
          />
        </Container>
      </section>

      {/* Footer Navigation */}
   
    </>
  );
};

export default Home;
