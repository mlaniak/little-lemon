import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingForm from '../BookingForm';
import { BookingsProvider } from '../../providers/BookingsProvider';
import { BrowserRouter } from 'react-router-dom';

const renderBookingForm = () => {
  return render(
    <BrowserRouter>
      <BookingsProvider>
        <BookingForm />
      </BookingsProvider>
    </BrowserRouter>
  );
};

describe('BookingForm HTML5 Validation', () => {
  test('name input has correct validation attributes', () => {
    renderBookingForm();
    const nameInput = screen.getByLabelText(/name/i);
    expect(nameInput).toHaveAttribute('minLength', '2');
    expect(nameInput).toHaveAttribute('maxLength', '50');
    expect(nameInput).toBeRequired();
  });

  test('email input has correct validation attributes', () => {
    renderBookingForm();
    const emailInput = screen.getByLabelText(/email/i);
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toBeRequired();
    expect(emailInput).toHaveAttribute('pattern', '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$');
  });

  test('phone input has correct validation attributes', () => {
    renderBookingForm();
    const phoneInput = screen.getByLabelText(/phone/i);
    expect(phoneInput).toHaveAttribute('type', 'tel');
    expect(phoneInput).toBeRequired();
    expect(phoneInput).toHaveAttribute('pattern', '[0-9]{10}');
  });

  test('guests input has correct validation attributes', () => {
    renderBookingForm();
    const guestsInput = screen.getByLabelText(/number of guests/i);
    expect(guestsInput).toHaveAttribute('type', 'number');
    expect(guestsInput).toHaveAttribute('min', '1');
    expect(guestsInput).toHaveAttribute('max', '10');
  });
});

describe('BookingForm JavaScript Validation', () => {
  test('displays error when name is too short', async () => {
    renderBookingForm();
    const nameInput = screen.getByLabelText(/name/i);
    await userEvent.type(nameInput, 'a');
    fireEvent.blur(nameInput);
    expect(await screen.findByText(/name must be at least 2 characters/i)).toBeInTheDocument();
  });

  test('accepts valid name input', async () => {
    renderBookingForm();
    const nameInput = screen.getByLabelText(/name/i);
    await userEvent.type(nameInput, 'John Doe');
    fireEvent.blur(nameInput);
    await waitFor(() => {
      expect(screen.queryByText(/name must be at least 2 characters/i)).not.toBeInTheDocument();
    });
  });

  test('displays error for invalid email format', async () => {
    renderBookingForm();
    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);
    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
  });

  test('accepts valid email input', async () => {
    renderBookingForm();
    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.type(emailInput, 'test@example.com');
    fireEvent.blur(emailInput);
    await waitFor(() => {
      expect(screen.queryByText(/invalid email address/i)).not.toBeInTheDocument();
    });
  });

  test('displays error for invalid phone number', async () => {
    renderBookingForm();
    const phoneInput = screen.getByLabelText(/phone/i);
    await userEvent.type(phoneInput, '123');
    fireEvent.blur(phoneInput);
    expect(await screen.findByText(/phone number must be 10 digits/i)).toBeInTheDocument();
  });

  test('accepts valid phone number', async () => {
    renderBookingForm();
    const phoneInput = screen.getByLabelText(/phone/i);
    await userEvent.type(phoneInput, '1234567890');
    fireEvent.blur(phoneInput);
    await waitFor(() => {
      expect(screen.queryByText(/phone number must be 10 digits/i)).not.toBeInTheDocument();
    });
  });

  test('displays error for invalid number of guests', async () => {
    renderBookingForm();
    const guestsInput = screen.getByLabelText(/number of guests/i);
    await userEvent.type(guestsInput, '11');
    fireEvent.blur(guestsInput);
    expect(await screen.findByText(/maximum 10 guests allowed/i)).toBeInTheDocument();
  });

  test('accepts valid number of guests', async () => {
    renderBookingForm();
    const guestsInput = screen.getByLabelText(/number of guests/i);
    await userEvent.type(guestsInput, '4');
    fireEvent.blur(guestsInput);
    await waitFor(() => {
      expect(screen.queryByText(/maximum 10 guests allowed/i)).not.toBeInTheDocument();
    });
  });

  test('submit button is disabled when form is invalid', () => {
    renderBookingForm();
    const submitButton = screen.getByRole('button', { name: /reserve table/i });
    expect(submitButton).toBeDisabled();
  });

  test('submit button is enabled when form is valid', async () => {
    renderBookingForm();
    
    // Fill in all required fields with valid data
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(screen.getByLabelText(/phone/i), '1234567890');
    await userEvent.type(screen.getByLabelText(/number of guests/i), '4');
    
    // Select date
    const dateInput = screen.getByPlaceholderText(/select date/i);
    fireEvent.change(dateInput, { target: { value: '2024-12-25' } });
    
    // Select time
    const timeSelect = screen.getByLabelText(/reservation time/i);
    fireEvent.mouseDown(timeSelect);
    const timeOption = await screen.findByText('18:00');
    fireEvent.click(timeOption);
    
    // Select occasion
    const occasionSelect = screen.getByLabelText(/occasion/i);
    fireEvent.mouseDown(occasionSelect);
    const occasionOption = await screen.findByText('Birthday');
    fireEvent.click(occasionOption);
    
    // Select seating
    const seatingSelect = screen.getByLabelText(/seating preference/i);
    fireEvent.mouseDown(seatingSelect);
    const seatingOption = await screen.findByText('Indoor');
    fireEvent.click(seatingOption);

    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /reserve table/i });
      expect(submitButton).not.toBeDisabled();
    });
  });
});
