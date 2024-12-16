import React, { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FormSkeleton from '../components/FormSkeleton';
import useFormPersist from '../hooks/useFormPersist';

const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Invalid email address'),
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(100, 'Subject must be less than 100 characters'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

const Contact = () => {
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const { clearSavedData } = useFormPersist(form, 'contact-form');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: '',
    severity: 'success',
  });
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const contactInfo = [
    {
      icon: <LocationOnIcon />,
      title: 'Address',
      content: '123 Main Street, Chicago, IL 60601',
    },
    {
      icon: <PhoneIcon />,
      title: 'Phone',
      content: '+1 (312) 555-0123',
    },
    {
      icon: <EmailIcon />,
      title: 'Email',
      content: 'info@littlelemon.com',
    },
    {
      icon: <AccessTimeIcon />,
      title: 'Hours',
      content: 'Mon-Sun: 11:00 AM - 10:00 PM',
    },
  ];

  const onSubmit = async (data) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSnackbar({
        open: true,
        message: 'Thank you for your message! We will get back to you soon.',
        severity: 'success',
      });
      
      clearSavedData();
      reset();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

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
          mb: { xs: 3, md: 4 },
          color: 'primary.main'
        }}
      >
        Contact Us
      </Typography>

      <Grid container spacing={{ xs: 3, md: 4 }}>
        <Grid item xs={12} md={5}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 3, md: 4 },
              height: '100%',
              borderRadius: { xs: 2, md: 3 },
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ color: 'text.primary', mb: 3 }}
              >
                Get in Touch
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ color: 'text.secondary', mb: 3 }}
              >
                Have questions about our restaurant? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </Typography>
            </Box>

            {contactInfo.map((item, index) => (
              <Box 
                key={index}
                sx={{ 
                  display: 'flex',
                  alignItems: 'flex-start',
                  mb: index !== contactInfo.length - 1 ? 3 : 0
                }}
              >
                <Box 
                  sx={{ 
                    mr: 2,
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography 
                    variant="subtitle2"
                    sx={{ color: 'text.primary', mb: 0.5 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                  >
                    {item.content}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12} md={7}>
          <Suspense fallback={<FormSkeleton fields={4} />}>
            <Paper 
              elevation={3}
              sx={{ 
                p: { xs: 3, md: 4 },
                borderRadius: { xs: 2, md: 3 }
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      {...register('name')}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      {...register('email')}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      {...register('subject')}
                      error={!!errors.subject}
                      helperText={errors.subject?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={4}
                      {...register('message')}
                      error={!!errors.message}
                      helperText={errors.message?.message}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth={isMobile}
                      disabled={isSubmitting}
                      sx={{ 
                        py: 1.5,
                        px: 4
                      }}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Suspense>
        </Grid>
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;
