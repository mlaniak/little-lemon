import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TableSortLabel,
  TextField,
  Box,
  MenuItem,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useBookingsContext } from '../contexts/BookingsContext';
import BookingForm from './BookingForm';

const BookingsList = () => {
  const { bookings, releaseBooking, editBooking } = useBookingsContext();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [orderBy, setOrderBy] = useState('date');
  const [order, setOrder] = useState('asc');
  const [filters, setFilters] = useState({
    name: '',
    date: '',
    occasion: '',
  });

  const formatTime = (time) => {
    if (time.includes('AM') || time.includes('PM')) return time;
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleDeleteClick = (booking, index) => {
    setSelectedBooking({ ...booking, index });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    releaseBooking(selectedBooking.index);
    setDeleteDialogOpen(false);
    setSelectedBooking(null);
  };

  const handleEditClick = (booking, index) => {
    setSelectedBooking({ ...booking, index });
    setEditDialogOpen(true);
  };

  const handleEditSave = (updatedBooking) => {
    editBooking(selectedBooking.index, updatedBooking);
    setEditDialogOpen(false);
    setSelectedBooking(null);
  };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const filteredBookings = bookings
    .filter((booking) => {
      return (
        booking.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        (!filters.date || booking.date.includes(filters.date)) &&
        (!filters.occasion || booking.occasion === filters.occasion)
      );
    })
    .sort((a, b) => {
      const compareValue = (va, vb) => (va < vb ? -1 : va > vb ? 1 : 0);
      const value = compareValue(a[orderBy], b[orderBy]);
      return order === 'asc' ? value : -value;
    });

  if (!bookings || bookings.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 2 }}>
        No bookings found.
      </Typography>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Tooltip title="Filter Bookings">
          <IconButton onClick={() => setFilterDialogOpen(true)}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="bookings table">
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'date'}
                  direction={orderBy === 'date' ? order : 'asc'}
                  onClick={() => handleSort('date')}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Guests</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'occasion'}
                  direction={orderBy === 'occasion' ? order : 'asc'}
                  onClick={() => handleSort('occasion')}
                >
                  Occasion
                </TableSortLabel>
              </TableCell>
              <TableCell>Seating</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBookings.map((booking, index) => (
              <TableRow key={index}>
                <TableCell>{booking.name}</TableCell>
                <TableCell>{new Date(booking.date).toLocaleDateString()}</TableCell>
                <TableCell>{formatTime(booking.time)}</TableCell>
                <TableCell>{booking.guests}</TableCell>
                <TableCell>{booking.occasion}</TableCell>
                <TableCell>{booking.seating}</TableCell>
                <TableCell>
                  {booking.email}<br />{booking.phone}
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit Booking">
                    <IconButton
                      onClick={() => handleEditClick(booking, index)}
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Release Booking">
                    <IconButton
                      onClick={() => handleDeleteClick(booking, index)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Release Booking</DialogTitle>
        <DialogContent>
          Are you sure you want to release this booking for {selectedBooking?.name} on{' '}
          {selectedBooking?.date && new Date(selectedBooking.date).toLocaleDateString()} at {formatTime(selectedBooking?.time || '')}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Release
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Booking</DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <BookingForm
              initialValues={{
                ...selectedBooking,
                date: new Date(selectedBooking.date)
              }}
              onSubmit={handleEditSave}
              onCancel={() => setEditDialogOpen(false)}
              isEditing={true}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)}>
        <DialogTitle>Filter Bookings</DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            value={filters.name}
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="date"
            label="Date"
            type="date"
            value={filters.date}
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="occasion"
            label="Occasion"
            select
            value={filters.occasion}
            onChange={handleFilterChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="Birthday">Birthday</MenuItem>
            <MenuItem value="Anniversary">Anniversary</MenuItem>
            <MenuItem value="Engagement">Engagement</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFilterDialogOpen(false)}>Close</Button>
          <Button
            onClick={() => {
              setFilters({ name: '', date: '', occasion: '' });
              setFilterDialogOpen(false);
            }}
            color="primary"
          >
            Clear Filters
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookingsList;
