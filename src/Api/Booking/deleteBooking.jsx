import { API_BOOKINGS } from "../Constants.jsx"; // <- Pass på path
import { getHeaders } from "../Headers.jsx";

export async function deleteBooking(bookingId) {
    try {
        const response = await fetch(`${API_BOOKINGS}/${bookingId}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to delete booking');
        }

        return true;
    } catch (error) {
        throw error;
    }
}
