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
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" align="center" gutterBottom>
        Our Menu
      </Typography>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          {categories.map((category, index) => (
            <Tab label={category} key={index} />
          ))}
        </Tabs>
      </Box>

      <Grid container spacing={4}>
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
