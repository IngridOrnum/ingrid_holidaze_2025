import { API_PROFILES } from "../Constants.jsx";
import { getHeaders } from "../Headers.jsx";

export async function updateProfile(name, profileData) {
    try {
        const response = await fetch(`${API_PROFILES}/${name}`, {
            method: 'PUT',
            headers: {
                ...getHeaders(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
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
