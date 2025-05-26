import {Register} from "../../Api/Auth/Register.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {PrimaryButton} from "../../Components/Buttons/PrimaryButton.jsx";

export function OnRegister() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Holidaze - Register'
    }, []);

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
            const response = await Register({name, email, password, venueManager});
            console.log("Registration success:", response);

            navigate("/login");
            window.location.reload();

            setSuccess("Registration successful!");
            setError(null);
        } catch (error) {
            console.error("Registration failed:", error);
            setError(error.message);
            setSuccess(null);
        }
    }

    return (
        <div className={"flex flex-col lg:flex-row items-center justify-center py-10 mb-20 gap-20"}>
            <div>
                <h1 className={"font-title text-2xl mb-10 mb:text-4xl"}>Register</h1>
                <form onSubmit={handleSubmit} className={"flex flex-col gap-2 font-text"}>
                    <fieldset className="border border-secondary-beige p-4 rounded-md">
                        <legend className="text-sm font-text font-medium text-gray-700 p-2 flex flex-col gap-2">Register as a:</legend>
                        <div>
                            <input type="radio" id="customer" name="role" value="customer" defaultChecked/>
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className={"mt-2"}>
                            <input type="radio" id="manager" name="role" value="manager"/>
                            <label htmlFor="manager">Venue Manager</label>
                        </div>
                    </fieldset>

                    <div className={"flex flex-col"}>
                        <label htmlFor="username">Username</label>
                        <input id="username" name="username" type="text" required className="border border-secondary-beige rounded p-2 form-input"/>
                    </div>

                    <div className={"flex flex-col"}>
                        <label htmlFor="email">Email address</label>
                        <input id="email" name="email" type="email" required className="border border-secondary-beige rounded p-2 form-input"/>
                    </div>

                    <div className={"flex flex-col"}>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" required className="border border-secondary-beige rounded p-2 form-input"/>
                    </div>

                    <div className={"flex flex-col"}>
                        <label htmlFor="repeat-password">Repeat Password</label>
                        <input id="repeat-password" name="repeat-password" type="password" required
                               className="border border-secondary-beige rounded p-2 form-input"/>
                    </div>

                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {success && <p className="text-green-600 mt-2">{success}</p>}

                    <PrimaryButton type={"submit"} text={"Register"} className={"mt-8"}/>
                </form>
            </div>

            <img className={"w-60 h-auto lg:w-80"} src="/assets/holidaze.jpg" alt="Holidaze"/>
        </div>
    )
}