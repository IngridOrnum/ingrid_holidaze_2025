import {useEffect, useState} from "react";
import {AsideMenu} from "../../Components/Layout/AsideMenu.jsx";
import {getBookingsByUser} from "../../Api/Booking/getBookingsByUser.jsx";
import {useAuthStore} from "../../Store/authStore.jsx";
import {deleteBooking} from "../../Api/Booking/deleteBooking.jsx";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import {Modal} from "../../Components/Modals/Modal.jsx";
import {MapPin, Banknote, Calendar} from "lucide-react";
import {SecondaryButton} from "../../Components/Buttons/SecondaryButton.jsx";
import {PrimaryButton} from "../../Components/Buttons/PrimaryButton.jsx";
import {Link} from "react-router-dom";
import {SkeletonBookingVenue} from "../../Components/Cards/SkeletonBookingVenue.jsx";

export function Bookings() {
    const profile = useAuthStore((state) => state.user);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("upcoming");
    const navigate = useNavigate();

    const now = new Date();
    const upcomingBookings = bookings.filter(booking => new Date(booking.dateFrom) >= now);
    const previousBookings = bookings.filter(booking => new Date(booking.dateFrom) < now);
    const filteredBookings = filter === "upcoming" ? upcomingBookings : previousBookings;

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);

    function getLocationOrDefault(location, fallback) {
        return location ? formatLocation(location) : fallback;
    }

    function formatLocation(str, maxLength = 15) {
        if (!str) return "";
        const formatted = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        return formatted.length > maxLength
            ? formatted.slice(0, maxLength - 1) + "…"
            : formatted;
    }


    function handleOpenModal(bookingId) {
        setSelectedBookingId(bookingId);
        setModalOpen(true);
    }

    useEffect(() => {
        document.title = 'Holidaze - My Bookings';

        async function fetchBookings () {
            if (!profile?.name) {
                setLoading(false);
                return;
            }

            try {
                const data = await getBookingsByUser(profile.name);
                setBookings(data.bookings);
            } catch(err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchBookings();
    }, [profile?.name]);

    async function handleConfirmCancel() {
        try {
            await deleteBooking(selectedBookingId);
            setBookings((prev) => prev.filter((b) => b.id !== selectedBookingId));
            toast.success('Booking cancelled successfully!');
        } catch (err) {
            console.error('Error cancelling booking:', err);
            setError('Failed to cancel booking. Please try again.');
            toast.error('Failed to cancel booking');
        } finally {
            setModalOpen(false);
        }
    }

    function formatDate(date) {
        const d = new Date(date);
        return d.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    function calculateNights(from, to) {
        const start = new Date(from);
        const end = new Date(to);
        const diffInMs = end - start;
        const nights = diffInMs / (1000 * 60 * 60 * 24);
        return nights;
    }



    return (
        <div className={"flex min-h-screen py-4"}>
            <AsideMenu profile={profile}/>
            <div className="flex flex-col w-full items-center p-4 gap-2">
                <h1 className="font-title text-2xl mb-6 md:text-3xl lg:text-4xl lg:mb-12">My Bookings</h1>
                <div className={"flex gap-2"}>
                    <div className={"flex font-light gap-4"}>
                        <button
                            className={`cursor-pointer rounded border border-secondary-beige p-2 w-30 ${filter === "previous" ? "bg-secondary-beige" : ""}`}
                            onClick={() => setFilter("previous")}
                        >
                            Previous
                        </button>
                        <button
                            className={`cursor-pointer border border-secondary-beige rounded p-2 w-30 ${filter === "upcoming" ? "bg-secondary-beige" : ""}`}
                            onClick={() => setFilter("upcoming")}
                        >
                            Upcoming
                        </button>
                    </div>
                </div>
                <div className={"h-px w-full bg-secondary-beige mt-4"}></div>
                {loading ? (
                    <ul className="space-y-4 w-full max-w-xl mx-auto">
                        {[...Array(3)].map((_, index) => (
                            <SkeletonBookingVenue key={index} />
                        ))}
                    </ul>
                ) : error ? (
                    <div>Error loading bookings: {error}</div>
                ) : filteredBookings.length === 0 ? (
                    <div className={"flex flex-col gap-10 items-center mt-2 md:gap-8"}>
                        <h2 className="font-text mt-4 text-sm md:text-lg text-gray-500">
                            {filter === "upcoming"
                                ? "You have no upcoming bookings yet."
                                : "You have no previous bookings yet."}
                        </h2>
                        <Link to={"/search-results"}>
                            <PrimaryButton text={"Browse Venues"} />
                        </Link>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {filteredBookings.map((booking) => {
                            const city = getLocationOrDefault(booking.venue.location?.city, "Oslo");
                            const country = getLocationOrDefault(booking.venue.location?.country, "Norway");
                            const firstImage = booking.venue.media?.[0]?.url || "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg";
                            const imageAlt = booking.venue.media?.[0]?.alt || "Venue image";
                            const nights = calculateNights(booking.dateFrom, booking.dateTo);
                            const totalPrice = nights * booking.venue.price;

                            return (
                                <li key={booking.id} className="p-4 mt-4 rounded flex flex-col gap-2 relative">
                                    <div className="rounded flex gap-6 flex-col md:flex-row items-center">
                                        <img
                                            src={firstImage}
                                            alt={imageAlt}
                                            className="h-40 w-52 md:h-44 md:w-56 object-cover rounded"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg";
                                            }}
                                        />
                                        <div className={"font-text flex flex-col gap-2"}>
                                            <p className={"font-medium md:text-lg lg:text-2xl"}>{booking.venue.name}</p>
                                            <div className={"flex flex-col gap-2 font-text text-sm"}>
                                                <p className="flex gap-2 items-center whitespace-nowrap overflow-hidden text-ellipsis">
                                                    <MapPin className="font-light w-4 h-4" />
                                                    {[city, country].filter(Boolean).join(', ')}
                                                </p>
                                                <div className={"flex items-center gap-2"}>
                                                    <Calendar className="font-light w-4 h-4" />
                                                    <p>{formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}</p>
                                                </div>
                                                <div className={"flex gap-2"}>
                                                    <div className={"flex items-center gap-2"}>
                                                        <Banknote className="font-light w-4 h-4" />
                                                        <p className={"font-medium"}>Total:</p>
                                                    </div>
                                                    <p>{totalPrice} NOK</p>
                                                </div>
                                            </div>
                                            {filter === "upcoming" && (
                                                <SecondaryButton className={"text-sm mt-4 lg:h-fit lg:py-3"} onClick={() => handleOpenModal(booking.id)} text={"Cancel Booking"}/>
                                            )}
                                            {filter === "previous" && (
                                                <SecondaryButton className={"text-sm mt-4 lg:h-fit lg:py-3"}  onClick={() => navigate(`/single-venue/${booking.venue.id}`)} text={"Book Again"}/>
                                            )}
                                        </div>
                                    </div>
                                    <div className={"h-px w-full bg-secondary-beige mt-8"}></div>
                                </li>
                            )
                        })}
                    </ul>
                )}
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onConfirm={handleConfirmCancel}
                    message="Are you sure you want to cancel this booking?"
                />
            </div>
        </div>
    )
}