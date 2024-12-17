import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'Menu', path: '/menu' },
    { text: 'Reservations', path: '/reservations' },
    { text: 'Order Online', path: '/order' },
  ];

  const drawer = (
    <>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.path}
            key={item.text}
            onClick={handleDrawerToggle}
          >
            <ListItemText 
              primary={item.text}
              primaryTypographyProps={{
                sx: { fontWeight: 500 }
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem
          button
          component={Link}
          to="/login"
          onClick={handleDrawerToggle}
        >
          <ListItemText 
            primary="Login"
            primaryTypographyProps={{
              sx: { fontWeight: 500 }
            }}
          />
        </ListItem>
      </List>
    </>
  );

  return (
    <Box sx={{ mb: 2 }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          bgcolor: 'background.default',
          height: 'auto'
        }}
      >
        <Container 
          maxWidth="lg"
          sx={{
            px: { xs: 2, sm: 3 }
          }}
        >
          <Toolbar 
            disableGutters 
            sx={{ 
              minHeight: '64px !important',
              py: 1
            }}
          >
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                mr: 3
              }}
            >
              <Box
                component="img"
                src={`${process.env.PUBLIC_URL}/assets/icons/Logo.svg`}
                alt="Little Lemon"
                sx={{
                  height: 50,
                  width: 'auto',
                  display: 'block'
                }}
              />
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{ 
                    color: 'text.primary',
                    fontSize: '16pt',
                    fontFamily: 'Karla, sans-serif',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    px: 2,
                    py: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  {item.text}
                </Button>
              ))}
              <Button
                component={Link}
                to="/login"
                sx={{ 
                  color: 'text.primary',
                  fontSize: '16pt',
                  fontFamily: 'Karla, sans-serif',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  px: 2,
                  py: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  ml: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ 
                display: { sm: 'none' },
                color: 'text.primary',
                p: 1,
                ml: 1
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box',
            width: 250
          },
        }}
      >
        <Box
          component="nav"
          onClick={handleDrawerToggle}
          sx={{ width: 250 }}
          role="navigation"
          aria-label="mobile navigation"
        >
          <List>
            {menuItems.map((item) => (
              <ListItem 
                key={item.text} 
                component={Link} 
                to={item.path}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem
              button
              component={Link}
              to="/login"
              sx={{
                color: 'text.primary',
                '&:hover': {
                  bgcolor: 'action.hover'
                }
              }}
            >
              <ListItemText primary="Login" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;
