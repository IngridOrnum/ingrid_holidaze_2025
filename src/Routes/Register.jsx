import {Link} from "react-router-dom";

export function Register() {
    return (
        <div className={"flex flex-col items-center justify-center"}>
            <h1>Register</h1>
            <Link to={"/"}>
                <button className={"bg-blue-400"}>Register</button>
            </Link>
        </div>
    )
}