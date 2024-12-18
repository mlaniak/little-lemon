import { render, screen } from "@testing-library/react";
import BookingForm from '../BookingForm';

test('Renders the BookingForm heading', () => {
    render(<BookingForm availableTimes={["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]} />);
    const headingElement = screen.getByText("Reserve a Table");
    expect(headingElement).toBeInTheDocument();
});

test('initializeTimes returns the expected times array', () => {
    const times = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    expect(times).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
});

test('updateTimes returns the same value that is provided in the state', () => {
    const times = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    expect(times).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
});
