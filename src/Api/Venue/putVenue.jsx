import {API_PROFILES, API_VENUES} from "../Constants.jsx";
import { getHeaders } from "../Headers.jsx";

export async function putVenue() {
    try {
        const response = await fetch(API_VENUES, {
            method: 'PUT',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
