import { API_KEY } from "./Constants.jsx";

export function getHeaders() {
    return {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY
    };
}
