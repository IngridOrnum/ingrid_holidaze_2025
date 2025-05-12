import {API_AUTH_REGISTER} from "../constants.jsx";

export async function Register({name, email, password, venueManager = false}) {

    try {
        const response = await fetch(API_AUTH_REGISTER, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                email,
                password,
                venueManager
            })
        });

        const data = await response.json();
        console.log('API Response:', response.status, data);

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }

        return data;
    } catch (error) {
        throw new Error('Error during registration: ' + error.message);
    }
}