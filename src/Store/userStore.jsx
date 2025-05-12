import { API_PROFILES } from "../Api/Constants.jsx";
import { getHeaders } from "../Api/Headers.jsx";

export async function readProfile(username) {
    try {
        const response = await fetch(`${API_PROFILES}/${username}`, {
            method: 'GET',
            headers: getHeaders()
        });

        if (!response.ok) {
            console.error('Failed to fetch profile data:', response);
            throw new Error(`Error fetching profile data: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
