import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        setIsLoggedIn(!!token);
    }, []);

    return (
        <header className={"flex justify-between p-4 bg-secondary-beige px-[80px] py-[14px] items-center relative"}>
            <Link to={"/"}>
                <img src="/assets/logo.png" alt="Holidaze Logo" className={"w-[128px] h-[44px] cursor-pointer"}/>
            </Link>
            <div className={"flex gap-8"}>
                {!isLoggedIn ? (
                    <>
                        <Link to={"/login"}>
                            <button
                                className={"bg-primary-orange text-custom-white border border-primary-orange cursor-pointer w-[100px] py-2 rounded hover:bg-custom-white hover:text-primary-orange"}>Login
                            </button>
                        </Link>
                        <Link to={"/register"}>
                            <button
                                className={"text-primary-orange border border-primary-orange cursor-pointer w-[100px] py-2 rounded hover:bg-custom-white hover:text-primary-orange"}>Register
                            </button>
                        </Link>
                    </>
                ) : (
                    <>
                        <nav className={"flex items-center"}>
                            <ul className={"flex gap-[60px]"}>
                                <Link to={"/"}>
                                    <li>Home</li>
                                </Link>
                                <Link to={"/search-results"}>
                                    <li>Search</li>
                                </Link>
                                <Link to={"/"}>
                                    <li>About</li>
                                </Link>
                            </ul>
                            <div className={"bg-white w-[2px] h-full"}></div>
                            <div className={"border border-white rounded"}>
                                <img src="" alt=""/>
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className={`flex flex-col justify-center items-center w-10 h-10 relative group`}>
                                    <span
                                        className={`bg-primary-orange h-1 w-8 mb-1 transform transition duration-300 ease-in-out ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                                    <span
                                        className={`bg-primary-orange h-1 w-8 mb-1 transition-opacity duration-300 ${
                                            menuOpen ? "opacity-0" : "opacity-100"
                                        }`}
                                    ></span>
                                    <span
                                        className={`bg-primary-orange h-1 w-8 transform transition duration-300 ease-in-out ${
                                            menuOpen ? "-rotate-45 -translate-y-2" : ""
                                        }`}
                                    ></span>
                                </button>
                            </div>
                            <div className={"dropdown-menu absolute top-full right-0 z-20"}>
                                <ul className={"flex gap-[60px]"}>
                                    <Link to={"/profile"}>
                                        <li>My Profile</li>
                                    </Link>
                                    <Link to={"/bookings"}>
                                        <li>My Bookings</li>
                                    </Link>
                                </ul>
                                <Link to="/logout">
                                    <button
                                        className="text-primary-orange border border-primary-orange cursor-pointer w-[100px] py-2 rounded hover:bg-custom-white hover:text-primary-orange">
                                        Logout
                                    </button>
                                </Link>
                            </div>
                        </nav>
                    </>
                )
                }
            </div>
        </header>
    )
}