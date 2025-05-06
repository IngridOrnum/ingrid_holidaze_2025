import { API_KEY } from "./Constants.jsx";

export function Headers() {
    const headers = new Headers();

    if (API_KEY) {
        headers.append("X-Noroff-API-Key", API_KEY);
    }
    return headers;
}