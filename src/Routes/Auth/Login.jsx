import {Link} from "react-router-dom";

export function Login() {
    return (
        <div className={"flex flex-col items-center justify-center"}>
            <h1>Login</h1>
           <form>
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
               <button className={"border border-black p-2 m-2 w-full"}>Login</button>
           </form>


        </div>
    )
}