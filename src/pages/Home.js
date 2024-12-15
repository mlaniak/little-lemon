import React from 'react';
import { Container, Typography, Button, Box, Grid, Card, CardContent, CardMedia, Rating } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  const highlights = [
    {
      title: "Greek Salad",
      price: "$12.99",
      description: "Fresh cucumbers, crispy lettuce, tomatoes, olives, feta cheese with our house-made Greek dressing",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=500"
    },
    {
      title: "Bruschetta",
      price: "$9.99",
      description: "Grilled bread topped with tomatoes, garlic, olive oil and basil",
      image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=500"
    },
    {
      title: "Lemon Dessert",
      price: "$7.99",
      description: "Our famous lemon cake with lemon glaze",
      image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      comment: "Best Mediterranean food in Chicago! The atmosphere is wonderful and the service is excellent.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
    },
    {
      name: "John D.",
      rating: 5,
      comment: "The Greek salad and bruschetta are must-tries. Will definitely be coming back!",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200"
    },
    {
      name: "Emily R.",
      rating: 5,
      comment: "Perfect place for special occasions. The lemon dessert is absolutely divine!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 4, md: 6 },
          mb: 4
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 2, md: 4 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h1" sx={{ fontSize: { xs: '3rem', md: '4rem' }, mb: 2 }}>
                Little Lemon
              </Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2 }}>
                Chicago
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
              </Typography>
              <Button
                component={RouterLink}
                to="/reservations"
                variant="contained"
                sx={{
                  bgcolor: 'secondary.main',
                  color: 'black',
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                  },
                }}
              >
                Reserve a Table
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000"
                alt="Restaurant ambiance"
                sx={{
                  width: '100%',
                  height: { xs: '300px', md: '400px' },
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Highlights Section */}
      <Container 
        maxWidth={false}
        sx={{ 
          maxWidth: 'lg',
          width: '100%',
          px: { xs: 2, sm: 3, md: 6 },
          mb: { xs: 6, md: 8 }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          width: '100%'
        }}>
          <Typography variant="h2" sx={{ fontFamily: "'Markazi Text', serif", fontSize: { xs: '2rem', md: '2.5rem' } }}>
            This Week's Specials
          </Typography>
          <Button
            component={RouterLink}
            to="/menu"
            variant="contained"
            sx={{
              bgcolor: 'secondary.main',
              '&:hover': { bgcolor: 'secondary.dark' }
            }}
          >
            Online Menu
          </Button>
        </Box>
        
        <Box sx={{ 
          display: 'flex',
          overflowX: 'auto',
          gap: 4,
          pb: 2,
          px: 1,
          mx: -1,
          '::-webkit-scrollbar': {
            height: 8,
          },
          '::-webkit-scrollbar-track': {
            bgcolor: 'grey.100',
            borderRadius: 4,
          },
          '::-webkit-scrollbar-thumb': {
            bgcolor: 'grey.400',
            borderRadius: 4,
          },
        }}>
          {highlights.map((item, index) => (
            <Card 
              key={index}
              component={RouterLink}
              to="/menu"
              sx={{ 
                width: 320,
                height: 460,
                minWidth: 320,
                maxWidth: 320,
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: '0.3s',
                bgcolor: 'background.paper',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              <Box sx={{ 
                position: 'relative',
                width: '100%',
                height: 260,
                overflow: 'hidden'
              }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{ 
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </Box>
              <CardContent sx={{ 
                p: 3,
                flexGrow: 1,
                display: 'flex', 
                flexDirection: 'column',
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mb: 2 
                }}>
                  <Typography 
                    variant="h6" 
                    component="div"
                    sx={{ 
                      fontWeight: 500,
                      color: 'text.primary'
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    component="div"
                    sx={{ 
                      color: 'primary.main',
                      fontWeight: 500
                    }}
                  >
                    {item.price}
                  </Typography>
                </Box>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ 
                    flexGrow: 1,
                    lineHeight: 1.6,
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Testimonials Section */}
      <Box 
        sx={{ 
          bgcolor: 'grey.100',
          py: { xs: 6, md: 8 },
          mb: { xs: 6, md: 8 }
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              mb: { xs: 4, md: 5 }
            }}
          >
            What Our Customers Say
          </Typography>
          <Grid container spacing={3}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    bgcolor: 'white',
                    boxShadow: 2
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 2
                      }}
                    >
                      <Box
                        component="img"
                        src={testimonial.image}
                        alt={testimonial.name}
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          mr: 2
                        }}
                      />
                      <Box>
                        <Typography variant="h6" component="h3">
                          {testimonial.name}
                        </Typography>
                        <Rating value={testimonial.rating} readOnly size="small" />
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      "{testimonial.comment}"
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          mb: { xs: 6, md: 8 }
        }}
      >
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h2" 
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                mb: { xs: 2, md: 3 }
              }}
            >
              Little Lemon
            </Typography>
            <Typography 
              variant="h3" 
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                mb: { xs: 2, md: 3 }
              }}
            >
              Chicago
            </Typography>
            <Typography 
              variant="body1"
              sx={{
                mb: 2,
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.8
              }}
            >
              Little Lemon opened in 1995 by two Italian brothers, bringing their grandmother's recipes from the Mediterranean to Chicago. The restaurant has been serving delicious, authentic Mediterranean cuisine ever since, using fresh, locally-sourced ingredients and traditional cooking methods.
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.8 }}>
              Our cozy atmosphere and friendly staff make every visit special, whether you're joining us for a casual dinner or celebrating a special occasion.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 2
              }}
            >
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1000"
                alt="Restaurant interior"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3
                }}
              />
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=1000"
                alt="Our chefs"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Footer Navigation */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 4, md: 6 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                About Us
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Little Lemon is a family-owned Mediterranean restaurant in Chicago.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                Contact Us
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Phone: 555-555-5555
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Email: [info@littlelemon.com](mailto:info@littlelemon.com)
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                Social Media
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Follow us on social media to stay up-to-date on our latest news and promotions.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                Online Ordering
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Order online for delivery or pickup.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
