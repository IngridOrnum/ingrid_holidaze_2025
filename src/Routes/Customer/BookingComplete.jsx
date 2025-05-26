import {useBookingStore} from "../../Store/bookingStore.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {PrimaryButton} from "../../Components/Buttons/PrimaryButton.jsx";

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

    const { venueName, dateFrom, dateTo, guests, nights, venuePrice, owner } = booking;
    const totalPrice = nights * venuePrice;


    function formatDate(date) {
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
        });
    }

    return (
        <div className="flex flex-col items-center justify-center p-8 gap-8">
            <div className={"flex flex-col gap-2 items-center"}>
                <h1 className="font-title text-2xl lg:text-3xl font-bold mb-4">Booking Confirmed!</h1>
                <p className={"font-text text-sm md:text-lg leading-6 font-light max-w-md text-center"}>Thanks for booking with Holidaze! Let us know if you have any questions – we're here to help.</p>
            </div>
            <div className="text-lg border border-secondary-beige p-4 text-custom-medium-gray flex flex-col items-center">
                <p className={"font-title mb-4"}>{venueName}</p>
                <div className={"flex flex-col gap-4 text-sm md:text-base min-w-[260px]"}>
                    <div className={"h-px w-full bg-secondary-beige"}></div>
                    <div className={"flex justify-between"}>
                        <p>Dates</p>
                        <p>{formatDate(dateFrom)} - {formatDate(dateTo)}</p>
                    </div>
                    <div className={"h-px w-full bg-secondary-beige"}></div>
                    <div className={"flex justify-between"}>
                        <p>Total Guests</p>
                        <p>{guests}</p>
                    </div>
                    <div className={"h-px w-full bg-secondary-beige"}></div>
                    <div className={"flex justify-between"}>
                        <p>Total Price</p>
                        <p>{totalPrice} NOK</p>
                    </div>
                    <div className={"h-px w-full bg-secondary-beige"}></div>
                    <div className={"flex justify-between"}>
                        <p>Host</p>
                        <p>{owner?.name}</p>
                    </div>
                </div>
            </div>
            <PrimaryButton
                text={"My Bookings"}
                onClick={() => {
                    clearBooking();
                    navigate("/bookings");
                }}/>
        </div>
    );
}
