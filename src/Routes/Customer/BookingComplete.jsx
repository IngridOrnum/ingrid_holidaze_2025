import {useEffect} from "react";

export function BookingComplete() {
    useEffect(() => {
        document.title = 'Holidaze - Booking Complete'
    }, []);
    return (
        <>
            <h1>Booking Complete</h1>
        </>
    )
}