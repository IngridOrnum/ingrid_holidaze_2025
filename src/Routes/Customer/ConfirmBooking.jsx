import {Link} from "react-router-dom";
import {useEffect} from "react";

export function ConfirmBooking() {
    useEffect(() => {
        document.title = 'Holidaze - Confirm Booking'
    }, []);

    return (
        <>
            <h1>Confirm Booking</h1>
            <Link to={"/booking-complete"}>
                <button className={"bg-blue-400"}>Confirm Booking</button>
            </Link>
        </>
    )
}