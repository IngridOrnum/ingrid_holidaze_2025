import { API_PROFILES } from "../constants.jsx";
import { getHeaders } from "../Headers.jsx";

export async function getVenuesByProfile(username) {
    try {
        const response = await fetch(`${API_PROFILES}/${username}/venues?_bookings=true`, {
            method: "GET",
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch your venues");
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching your venues:", error);
        throw error;
    }
}
