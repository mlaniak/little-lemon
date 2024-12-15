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
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000',
      category: 'starters'
    },
    {
      id: 2,
      title: 'Bruschetta',
      description: 'Grilled bread topped with tomatoes, garlic, olive oil and basil',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=1000',
      category: 'starters'
    }
  ],
  mains: [
    {
      id: 3,
      title: 'Grilled Fish',
      description: 'Mediterranean-style grilled sea bass with lemon herb sauce',
      price: 25.99,
      image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=1000',
      category: 'mains'
    },
    {
      id: 4,
      title: 'Lemon Chicken',
      description: 'Herb-crusted chicken breast with lemon butter sauce',
      price: 21.99,
      image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1000',
      category: 'mains'
    }
  ],
  desserts: [
    {
      id: 5,
      title: 'Baklava',
      description: 'Layered phyllo pastry filled with chopped nuts and sweetened with syrup',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?q=80&w=1000',
      category: 'desserts'
    },
    {
      id: 6,
      title: 'Lemon Dessert',
      description: 'Our famous lemon cake with lemon glaze',
      price: 7.99,
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=1000',
      category: 'desserts'
    }
  ]
};

const Menu = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        Our Menu
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Starters" />
          <Tab label="Main Courses" />
          <Tab label="Desserts" />
        </Tabs>
      </Box>

      <Box role="tabpanel" hidden={value !== 0}>
        <Grid container spacing={4}>
          {menuItems.starters.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <MenuItem {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box role="tabpanel" hidden={value !== 1}>
        <Grid container spacing={4}>
          {menuItems.mains.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <MenuItem {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box role="tabpanel" hidden={value !== 2}>
        <Grid container spacing={4}>
          {menuItems.desserts.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <MenuItem {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Menu;
