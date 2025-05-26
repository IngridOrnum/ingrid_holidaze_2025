import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {CircleUser, CalendarDays, House, ExternalLink, X} from "lucide-react";
import {isVenueManager} from "../../Utils/userRole.jsx";

export function AsideMenu({profile}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showText, setShowText] = useState(false);
    const location = useLocation();

    useEffect(() => {
        let timeout;
        if (menuOpen) {
            timeout = setTimeout(() => setShowText(true), 100);
            document.body.classList.add('overflow-hidden');
        } else {
            setShowText(false);
            document.body.classList.remove('overflow-hidden');
        }
        return () => clearTimeout(timeout);
    }, [menuOpen]);

    useEffect(() => {
    }, [profile]);


    return (
        <aside className={`hidden lg:flex flex-col bg-custom-white p-4 border-r border-secondary-beige h-screen ${menuOpen ? 'w-48' : 'w-20'} transition-all duration-300`}>

            <div className="flex flex-col items-center mt-4 font-text">
                <img
                    src={profile?.avatar.url || "/default-avatar.png"}
                    alt="Profile Avatar"
                    className={`rounded-full object-cover ${
                        menuOpen ? "w-24 h-24" : "w-10 h-10"
                    } transition-all duration-300`}
                />
                {menuOpen && (
                    <div className="text-center mt-2">
                        <p className="text-lg font-semibold">{profile?.name || "Username"}</p>
                        <p className="text-xs text-custom-medium-gray">{profile?.email || "user@example.com"}</p>
                    </div>
                )}
            </div>

            <div className="border-t border-gray-200 my-8"></div>

            <ul className={"flex gap-4 flex-col items-center"}>
                <Link to={"/profile"} onClick={() => setMenuOpen(false)}>
                    <li
                        className={`border  font-light border-primary-orange px-2 py-2 rounded flex items-center gap-2 justify-center cursor-pointer transition-all duration-300 ${
                            location.pathname === "/profile"
                                ? "bg-primary-orange text-custom-white"
                                : "text-primary-orange hover:bg-primary-orange hover:text-custom-white"
                        } ${menuOpen ? "w-[160px]" : "w-14"}`}
                    >
                        <CircleUser className={"w-6 h-6"} />
                        {menuOpen && <span className="whitespace-nowrap">My Profile</span>}
                    </li>
                </Link>

                <Link to={"/bookings"} onClick={() => setMenuOpen(false)}>
                    <li
                        className={`border border-primary-orange  font-light py-2 rounded flex items-center gap-2 justify-center cursor-pointer transition-all duration-300 ${
                            location.pathname === "/bookings"
                                ? "bg-primary-orange text-custom-white"
                                : "text-primary-orange hover:bg-primary-orange hover:text-custom-white"
                        } ${menuOpen ? "w-[160px]" : "w-14"}`}
                    >
                        <CalendarDays className={"w-6 h-6"} />
                        {menuOpen && <span className="whitespace-nowrap">My Bookings</span>}
                    </li>
                </Link>

                {isVenueManager(profile) && (
                    <Link to="/my-venues" onClick={() => setMenuOpen(false)}>
                        <li
                            className={`border border-primary-orange  font-light px-2 py-2 rounded flex items-center gap-2 justify-center cursor-pointer transition-all duration-300 ${
                                location.pathname === "/my-venues"
                                    ? "bg-primary-orange text-custom-white"
                                    : "text-primary-orange hover:bg-primary-orange hover:text-custom-white"
                            } ${menuOpen ? "w-[160px]" : "w-14"}`}
                        >
                            <House className="w-6 h-6" />
                            {menuOpen && <span>My Venues</span>}
                        </li>
                    </Link>
                )}
            </ul>
            <div onClick={() => setMenuOpen(!menuOpen)} className="border border-gray-300 text-gray-400 rounded p-2 h-fit mt-8 cursor-pointer hover:text-gray-500">
                {menuOpen ? <div className={"flex items-center justify-center  font-light gap-2"}><X/> <span>Close</span></div> : <ExternalLink/>}
            </div>
        </aside>
    )
}