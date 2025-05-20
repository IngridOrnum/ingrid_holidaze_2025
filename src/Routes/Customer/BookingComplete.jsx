import {useBookingStore} from "../../Store/bookingStore.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function BookingComplete() {
    const { booking, clearBooking } = useBookingStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!booking) {
            navigate("/bookings");
        }
    }, [booking, navigate]);

    if (!booking) {
        return null;
    }

    const { venueName, dateFrom, dateTo, guests, nights, venuePrice } = booking;
    const totalPrice = nights * venuePrice;

    function formatDate(date) {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <h1 className="text-3xl font-bold mb-4">Booking Confirmed! 🎉</h1>
            <div className="text-lg">
                <p><strong>Venue:</strong> {venueName}</p>
                <p><strong>From:</strong> {formatDate(dateFrom)}</p>
                <p><strong>To:</strong> {formatDate(dateTo)}</p>
                <p><strong>Guests:</strong> {guests}</p>
                <p><strong>Total nights:</strong> {nights}</p>
                <p><strong>Total Price:</strong> {totalPrice} NOK</p>
            </div>
            <button
                className="mt-8 px-4 py-2 bg-primary-orange text-white rounded hover:bg-orange-700"
                onClick={() => {
                    clearBooking();
                    navigate("/bookings");
                }}
            >
                My Bookings
            </button>
        </div>
    );
}
