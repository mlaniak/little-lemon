import React from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent, CardMedia, Rating, Avatar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SocialShare from '../components/SocialShare';

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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
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
          </Box>

          <Grid container spacing={4}>
            {specials.map((special, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <article style={{ height: '100%' }}>
                  <Card 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      borderRadius: 2, 
                      overflow: 'hidden', 
                      boxShadow: 2, 
                      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                      },
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6
                      }
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        pt: '56.25%', // 16:9 aspect ratio
                        overflow: 'hidden',
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={special.image}
                        alt={special.title}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          }
                        }}
                      />
                    </Box>
                    <CardContent 
                      sx={{ 
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: 'background.paper',
                        p: 3
                      }}
                    >
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          mb: 2
                        }}
                      >
                        <Typography 
                          variant="h6" 
                          component="h3"
                          sx={{
                            fontWeight: 'bold',
                            color: 'text.primary',
                            transition: 'color 0.2s ease-in-out',
                            '&:hover': {
                              color: 'primary.main',
                            }
                          }}
                        >
                          {special.title}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            color: 'primary.main',
                            fontWeight: 500,
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                              transform: 'scale(1.05)',
                            }
                          }}
                        >
                          {special.price}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          mb: 2,
                          flexGrow: 1
                        }}
                      >
                        {special.description}
                      </Typography>
                      <Button
                        size="medium"
                        sx={{ 
                          alignSelf: 'flex-start',
                          color: 'text.primary',
                          pl: 0,
                          position: 'relative',
                          '&:hover': {
                            bgcolor: 'transparent',
                            color: 'primary.main',
                          },
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            width: '0%',
                            height: '2px',
                            bottom: 0,
                            left: 0,
                            bgcolor: 'primary.main',
                            transition: 'width 0.3s ease-in-out',
                          },
                          '&:hover::after': {
                            width: '100%',
                          }
                        }}
                      >
                        Order a delivery
                      </Button>
                    </CardContent>
                  </Card>
                </article>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Testimonials Section */}
      <section aria-label="testimonials">
        <Box sx={{ bgcolor: 'primary.main', py: { xs: 6, md: 8 }, color: 'white' }}>
          <Container maxWidth="lg">
            <Typography variant="h4" component="h2" align="center" sx={{ mb: 6, color: 'white', fontWeight: 'bold', textTransform: 'uppercase' }}>
              What our customers say
            </Typography>
            <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
              {testimonials.map((testimonial, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
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
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
                      </Box>
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
                </Grid>
              ))}
            </Grid>
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
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ position: 'relative', height: 300, width: '100%', borderRadius: 2, overflow: 'hidden' }}>
                      <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800" alt="Chef cooking with flames" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ position: 'relative', height: 300, width: '100%', borderRadius: 2, overflow: 'hidden' }}>
                      <img src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800" alt="Chef presenting a dish" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Box>
                  </Grid>
                </Grid>
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