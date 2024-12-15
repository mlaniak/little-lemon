import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';

const Order = () => {
  const [cart, setCart] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const menuItems = {
    starters: [
      {
        id: 1,
        title: 'Greek Salad',
        description: 'Fresh cucumbers, crispy lettuce, tomatoes, olives, feta cheese',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000'
      },
      {
        id: 2,
        title: 'Bruschetta',
        description: 'Grilled bread topped with tomatoes, garlic, olive oil and basil',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=1000'
      }
    ],
    mains: [
      {
        id: 3,
        title: 'Grilled Fish',
        description: 'Mediterranean-style grilled sea bass with lemon herb sauce',
        price: 25.99,
        image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=1000'
      },
      {
        id: 4,
        title: 'Lemon Chicken',
        description: 'Herb-crusted chicken breast with lemon butter sauce',
        price: 21.99,
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1000'
      }
    ],
    desserts: [
      {
        id: 5,
        title: 'Lemon Dessert',
        description: 'Our famous lemon cake with lemon glaze',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1000'
      },
      {
        id: 6,
        title: 'Baklava',
        description: 'Layered phyllo pastry filled with chopped nuts and sweetened with syrup',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?q=80&w=1000'
      }
    ]
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    setSnackbar({
      open: true,
      message: `${item.title} added to cart!`,
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const renderMenuSection = (title, items) => (
    <Box sx={{ mb: 6 }}>
      <Typography 
        variant="h3" 
        sx={{ 
          fontFamily: "'Markazi Text', serif",
          fontSize: { xs: '2rem', md: '2.5rem' },
          mb: 3,
          color: 'primary.main'
        }}
      >
        {title}
      </Typography>
      <Grid container spacing={4}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card 
              sx={{ 
                height: '460px',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s ease-in-out',
                  boxShadow: 3
                }
              }}
            >
              <Box sx={{ 
                height: '260px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.title}
                  sx={{ 
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
              </Box>
              <CardContent sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                p: 3
              }}>
                <Box sx={{ mb: 2 }}>
                  <Typography 
                    variant="h6" 
                    component="div"
                    sx={{ 
                      fontWeight: 500,
                      mb: 1
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      mb: 2,
                      minHeight: '40px'
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    mt: 'auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography 
                    variant="h6" 
                    color="primary.main"
                    sx={{ fontWeight: 500 }}
                  >
                    ${item.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => addToCart(item)}
                    sx={{
                      textTransform: 'none'
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  return (
    <Container 
      maxWidth={false}
      sx={{ 
        maxWidth: 'lg',
        width: '100%',
        px: { xs: 2, sm: 3, md: 6 },
        py: { xs: 4, md: 6 }
      }}
    >
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
        Order Online
      </Typography>

      {renderMenuSection('Starters', menuItems.starters)}
      {renderMenuSection('Main Courses', menuItems.mains)}
      {renderMenuSection('Desserts', menuItems.desserts)}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Order;
