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
      image: '/images/greek-salad.jpg',
      category: 'starters'
    },
    {
      id: 2,
      title: 'Bruschetta',
      description: 'Grilled bread topped with tomatoes, garlic, olive oil and basil',
      price: 9.99,
      image: '/images/bruschetta.jpg',
      category: 'starters'
    }
  ],
  mains: [
    {
      id: 3,
      title: 'Grilled Fish',
      description: 'Mediterranean-style grilled sea bass with lemon herb sauce',
      price: 25.99,
      image: '/images/grilled-fish.jpg',
      category: 'mains'
    },
    {
      id: 4,
      title: 'Lemon Chicken',
      description: 'Herb-crusted chicken breast with lemon butter sauce',
      price: 21.99,
      image: '/images/lemon-chicken.jpg',
      category: 'mains'
    }
  ],
  desserts: [
    {
      id: 5,
      title: 'Baklava',
      description: 'Layered phyllo pastry filled with chopped nuts and sweetened with syrup',
      price: 8.99,
      image: '/images/baklava.jpg',
      category: 'desserts'
    },
    {
      id: 6,
      title: 'Lemon Dessert',
      description: 'Our famous lemon cake with lemon glaze',
      price: 7.99,
      image: '/images/lemon-dessert.jpg',
      category: 'desserts'
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
          mx: { xs: -2, md: 0 }
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
          sx={{
            '& .MuiTab-root': {
              fontSize: { xs: '0.9rem', sm: '1rem' },
              minWidth: { xs: 'auto', sm: 160 }
            }
          }}
        >
          {categories.map((category, index) => (
            <Tab key={category} label={category} />
          ))}
        </Tabs>
      </Box>

      <Grid 
        container 
        spacing={{ xs: 2, md: 3 }}
        sx={{ 
          mt: { xs: 2, md: 3 }
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
