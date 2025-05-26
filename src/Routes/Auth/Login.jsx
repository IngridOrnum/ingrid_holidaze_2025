import {useEffect, useState} from "react";
import {Login} from "../../Api/Auth/Login.jsx";
import {useNavigate} from "react-router-dom";
import {useAuthStore} from "../../Store/authStore.jsx";
import {PrimaryButton} from "../../Components/Buttons/PrimaryButton.jsx";

export function OnLogin() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Holidaze - Login'
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value.trim();
        const password = form.password.value;

        try {
            const response = await Login({ email, password });

            const { accessToken, ...userData } = response;

            const { setAccessToken, setUser } = useAuthStore.getState();
            setAccessToken(accessToken);
            setUser(userData);

            setSuccess("Login successful!");
            setError(null);

            navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
            setError(error.message);
            setSuccess(null);
        }
    }

    return (
        <div className={"flex flex-col lg:flex-row items-center justify-center py-10 mb-20 gap-20"}>
            <div>
                <h1 className={"font-title text-2xl mb-10 mb:text-4xl"}>Login</h1>
                <form onSubmit={handleSubmit} className={"font-text font-light"}>
                    <div>
                        <label htmlFor="email" className="font-light font-text text-ui-black">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email"  required className="border border-secondary-beige rounded p-2 form-input w-full max-w-[280px]"/>
                            <span id="email-alert" className="hidden bold text-red-800">Email must be a valid Noroff student email.</span>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="font-light font-text text-ui-black">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" required className="border border-secondary-beige rounded p-2 form-input w-full max-w-[280px]"/>
                            <span id="password-alert" className="hidden bold text-red-800">Password must be at least 8 characters long.</span>
                        </div>
                    </div>
                    {success && <p className="text-green-600 mt-2">{success}</p>}
                    {error && <p className="text-red-500 mt-2">{error}</p>}

                    <PrimaryButton type={"submit"} text={"Login"} className={"mt-8"}/>
                </form>
            </div>

            <img className={"w-60 h-auto lg:w-80"} src="/assets/holidaze.jpg" alt="Holidaze"/>

        </div>
    )
}