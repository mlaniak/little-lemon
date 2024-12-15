import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const MenuItem = ({ title, description, price, image }) => {
  return (
    <Card 
      sx={{ 
        width: '100%',
        height: 460,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        bgcolor: 'background.paper',
        overflow: 'hidden',
        transition: '0.3s',
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
          image={image}
          alt={title}
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
            {title}
          </Typography>
          <Typography 
            variant="h6" 
            component="div"
            sx={{ 
              color: 'primary.main',
              fontWeight: 500
            }}
          >
            ${price}
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
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MenuItem;
