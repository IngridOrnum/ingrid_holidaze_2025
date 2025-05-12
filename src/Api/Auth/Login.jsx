import { API_AUTH_LOGIN } from "../constants.jsx";
import {getHeaders} from "../Headers.jsx";

export async function Login({ email, password }) {
    try {
        const response = await fetch(API_AUTH_LOGIN, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            throw new Error('Invalid credentials');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}