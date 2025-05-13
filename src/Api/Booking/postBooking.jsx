import {API_BOOKINGS} from "../Constants.jsx";
import {getHeaders} from "../Headers.jsx";

export async function postBooking(bookingData) {
    try {
        const response = await fetch(API_BOOKINGS, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(bookingData),
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}