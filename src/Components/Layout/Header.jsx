import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuthStore} from "../../Store/authStore.jsx";

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const accessToken = useAuthStore((state) => state.accessToken);
    const isLoggedIn = !!accessToken;
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [menuOpen]);


    return (
        <header
            className={"flex relative z-40 justify-between p-4 bg-secondary-beige px-[40px] py-[10px] lg:px-[80px] lg:py-[14px] items-center"}>
            <Link to={"/"} onClick={() => setMenuOpen(false)}>
                <img src="/assets/logo.png" alt="Holidaze Logo"
                     className={"w-[100px] h-[36px] lg:w-[128px] lg:h-[44px] cursor-pointer"}/>
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
                        <nav className={"flex items-center gap-[50px] font-text"}>
                            <ul className={"hidden lg:flex lg:gap-[50px]"} onClick={() => setMenuOpen(false)}>
                                <Link to={"/"}>
                                    <li className="relative group">
                                        <span className="text-inherit after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#420C1B] after:transition-all after:duration-300 group-hover:after:w-full">
                                            Home
                                        </span>
                                    </li>
                                </Link>
                                <Link to={"/search-results"} onClick={() => setMenuOpen(false)}>
                                    <li  className="relative group">
                                        <span className="text-inherit after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#420C1B] after:transition-all after:duration-300 group-hover:after:w-full">
                                            Search
                                        </span>
                                    </li>
                                </Link>
                                <Link to={"/"} onClick={() => setMenuOpen(false)}>
                                    <li className="relative group">
                                        <span className="text-inherit after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#420C1B] after:transition-all after:duration-300 group-hover:after:w-full">
                                            About
                                        </span>
                                    </li>
                                </Link>
                            </ul>
                            <div className={"hidden lg:block bg-white w-[2px] h-8"}></div>
                            <div className={" px-2 py-1 flex items-center gap-4"}>
                                <Link to={"/profile"}>
                                    <img className={"w-8 h-8 rounded-full"} src={user.avatar.url} alt={user.avatar.alt}/>
                                </Link>
                                <button
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="relative w-6 h-6 flex items-center justify-center cursor-pointer"
                                >
                                    <span
                                        className={`absolute bg-[#420C1B] h-[2px] w-6 transition-transform duration-300 ease-in-out ${
                                            menuOpen ? "rotate-45" : "-translate-y-2"
                                        }`}
                                    ></span>
                                    <span
                                        className={`absolute bg-[#420C1B] h-[2px] w-6 transition-all duration-300 ease-in-out ${
                                            menuOpen ? "opacity-0" : ""
                                        }`}
                                    ></span>
                                    <span
                                        className={`absolute bg-[#420C1B] h-[2px] w-6 transition-transform duration-300 ease-in-out ${
                                            menuOpen ? "-rotate-45" : "translate-y-2"
                                        }`}
                                    ></span>
                                </button>
                            </div>
                            {menuOpen && (
                                <>
                                <div className={"fixed inset-0 bg-gray-800 opacity-50 z-10 top-18 right-0"} onClick={() => setMenuOpen(false)}></div>
                                <div
                                    className={"dropdown-menu lg:border-x-4 border-secondary-beige absolute top-full right-0 z-20 bg-custom-white w-full h-screen lg:w-[380px]"}>
                                    <div className={"flex flex-col items-center font-text p-10 gap-6"}>
                                        <div className={"flex items-center gap-2"}>
                                            <img className={"rounded-full w-14 h-14"} src={user.avatar.url}
                                                 alt={user.avatar.alt}/>
                                            <div className={""}>
                                                <p className={"font-bold text-md text-custom-gray"}>{user.name}</p>
                                                <p className={"font-light text-sm text-custom-gray"}>{user.email}</p>
                                            </div>
                                        </div>
                                        <div className={"w-70 bg-[#EAEAEA] h-[1px]"}></div>
                                        <ul className={"flex flex-col gap-4 items-center lg:hidden"}>
                                            <Link to={"/"} onClick={() => setMenuOpen(false)}>
                                                <li className={"border border-secondary-beige px-4 py-2 rounded w-[130px] flex justify-center hover:bg-secondary-beige text-custom-brown"}>Home</li>
                                            </Link>
                                            <Link to={"/search-results"} onClick={() => setMenuOpen(false)}>
                                                <li className={"border border-secondary-beige px-4 py-2 rounded w-[130px] flex justify-center hover:bg-secondary-beige text-custom-brown"}>Search</li>
                                            </Link>
                                            <Link to={"/"} onClick={() => setMenuOpen(false)}>
                                                <li className={"border border-secondary-beige px-4 py-2 rounded w-[130px] flex justify-center hover:bg-secondary-beige text-custom-brown"}>About</li>
                                            </Link>
                                        </ul>
                                        <ul className={"flex gap-4 flex-col items-center"}>
                                            <Link to={"/profile"} onClick={() => setMenuOpen(false)}>
                                                <li className={"border border-secondary-beige px-4 py-2 rounded w-[130px] flex justify-center hover:bg-secondary-beige text-custom-brown"}>My
                                                    Profile
                                                </li>
                                            </Link>
                                            <Link to={"/bookings"} onClick={() => setMenuOpen(false)}>
                                                <li className={"border border-secondary-beige px-4 py-2 rounded w-[130px] flex justify-center hover:bg-secondary-beige text-custom-brown"}>
                                                    My Bookings
                                                </li>
                                            </Link>
                                        </ul>
                                        <Link to="/logout" onClick={() => setMenuOpen(false)}>
                                            <button
                                                className="text-primary-orange border border-primary-orange cursor-pointer w-[130px] py-2 rounded hover:bg-primary-orange hover:text-custom-white">
                                                Logout
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                </>
                            )}
                        </nav>
                    </>
                )
                }
            </div>
        </header>
    )
}