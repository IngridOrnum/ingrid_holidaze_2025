import {Link} from "react-router-dom";

export function Header() {
    return (
        <header className={"flex justify-between p-4"}>
            <Link to={"/"}>
                <div className={"cursor-pointer"}>
                    Holidaze
                </div>
            </Link>
            <Link to={"/venue-manager-profile"}>
                <div>Venue Manager Profile</div>
            </Link>
            <Link to={"/customer-profile"}>
                <div>Customer Profile</div>
            </Link>
        </header>
    )
}