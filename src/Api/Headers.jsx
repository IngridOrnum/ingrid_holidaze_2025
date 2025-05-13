import { API_KEY } from "./Constants.jsx";
import { useAuthStore } from "../Store/authStore.jsx";

export function getHeaders() {
    const accessToken = useAuthStore.getState().accessToken;

    if (!accessToken) {
        console.error("Access token missing when trying to get headers!");
        throw new Error("Access token missing");
    }

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
        "X-Noroff-API-Key": API_KEY,
    };
}
