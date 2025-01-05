import React, { useState } from 'react';
import { Container, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import BookingForm from './BookingForm';
import ReservationTable from './ReservationTable';

const BookingPage = () => {
  const [reservations, setReservations] = useState([]);
  const [editingReservation, setEditingReservation] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reservationToDelete, setReservationToDelete] = useState(null);

  const handleSubmitSuccess = (formData) => {
    if (editingReservation) {
      // Update existing reservation
      setReservations(reservations.map(res => 
        res.id === editingReservation.id ? { ...formData, id: res.id } : res
      ));
      setEditingReservation(null);
    } else {
      // Add new reservation
      setReservations([...reservations, { ...formData, id: Date.now() }]);
    }
  };

  const handleEdit = (reservation) => {
    setEditingReservation(reservation);
  };

  const handleDelete = (reservation) => {
    setReservationToDelete(reservation);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setReservations(reservations.filter(res => res.id !== reservationToDelete.id));
    setDeleteDialogOpen(false);
    setReservationToDelete(null);
  };

  const handleCancel = () => {
    setEditingReservation(null);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4 }}>
        {editingReservation ? 'Edit Reservation' : 'Make a Reservation'}
      </Typography>
      
      <BookingForm
        onSubmitSuccess={handleSubmitSuccess}
        initialValues={editingReservation}
        onCancel={editingReservation ? handleCancel : undefined}
        isEditing={!!editingReservation}
      />

      <ReservationTable
        reservations={reservations}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Deletion
        </DialogTitle>
        <DialogContent>
          Are you sure you want to delete this reservation?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookingPage;
