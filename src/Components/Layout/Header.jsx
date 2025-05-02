import {Link} from "react-router-dom";

export function Header() {
    return (
        <header className={"flex justify-between p-4 bg-secondary-beige px-[80px] py-[14px] items-center"}>
            <Link to={"/"}>
                <img src="/assets/logo.png" alt="Holidaze Logo" className={"w-[128px] h-[44px] cursor-pointer"}/>
            </Link>
            <div className={"flex gap-8"}>
                <Link to={"/login"}>
                    <button className={"bg-primary-orange text-custom-white border border-primary-orange cursor-pointer w-[100px] py-2 rounded hover:bg-custom-white hover:text-primary-orange"}>Login</button>
                </Link>
                <Link to={"/register"}>
                    <button className={"text-primary-orange border border-primary-orange cursor-pointer w-[100px] py-2 rounded hover:bg-custom-white hover:text-primary-orange"}>Register</button>
                </Link>
            </div>
        </header>
    )
}