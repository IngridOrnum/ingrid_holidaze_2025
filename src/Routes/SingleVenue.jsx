import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {Rating} from "../Components/Rating/Rating.jsx";
import {BookingCalendar} from "../Components/Filters/Calendar.jsx";
import {postBooking} from "../Api/Booking/postBooking.jsx";
import {Guests} from "../Components/Filters/Guests.jsx";
import {useBookingStore} from "../Store/bookingStore.jsx";
import {useNavigate} from "react-router-dom";
import {PopularVenues} from "../Components/Sections/PopularVenues.jsx";
import {PrimaryButton} from "../Components/Buttons/PrimaryButton.jsx";

export function SingleVenue() {
    const [singleVenue, setSingleVenue] = useState(null);
    const [selectedDates, setSelectedDates] = useState();
    const {id} = useParams();
    const url = `https://v2.api.noroff.dev/holidaze/venues/${id}?_bookings=true&_owner=true`;
    const [errorMessage, setErrorMessage] = useState("");

    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const navigate = useNavigate();
    const {setBooking} = useBookingStore();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    function handleDotClick(index) {
        setCurrentImageIndex(index);
    }


    const facilityIcons = {
        wifi: "/assets/icons/wifi.svg",
        pets: "/assets/icons/pets.svg",
        breakfast: "/assets/icons/breakfast.svg",
        parking: "/assets/icons/car.svg",
    };

    const [showMore, setShowMore] = useState(false);

    function toggleShowMore() {
        setShowMore(!showMore);
    }


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
        setErrorMessage("");

        if (!selectedDates?.from || !selectedDates?.to) {
            setErrorMessage("Please select both a start and end date.");
            return;
        }

        if (hasDateConflict(selectedDates.from, selectedDates.to)) {
            setErrorMessage("Selected dates overlap with existing bookings.");
            return;
        }

        const nights = calculateNights();
        if (nights <= 0) {
            setErrorMessage("Please select end date.");
            return;
        }

        const bookingPayload = {
            dateFrom: selectedDates.from.toISOString(),
            dateTo: selectedDates.to.toISOString(),
            venueId: id,
            guests: adults + children,
        };

        try {
            const response = await postBooking(bookingPayload);
            console.log("Booking created:", response);

            setBooking(response); // Hvis du vil bruke state videre
            navigate("/booking-complete");
        } catch (error) {
            console.error("Booking failed:", error);
            setErrorMessage("Booking failed. Please try again.");
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
            return nights >= 1 ? nights : 0;
        }
        return 0;
    }


    const nights = calculateNights();
    const totalPrice = nights * (singleVenue?.price || 0);


    function hasDateConflict(from, to) {
        for (let d = new Date(from); d <= to; d.setDate(d.getDate() + 1)) {
            if (bookedDates.some(booked => booked.toDateString() === d.toDateString())) {
                return true;
            }
        }
        return false;
    }


    return (
        <div className={"flex flex-col items-center justify-center w-full mx-auto relative lg:justify-between"}>
            {singleVenue ? (
                <div className={"w-full flex flex-col items-center"}>
                    <div className="relative w-full h-[70vh] lg:h-[586px]">
                        {singleVenue.media.length > 1 ? (
                            <>
                                <img
                                    className="object-cover w-full h-full"
                                    src={singleVenue.media[currentImageIndex]?.url}
                                    alt={singleVenue.media[currentImageIndex]?.alt || singleVenue.name}
                                />
                                <button
                                    onClick={() =>
                                        setCurrentImageIndex((prev) =>
                                            prev === 0 ? singleVenue.media.length - 1 : prev - 1
                                        )
                                    }
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-custom-white/70 p-2 rounded-full w-10 h-10 cursor-pointer"
                                >
                                    &larr;
                                </button>
                                <button
                                    onClick={() =>
                                        setCurrentImageIndex((prev) =>
                                            prev === singleVenue.media.length - 1 ? 0 : prev + 1
                                        )
                                    }
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-custom-white/70 p-2 rounded-full w-10 h-10 cursor-pointer"
                                >
                                    &rarr;
                                </button>
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                                    {singleVenue.media.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleDotClick(index)}
                                            className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-primary-orange' : 'bg-gray-400'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <img
                                className="object-cover w-full h-full"
                                src={singleVenue.media[0]?.url || "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"}
                                alt={singleVenue.media[0]?.alt || singleVenue.name}
                            />
                        )}
                    </div>

                    <div className={"lg:flex mt-10"}>
                    <div className={"flex flex-col lg:flex-row lg:justify-between mx-[20px] lg:mx-[80px] items-center lg:items-start py-4 justify-center gap-10"}>
                        <div className={"flex flex-col gap-6 lg:min-w-[280px]"}>
                            <div className={"flex flex-col gap-2"}>
                                <h1 className={"font-title text-custom-text text-xl md:text-3xl"}>{singleVenue.name}</h1>
                                <Rating rating={singleVenue.rating}/>
                            </div>
                            <div className={"flex flex-col items-center w-full"}>
                                <p className={"font-text font-light text-sm leading-6"}>
                                    {singleVenue.description?.length > 250 && !showMore
                                        ? `${singleVenue.description.slice(0, 250)}...`
                                        : singleVenue.description}
                                </p>
                                {singleVenue.description?.length > 250 && (
                                    <button
                                        onClick={toggleShowMore}
                                        className="text-primary-orange underline text-sm cursor-pointer hover:opacity-60 w-fit mt-2 items-center"
                                    >
                                        {showMore ? "Show Less" : "Show More"}
                                    </button>
                                )}
                            </div>

                            <div className={"flex flex-col mx-auto items-center w-full"}>
                                {singleVenue.meta && (
                                    <>
                                        {Object.entries(singleVenue.meta).some(([_, value]) => value === true) ? (
                                            <ul className="flex flex-wrap w-full bg-white gap-2 p-2 items-center justify-center border-2 rounded border-secondary-beige">
                                                {Object.entries(singleVenue.meta)
                                                    .filter(([_, value]) => value === true)
                                                    .map(([key]) => (
                                                        <li key={key} className="text-custom-text px-2 py-1 rounded text-xs md:text-sm flex items-center gap-2 capitalize">
                                                            <img src={facilityIcons[key]} alt={key} className="h-4 w-4 md:w-6 md:h-6" />
                                                            {key}
                                                        </li>
                                                    ))}
                                            </ul>
                                        ) : (
                                            <div className={"flex py-3 px-4 items-center justify-center border-2 rounded border-secondary-beige"}>
                                                <p className="text-sm text-custom-medium-gray italic text-center">No facilities specified.</p>
                                            </div>
                                            )}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={"lg:ml-20 min-w-[300px]"}>
                            <div className={"flex flex-col px-6 py-8 gap-4 mx-auto w-full max-w-[400px] items-center rounded border-2 border-secondary-beige bg-custom-white"}>
                                <h2 className={"font-medium font-text tracking-wider text-xl"}>{singleVenue.price} NOK
                                    / night</h2>
                                <BookingCalendar
                                    selectedDates={selectedDates}
                                    setSelectedDates={setSelectedDates}
                                    bookedDates={bookedDates}
                                    labelClassName="text-sm"
                                    btnClassName="text-sm"
                                />
                                <Guests
                                    adults={adults}
                                    setAdults={setAdults}
                                    children={children}
                                    setChildren={setChildren}
                                    maxGuests={singleVenue.maxGuests}
                                    classname={"text-sm"}
                                />
                                <div
                                    className={"font-text w-full flex justify-between items-center bg-custom-white font-medium text-lg px-1"}>
                                    <p>Total</p>
                                    <p>
                                        {nights > 0 ? `${totalPrice} NOK` : <span className={"font-light text-base text-custom-medium-gray"}>Select dates</span>}
                                    </p>
                                </div>
                                <div className={"hidden lg:block"}>
                                    <PrimaryButton text={"Book Stay"} onClick={handleBooking}/>
                                </div>
                                {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
                            </div>
                            <div
                                className={"flex flex-col items-center font-text border-2 border-secondary-beige mt-4 bg-custom-white rounded gap-4 p-6"}>
                                <div className={"flex items-center gap-3"}>
                                    <img className={"w-10 h-10 object-cover rounded-full"}
                                         src={singleVenue.owner.avatar?.url} alt={singleVenue.owner.avatar?.alt}/>
                                    <div className={"flex flex-col"}>
                                        <p className={"font-medium text-base"}>{singleVenue.owner.name}</p>
                                        <p className={"font-light text-sm text-custom-medium-gray"}>
                                            {singleVenue.owner.email.length > 25 ? singleVenue.owner.email.slice(0, 25) + "..." : singleVenue.owner.email}
                                        </p>
                                    </div>
                                </div>
                                <div className={"w-full bg-secondary-beige h-px my-2"}></div>
                                <p className={"font-light text-sm text-custom-medium-gray"}>{singleVenue.owner.bio ? singleVenue.owner.bio : "No bio available."}</p>
                            </div>
                        </div>
                    </div>
                        <div
                            className={"lg:hidden fixed bottom-0 left-0 w-screen flex bg-custom-white z-40 justify-between p-3 border-t-2 border-t-secondary-beige font-text items-center"}>
                            <div className={"text-xs flex flex-col gap-1"}>
                                <p className={"font-medium text-sm"}>{singleVenue.price} NOK / night</p>
                                {selectedDates?.from && selectedDates?.to ? (
                                    <p>{formatDate(selectedDates.from)} - {formatDate(selectedDates.to)}</p>
                                ) : (
                                    <p>Select your dates</p>
                                )}
                            </div>
                            <PrimaryButton className="w-full max-w-[160px] text-sm" text={"Book Stay"} onClick={handleBooking}/>
                        </div>
                    </div>
                    <PopularVenues/>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}