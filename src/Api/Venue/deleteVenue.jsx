import { API_VENUES } from "../Constants.jsx"; // <- Pass på path
import { getHeaders } from "../Headers.jsx";

export async function DeleteVenue(venueId) {
    try {
        const response = await fetch(`${API_VENUES}/${venueId}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to delete venue');
        }

        return true;
    } catch (error) {
        throw error;
    }
}
