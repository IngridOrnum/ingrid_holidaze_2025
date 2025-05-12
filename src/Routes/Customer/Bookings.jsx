import {useEffect} from "react";

export function Bookings() {
    useEffect(() => {
        document.title = 'Holidaze - My Bookings'
    }, []);
    return (
        <>
            <h1>My Bookings</h1>
        </>
    )
}