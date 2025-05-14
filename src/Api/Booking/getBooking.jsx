import { API_BOOKINGS } from "../constants.jsx";
import {getHeaders} from "../Headers.jsx";

export async function getBooking() {
    try {
        const response = await fetch(API_BOOKINGS, {
            method: 'GET',
            headers: getHeaders(),
            body: JSON.stringify(),
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const { data } = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
}
