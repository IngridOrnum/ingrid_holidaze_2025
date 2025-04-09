import {Link} from "react-router-dom";

export function SingleVenue() {
    return (
        <div className={"flex flex-col items-center justify-center"}>
            <h1>Single Venue</h1>
            <Link to={"/confirm-booking"}>
                <button className={"bg-blue-400"}>Book Venue</button>
            </Link>
        </div>
    )
}