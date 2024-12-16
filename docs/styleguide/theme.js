// Theme configuration for Material-UI

const theme = {
  palette: {
    primary: {
      main: '#495E57',  // Primary green
      secondary: '#F4CE14',  // Primary yellow
    },
    secondary: {
      main: '#EE9972',  // Salmon orange
      light: '#FBDABB',  // Peach
    },
    background: {
      default: '#FFFFFF',
      paper: '#EDEFEE',  // Light gray
    },
    text: {
      primary: '#333333',  // Dark gray
    }
  },
  typography: {
    fontFamily: "'Karla', sans-serif",
    displayTitle: {
      fontFamily: "'Markazi Text', serif",
      fontSize: '64pt',
      fontWeight: 500, // Medium
    },
    subTitle: {
      fontFamily: "'Markazi Text', serif",
      fontSize: '40pt',
      fontWeight: 400, // Regular
    },
    leadText: {
      fontFamily: "'Markazi Text', serif",
      fontSize: '18pt',
      fontWeight: 500, // Medium
    },
    sectionTitle: {
      fontFamily: "'Karla', sans-serif",
      fontSize: '20pt',
      fontWeight: 800, // Extra Bold
      textTransform: 'uppercase',
    },
    sectionCategories: {
      fontFamily: "'Karla', sans-serif",
      fontSize: '16pt',
      fontWeight: 800, // Extra Bold
    },
    cardTitle: {
      fontFamily: "'Karla', sans-serif",
      fontSize: '18pt',
      fontWeight: 700, // Bold
    },
    body1: {
      fontFamily: "'Karla', sans-serif",
      fontSize: '16pt',
      fontWeight: 400, // Regular
      lineHeight: 1.5,
      maxWidth: '65ch', // Approximately 65 characters
    },
    highlightText: {
      fontFamily: "'Karla', sans-serif",
      fontSize: '16pt',
      fontWeight: 500, // Medium
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      },
    },
  },
};

export default theme;
