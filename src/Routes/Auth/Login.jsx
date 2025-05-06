import { useState } from "react";
import {Login} from "../../Api/Auth/Login.jsx";


export function OnLogin() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value.trim();
        const password = form.password.value;

        try {
            const response = await Login({ email, password });
            console.log("Login success:", response);

            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("user", JSON.stringify(response.data));

            setSuccess("Login successful!");
            setError(null);
        } catch (error) {
            console.error("Login failed:", error);
            setError(error.message);
            setSuccess(null);
        }
    }

    return (
        <div className={"flex flex-col items-center justify-center"}>
            <h1>Login</h1>
           <form onSubmit={handleSubmit}>
               <div>
                   <label htmlFor="email" className="font-light font-text text-ui-black">Email address</label>
                   <div className="mt-2">
                       <input id="email" name="email" type="email"  required className="border border-gray form-input w-full max-w-[280px]"/>
                       <span id="email-alert" className="hidden bold text-red-800">Email must be a valid Noroff student email.</span>
                   </div>
               </div>

               <div>
                   <div className="flex items-center justify-between">
                       <label htmlFor="password" className="font-light font-text text-ui-black">Password</label>
                   </div>
                   <div className="mt-2">
                       <input id="password" name="password" type="password" required className="border border-gray form-input w-full max-w-[280px]"/>
                       <span id="password-alert" className="hidden bold text-red-800">Password must be at least 8 characters long.</span>
                   </div>
               </div>
               {success && <p className="text-green-600 mt-2">{success}</p>}
               {error && <p className="text-red-500 mt-2">{error}</p>}

               <button type={"submit"} className={"border border-black p-2 m-2 w-full"}>Login</button>
           </form>


        </div>
    )
}