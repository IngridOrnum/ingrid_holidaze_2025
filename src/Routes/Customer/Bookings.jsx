import {useEffect, useState} from "react";
import {AsideMenu} from "../../Components/Layout/AsideMenu.jsx";
import {getBookingsByUser} from "../../Api/Booking/getBookingsByUser.jsx";
import {useAuthStore} from "../../Store/authStore.jsx";
import {deleteBooking} from "../../Api/Booking/deleteBooking.jsx";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


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

    async function handleCancel(bookingId) {
        toast((t) => (
            <div className="flex flex-col items-center gap-4 p-4">
                <p>Are you sure you want to cancel this booking?</p>
                <div className="flex gap-4">
                    <button
                        onClick={async () => {
                            toast.dismiss(t.id);
                            try {
                                await deleteBooking(bookingId);
                                setBookings((prevBookings) => prevBookings.filter((booking) => booking.id !== bookingId));
                                toast.success('Booking cancelled successfully! ✅');
                            } catch (err) {
                                console.error('Error cancelling booking:', err);
                                setError('Failed to cancel booking. Please try again.');
                                toast.error('Failed to cancel booking ❌');
                            }
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Yes, Cancel
                    </button>
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                    >
                        No, Keep
                    </button>
                </div>
            </div>
        ), { duration: 10000 });
    }

    return (
        <div className={"flex min-h-screen"}>
            <AsideMenu profile={profile}/>
            <div className="flex flex-col w-full items-center p-4 gap-2">
                <h1 className="text-xl font-bold mb-4">My Bookings</h1>
                <div className={"flex gap-2"}>
                    <div className={"flex gap-2"}>
                        <button
                            className={`border p-2 ${filter === "previous" ? "bg-gray-300 font-semibold" : ""}`}
                            onClick={() => setFilter("previous")}
                        >
                            Previous
                        </button>
                        <button
                            className={`border p-2 ${filter === "upcoming" ? "bg-gray-300 font-semibold" : ""}`}
                            onClick={() => setFilter("upcoming")}
                        >
                            Upcoming
                        </button>
                    </div>

                </div>
                {loading ? (
                    <div>Loading bookings...</div>
                ) : error ? (
                    <div>Error loading bookings: {error}</div>
                ) : bookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-7-8h6a2 2 0 012 2v16a2 2 0 01-2 2H9a2 2 0 01-2-2V6a2 2 0 012-2z" />
                        </svg>
                        <h2 className="mt-4 text-xl text-gray-500">You have no bookings yet</h2>
                        <a href="/search-results" className="mt-6 inline-block px-6 py-3 bg-primary-blue text-white rounded hover:bg-primary-dark transition">
                            Find venues
                        </a>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {filteredBookings.map((booking) => (
                            <li key={booking.id} className="border p-4 rounded">
                                <p><strong>Venue:</strong> {booking.venue.name}</p>
                                <p><strong>Date from:</strong> {booking.dateFrom}</p>
                                <p><strong>Date to:</strong> {booking.dateTo}</p>
                                {filter === "upcoming" && (
                                    <button
                                        onClick={() => handleCancel(booking.id)}
                                        className="mt-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                                {filter === "previous" && (
                                    <button
                                        onClick={() => navigate(`/single-venue/${booking.venue.id}`)}
                                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
                                    >
                                        Book Again
                                    </button>
                                )}

                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}