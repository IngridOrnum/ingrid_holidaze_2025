import {Register} from "../../Api/Auth/Register.jsx";
import { useState } from "react";

export function OnRegister() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const name = form.username.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;
        const repeatPassword = form["repeat-password"].value;
        const venueManager = form.role.value === "manager";

        if (password !== repeatPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await Register({ name, email, password, venueManager });
            console.log("Registration success:", response);
            setSuccess("Registration successful!");
            setError(null);
        } catch (error) {
            console.error("Registration failed:", error);
            setError(error.message);
            setSuccess(null);
        }
    }

    return (
        <div className={"flex flex-col items-center justify-center"}>

            <form onSubmit={handleSubmit}>
                <fieldset className="border border-gray-300 p-4 rounded-md">
                    <legend className="text-sm font-medium text-gray-700 p-2">Register as a:</legend>
                    <div>
                        <input type="radio" id="customer" name="role" value="customer" defaultChecked />
                        <label htmlFor="customer">Customer</label>
                    </div>
                    <div>
                        <input type="radio" id="manager" name="role" value="manager"/>
                        <label htmlFor="manager">Venue Manager</label>
                    </div>
                </fieldset>

                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" type="text" required className="form-input" />
                </div>

                <div>
                    <label htmlFor="email">Email address</label>
                    <input id="email" name="email" type="email" required className="form-input" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" required className="form-input" />
                </div>

                <div>
                    <label htmlFor="repeat-password">Repeat Password</label>
                    <input id="repeat-password" name="repeat-password" type="password" required className="form-input" />
                </div>

                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-green-600 mt-2">{success}</p>}

                <button type="submit" className="border border-black p-2 m-2 w-full">Register</button>
            </form>
        </div>
    )
}