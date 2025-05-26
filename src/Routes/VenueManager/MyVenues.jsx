import { useState, useEffect } from "react";
import { AsideMenu } from "../../Components/Layout/AsideMenu.jsx";
import { CreateVenueForm } from "../../Components/Forms/createVenueForm.jsx";
import { VenueCard } from "../../Components/Cards/VenueCard.jsx";
import { useAuthStore } from "../../Store/authStore.jsx";
import { EditVenueForm } from "../../Components/Forms/editVenueForm.jsx";
import { DeleteVenue } from "../../Api/Venue/deleteVenue.jsx";
import { Modal } from "../../Components/Modals/Modal.jsx";
import { Pencil, Trash2 } from "lucide-react";
import {getVenuesByProfile} from "../../Api/Venue/getMyVenues.jsx";
import {readProfile} from "../../Store/userStore.jsx";

export function MyVenues() {
    const [venues, setVenues] = useState([]);
    const [view, setView] = useState('list');
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [venueToDelete, setVenueToDelete] = useState(null);
    const [toast, setToast] = useState({ message: '', type: '' });
    const user = useAuthStore((state) => state.user);
    const [expandedBookings, setExpandedBookings] = useState({});
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        document.title = 'Holidaze - My Venues';

        async function fetchVenues() {
            if (!user?.name) return;

            try {
                const myVenues = await getVenuesByProfile(user.name);
                setVenues(myVenues);
            } catch (error) {
                console.error("Error fetching venues with bookings:", error);
            }
        }

        fetchVenues();
    }, [user]);

    useEffect(() => {
        if (toast.message) {
            const timer = setTimeout(() => setToast({ message: '', type: '' }), 6000);
            return () => clearTimeout(timer);
        }
    }, [toast.message]);

    function toggleBookings(venueId) {
        setExpandedBookings((prev) => ({
            ...prev,
            [venueId]: !prev[venueId],
        }));
    }

    useEffect(() => {
        async function fetchProfile() {
            if (!user?.name) return;
            try {
                const response = await readProfile(user.name);
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        }
        if (user) {
            fetchProfile();
        }
    }, [user]);

    function formatDate(date) {
        return new Date(date).toLocaleDateString('no-NO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    return (
        <div className="flex min-h-screen py-4">
            {toast.message && (
                <div
                    className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white ${
                        toast.type === "success" ? "bg-primary-orange"
                            : toast.type === "error" ? "bg-red-900"
                                : "bg-yellow-400"
                    }`}
                >
                    {toast.message}
                </div>
            )}

            <AsideMenu profile={profile} />
            <div className="flex flex-col w-full items-center p-4 gap-2">
                <h1 className="font-title text-2xl mb-6 md:text-3xl lg:text-4xl lg:mb-12">My Venues</h1>
                <div className="flex gap-2 font-text text-sm">
                    <button
                        className={`cursor-pointer rounded border border-secondary-beige px-1 py-3 w-[148px] ${view === 'list' ? 'bg-secondary-beige' : ''}`}
                        onClick={() => setView('list')}
                    >
                        My Venues
                    </button>
                    <button
                        className={`cursor-pointer rounded border border-secondary-beige px-1 py-3 w-[148px] ${view === 'create' ? 'bg-secondary-beige' : ''}`}
                        onClick={() => setView('create')}
                    >
                        Create New Venue
                    </button>
                </div>

                <div className="h-px w-full bg-custom-light-gray mt-4 rounded flex flex-col gap-2" />

                {view === 'list' && (
                    <div className="flex flex-wrap gap-6 justify-center mt-4">
                        {venues.length > 0 ? (
                            venues.map((venue) => (
                                <div key={venue.id} className="flex flex-col items-center gap-3">
                                    <VenueCard venue={venue} />
                                    <div className="text-sm font-text w-full flex flex-col items-center">
                                        <button
                                            className="border border-secondary-beige bg-secondary-beige cursor-pointer hover:bg-custom-white rounded p-2 mt-2 font-text hover:underline"
                                            onClick={() => toggleBookings(venue.id)}
                                        >
                                            {expandedBookings[venue.id]
                                                ? 'Hide bookings'
                                                : `Show bookings (${venue.bookings?.length || 0})`}
                                        </button>

                                        {expandedBookings[venue.id] && (
                                            <div className="mt-2">
                                                {venue.bookings?.length > 0 ? (
                                                    <ul className="list-disc ml-4 gap-2 flex flex-col mt-2">
                                                        {venue.bookings.map((booking) => (
                                                            <li key={booking.id} className={"list-none"}>
                                                                {formatDate(booking.dateFrom)} - {formatDate(booking.dateTo)}
                                                                <div className={"h-px w-full bg-secondary-beige my-2"}></div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="ml-4">No bookings yet.</p>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            className="rounded flex items-center gap-2 justify-center w-28 border p-2 cursor-pointer text-custom-black border-secondary-beige hover:bg-secondary-beige"
                                            onClick={() => {
                                                setSelectedVenue(venue);
                                                setView('edit');
                                            }}
                                        >
                                            <Pencil className="w-4 h-4 text-green-700" />
                                            <p>Edit</p>
                                        </button>
                                        <button
                                            className="border rounded flex items-center justify-center gap-2 w-28 p-2 cursor-pointer text-custom-black border-secondary-beige hover:bg-secondary-beige"
                                            onClick={() => {
                                                setVenueToDelete(venue);
                                                setModalOpen(true);
                                            }}
                                        >
                                            <Trash2 className="w-5 h-5 text-red-700" />
                                            <p>Delete</p>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="font-text text-custom-text">You have no venues yet.</p>
                        )}
                    </div>
                )}

                {view === 'create' && (
                    <CreateVenueForm
                        onSuccess={async () => {
                            const updatedVenues = await getMyVenues();
                            setVenues(updatedVenues);
                            setView('list');
                        }}
                        setToast={setToast}
                    />
                )}

                {view === 'edit' && selectedVenue && (
                    <EditVenueForm
                        venueData={selectedVenue}
                        onSuccess={async () => {
                            const updatedVenues = await getMyVenues();
                            setVenues(updatedVenues);
                            setView('list');
                            setSelectedVenue(null);
                        }}
                        onCancel={() => {
                            setView('list');
                            setSelectedVenue(null);
                        }}
                        setToast={setToast}
                    />
                )}
            </div>

            <Modal
                isOpen={modalOpen}
                onClose={() => {
                    setModalOpen(false);
                    setVenueToDelete(null);
                }}
                onConfirm={async () => {
                    try {
                        if (!venueToDelete) return;
                        await DeleteVenue(venueToDelete.id);
                        const updatedVenues = await getMyVenues();
                        setVenues(updatedVenues);
                        setModalOpen(false);
                        setVenueToDelete(null);
                    } catch (error) {
                        alert("Failed to delete venue: " + error.message);
                    }
                }}
                message={`Are you sure you want to delete "${venueToDelete?.name}"?`}
            />
        </div>
    );
}
