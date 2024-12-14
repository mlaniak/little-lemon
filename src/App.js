import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#495E57', // Little Lemon primary green
    },
    secondary: {
      main: '#F4CE14', // Little Lemon yellow
    },
  },
  typography: {
    fontFamily: "'Karla', sans-serif",
    h1: {
      fontFamily: "'Markazi Text', serif",
    },
    h2: {
      fontFamily: "'Markazi Text', serif",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router basename="/little-lemon">
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
