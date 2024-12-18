import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservations from './pages/Reservations';
import About from './pages/About';
import Order from './pages/Order';
import Login from './pages/Login';
import ConfirmedBooking from './pages/ConfirmedBooking';
import { BookingsProvider } from './providers/BookingsProvider';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#495E57',
    },
    secondary: {
      main: '#F4CE14',
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
    <BrowserRouter basename="/little-lemon">
      <BookingsProvider>
        <ThemeProvider theme={theme}>
          <div className="app">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/booking-confirmed" element={<ConfirmedBooking />} />
                <Route path="/order" element={<Order />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </BookingsProvider>
    </BrowserRouter>
  );
}

export default App;
