import { API_AUTH_LOGIN } from "../Constants.jsx";

export async function Login({ email, password }) {
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const { data } = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
}
