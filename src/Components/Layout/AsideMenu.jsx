import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {CircleUser, CalendarDays, House} from "lucide-react";
import {isVenueManager} from "../../Utils/userRole.jsx";

export function AsideMenu({profile}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showText, setShowText] = useState(false);

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
        console.log("profile in AsideMenu:", profile);
    }, [profile]);


    return (
        <aside className={` hidden lg:flex flex-col bg-custom-white p-4 border border-black h-screen ${menuOpen ? 'w-48' : 'w-20'} transition-all duration-300`}>
            <ul className={"flex gap-4 flex-col items-center"}>
                <Link to={"/profile"} onClick={() => setMenuOpen(false)}>
                    <li className={`border border-secondary-beige px-2 py-2 rounded flex items-center gap-2 justify-center hover:bg-secondary-beige text-custom-brown cursor-pointer transition-all duration-300 ${menuOpen ? 'w-[160px]' : 'w-14'}`}>
                    <CircleUser className={"w-6 h-6"}/>
                        {showText && <span className="whitespace-nowrap">My Profile</span>}
                    </li>
                </Link>
                <Link to={"/bookings"} onClick={() => setMenuOpen(false)}>
                    <li className={`border border-secondary-beige px-2 py-2 rounded flex items-center gap-2 justify-center hover:bg-secondary-beige text-custom-brown cursor-pointer transition-all duration-300 ${menuOpen ? 'w-[160px]' : 'w-14'}`}>
                        <CalendarDays className={"w-6 h-6"}/>
                        {showText && <span className="whitespace-nowrap">My Bookings</span>}
                    </li>
                </Link>
                {isVenueManager(profile) && (
                    <Link to="/my-venues" onClick={() => setMenuOpen(false)}>
                        <li className={`...`}>
                            <House className="w-6 h-6" />
                            {showText && <span>My Venues</span>}
                        </li>
                    </Link>
                )}
            </ul>
            <div onClick={() => setMenuOpen(!menuOpen)} className="border border-black p-2 h-fit mt-8 cursor-pointer">
                {menuOpen ? 'Close' : 'Open'}
            </div>
        </aside>
    )
}