import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const MenuItem = ({ title, description, price, image }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: { xs: 2, md: 3 },
        boxShadow: { 
          xs: '0 2px 4px rgba(0,0,0,0.1)', 
          md: '0 4px 8px rgba(0,0,0,0.1)' 
        },
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.3s ease-in-out',
          boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
        }
      }}
    >
      <CardMedia
        component="img"
        height={{ xs: '160', sm: '180', md: '200' }}
        image={image}
        alt={title}
        sx={{ 
          objectFit: 'cover',
          borderTopLeftRadius: { xs: 8, md: 12 },
          borderTopRightRadius: { xs: 8, md: 12 }
        }}
      />
      <CardContent 
        sx={{ 
          flexGrow: 1,
          p: { xs: 2, md: 3 }
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: { xs: 1, md: 2 }
          }}
        >
          <Typography 
            variant="h6" 
            component="h3"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              fontWeight: 'bold',
              color: 'primary.main'
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h6" 
            color="primary" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              color: 'secondary.main'
            }}
          >
            ${price}
          </Typography>
        </Box>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            fontSize: { xs: '0.875rem', md: '1rem' },
            lineHeight: 1.6,
            mt: { xs: 1, md: 1.5 }
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MenuItem;
