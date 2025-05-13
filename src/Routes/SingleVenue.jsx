import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {Rating} from "../Components/Rating/Rating.jsx";
import {BookingCalendar} from "../Components/Filters/Calendar.jsx";
import {postBooking} from "../Api/Booking/postBooking.jsx";
import {Guests} from "../Components/Filters/Guests.jsx";
import { useBookingStore } from "../Store/bookingStore.jsx";
import { useNavigate } from "react-router-dom";


export function SingleVenue() {
    const [singleVenue, setSingleVenue] = useState(null);
    const [selectedDates, setSelectedDates] = useState();
    const {id} = useParams();
    const url = `https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true&_owner=true`;

    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const totalGuests = adults + children;

    const navigate = useNavigate();
    const { setBooking } = useBookingStore();

    const facilityIcons = {
        wifi: "/assets/icons/wifi.svg",
        pets: "/assets/icons/pets.svg",
        breakfast: "/assets/icons/breakfast.svg",
        parking: "/assets/icons/car.svg",
    };

    useEffect(() => {
        async function getSingleVenue() {
            try {
                const res = await fetch(url);
                const data = await res.json();
                console.log("Fetched venue data:", data);
                setSingleVenue(data.data);

            } catch (error) {
                console.error("Error fetching venues:", error);
            }
        }
        getSingleVenue();
    }, [id]);

    const bookedDates = singleVenue?.bookings?.flatMap((booking) => {
        const from = new Date(booking.dateFrom);
        const to = new Date(booking.dateTo);
        const dates = [];
        for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d));
        }
        return dates;
    }) || [];


    async function handleBooking() {
        if (!selectedDates?.from || !selectedDates?.to) {
            alert("Please select a start and end date for your booking.");
            return;
        }

        const bookingData = {
            dateFrom: selectedDates.from.toISOString(),
            dateTo: selectedDates.to.toISOString(),
            venueId: id,
            venueName: singleVenue.name,
            venuePrice: singleVenue.price,
            guests: adults + children,
            nights: calculateNights(),
        };


        try {
            const bookingResponse = await postBooking(bookingData);
            console.log("Booking successful:", bookingResponse);

            setBooking(bookingData);

            navigate("/confirm-booking");
        } catch (error) {
            console.error("Booking failed:", error);
            alert("Booking failed. Please try again.");
        }
    }

    useEffect(() => {
        if (singleVenue?.name) {
            document.title = 'Holidaze - ' + singleVenue.name
        }
    }, [singleVenue]);

    function formatDate(date) {
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
        });
    }

    function calculateNights() {
        if (selectedDates?.from && selectedDates?.to) {
            const timeDiff = selectedDates.to - selectedDates.from;
            const nights = timeDiff / (1000 * 60 * 60 * 24);
            return nights;
        }
        return 0;
    }

    const nights = calculateNights();
    const totalPrice = nights * (singleVenue?.price || 0);


    return (
        <div className={"flex flex-col items-center justify-center w-full max-w-2xl mx-auto relative"}>
            {singleVenue ? (
                <div>
                    <img className={"object-cover h-[400px] lg:h-[586px]"}
                         src={singleVenue.media[0]?.url || "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"}
                         alt={singleVenue.media[0]?.alt || singleVenue.name}/>
                    <div className={"flex justify-between"}>
                        <div className={"flex flex-col items-center gap-8 w-full"}>
                            <h1 className={"font-title text-custom-text text-3xl"}>{singleVenue.name}</h1>
                            <Rating rating={singleVenue.rating}/>
                            <p className={"text-custom-text"}>{singleVenue.description}</p>
                            <div className={"flex flex-col mx-auto items-center border border-secondary-beige bg-custom-white w-full"}>
                                <h2 className={"font-medium font-title text-xl"}>{singleVenue.price} NOK / night</h2>
                                <BookingCalendar
                                    selectedDates={selectedDates}
                                    setSelectedDates={setSelectedDates}
                                    bookedDates={bookedDates}
                                />
                                <Guests
                                    adults={adults}
                                    setAdults={setAdults}
                                    children={children}
                                    setChildren={setChildren}
                                    maxGuests={singleVenue.maxGuests}
                                />
                                <p>Total: {nights > 0 ? `${totalPrice} NOK for ${nights} night${nights > 1 ? "s" : ""}` : "Select dates"}</p>
                            </div>
                            <div className={"flex flex-col mx-auto items-center w-full"}>
                                <h2 className={"font-medium font-title text-xl"}>Facilities</h2>
                                {singleVenue.meta && (
                                    <ul className="flex flex-wrap w-full gap-2 items-center justify-center border border-secondary-beige">
                                        {Object.entries(singleVenue.meta)
                                            .filter(([_, value]) => value === true)
                                            .map(([key]) => (
                                                <li key={key}
                                                    className="text-custom-text px-2 py-1 rounded text-base flex items-center gap-2 capitalize">
                                                    <img src={facilityIcons[key]} alt={key} className="w-6 h-6"/>
                                                    {key}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                            <div className={"flex flex-col items-center mx-auto text-center"}>
                                <div className={"flex"}>
                                    <img src={singleVenue.owner.url?.avatar} alt={singleVenue.owner.url?.alt}/>
                                    <div className={"flex flex-col items-center"}>
                                        <p>{singleVenue.owner.name}</p>
                                        <p>{singleVenue.owner.email}</p>
                                    </div>
                                </div>
                                <div className={"w-full bg-secondary-beige h-px"}></div>
                                <p>{singleVenue.owner.bio}</p>
                            </div>
                        </div>
                        <div
                            className={"fixed bottom-0 left-0 w-screen flex bg-custom-white z-40 justify-between p-4 border-t-2 border-t-secondary-beige font-text items-center"}>
                            <div>
                                <p className={"font-medium"}>{singleVenue.price} NOK / night</p>
                                {selectedDates?.from && selectedDates?.to ? (
                                    <p>{formatDate(selectedDates.from)} - {formatDate(selectedDates.to)}</p>
                                ) : (
                                    <p>Select your dates</p>
                                )}
                            </div>
                            <button
                                onClick={handleBooking}
                                className="border border-primary-orange bg-primary-orange text-custom-white rounded px-6 py-2 hover:bg-custom-white hover:text-primary-orange cursor-pointer"
                            >
                                Book Stay
                            </button>

                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}