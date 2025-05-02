import {Link} from "react-router-dom";

export function Login() {
    return (
        <div className={"flex flex-col items-center justify-center"}>
            <h1>Login</h1>
            <Link to={"/"}>
                <button className={"bg-blue-400"}>Login</button>
            </Link>
        </div>
    )
}