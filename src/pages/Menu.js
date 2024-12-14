import React from 'react';
import { Container, Typography, Grid, Box, Tabs, Tab } from '@mui/material';
import MenuItem from '../components/MenuItem';

const menuItems = {
  starters: [
    {
      id: 1,
      title: 'Greek Salad',
      description: 'Fresh cucumbers, crispy lettuce, tomatoes, olives, feta cheese with our house-made Greek dressing',
      price: 12.99,
      image: '/images/greek-salad.jpg'
    },
    {
      id: 2,
      title: 'Bruschetta',
      description: 'Grilled bread topped with tomatoes, garlic, olive oil and basil',
      price: 9.99,
      image: '/images/bruschetta.jpg'
    }
  ],
  mains: [
    {
      id: 3,
      title: 'Grilled Fish',
      description: 'Mediterranean-style grilled sea bass with lemon herb sauce',
      price: 25.99,
      image: '/images/grilled-fish.jpg'
    },
    {
      id: 4,
      title: 'Lemon Chicken',
      description: 'Herb-crusted chicken breast with lemon butter sauce',
      price: 21.99,
      image: '/images/lemon-chicken.jpg'
    }
  ],
  desserts: [
    {
      id: 5,
      title: 'Baklava',
      description: 'Layered phyllo pastry filled with chopped nuts and sweetened with syrup',
      price: 8.99,
      image: '/images/baklava.jpg'
    },
    {
      id: 6,
      title: 'Lemon Dessert',
      description: 'Our famous lemon cake with lemon glaze',
      price: 7.99,
      image: '/images/lemon-dessert.jpg'
    }
  ]
};

const Menu = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const categories = ['Starters', 'Main Courses', 'Desserts'];
  const menuCategories = ['starters', 'mains', 'desserts'];

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
          mb: { xs: 3, md: 4 }
        }}
      >
        Our Menu
      </Typography>
      
      <Box 
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider', 
          mb: { xs: 3, md: 4 },
          mx: { xs: -2, md: 0 } // Compensate for container padding on mobile
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            '& .MuiTab-root': {
              fontSize: { xs: '0.875rem', md: '1rem' },
              minWidth: { xs: 'auto', md: 160 },
              px: { xs: 2, md: 3 },
            }
          }}
        >
          {categories.map((category, index) => (
            <Tab 
              label={category} 
              key={index}
              sx={{
                '&.Mui-selected': {
                  color: 'primary.main',
                  fontWeight: 'bold'
                }
              }}
            />
          ))}
        </Tabs>
      </Box>

      <Grid 
        container 
        spacing={{ xs: 2, md: 4 }}
        sx={{
          mt: { xs: 1, md: 2 }
        }}
      >
        {menuItems[menuCategories[value]].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <MenuItem {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Menu;
