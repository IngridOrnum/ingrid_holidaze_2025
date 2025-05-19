import { API_VENUES } from "../Constants.jsx";
import { getHeaders } from "../Headers.jsx";

export async function postVenue(formData) {
    try {
        const response = await fetch(API_VENUES, {
            method: 'POST',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const contentType = response.headers.get("content-type");

        if (!response.ok) {
            let errorMessage = 'Failed to create venue';
            if (contentType && contentType.includes("application/json")) {
                const errorData = await response.json();
                console.error('Failed to create venue:', errorData);
                errorMessage = errorData.errors?.[0]?.message || errorMessage;
            }
            throw new Error(errorMessage);
        }

        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }

        return null;
    } catch (error) {
        console.error("Error in postVenue:", error);
        throw error;
    }
}