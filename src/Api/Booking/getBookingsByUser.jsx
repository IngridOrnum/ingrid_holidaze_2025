import { API_PROFILES } from "../Constants.jsx";
import {getHeaders} from "../Headers.jsx";

export async function getBookingsByUser(username) {
    try {
        const response = await fetch(`${API_PROFILES}/${username}?_bookings=true&_venues=true`, {
            headers: getHeaders(),
        });

        if (!response.ok) {
            console.error('Failed to fetch profile data:', response);
            throw new Error(`Error fetching profile data: ${response.status}`);
        }

        const { data } = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
