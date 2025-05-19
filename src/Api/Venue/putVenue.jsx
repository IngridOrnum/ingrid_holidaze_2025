import {API_VENUES} from "../Constants.jsx";
import { getHeaders } from "../Headers.jsx";

export async function putVenue(venueId, data) {
    try {
        const response = await fetch(`${API_VENUES}/${venueId}`, {
            method: 'PUT',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to update venue');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}
