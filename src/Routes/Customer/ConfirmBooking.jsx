import {Link} from "react-router-dom";

export function ConfirmBooking() {
    return (
        <>
            <h1>Confirm Booking</h1>
            <Link to={"/booking-complete"}>
                <button className={"bg-blue-400"}>Confirm Booking</button>
            </Link>
        </>
    )
}