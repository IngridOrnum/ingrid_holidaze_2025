import { useState, useEffect } from "react";
import { AsideMenu } from "../../Components/Layout/AsideMenu.jsx";
import { CreateVenueForm } from "../../Components/Forms/CreateVenueForm.jsx";
import { VenueCard } from "../../Components/Cards/VenueCard.jsx";
import {useAuthStore} from "../../Store/authStore.jsx";
import {readProfile} from "../../Store/userStore.jsx";
import {EditVenueForm} from "../../Components/Forms/editVenueForm.jsx";
import {DeleteVenue} from "../../Api/Venue/deleteVenue.jsx";
import {Modal} from "../../Components/Modals/Modal.jsx";
import {Pencil, Trash2} from "lucide-react";


export function MyVenues() {
    const [profile, setProfile] = useState(null);
    const [view, setView] = useState('list');
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [venueToDelete, setVenueToDelete] = useState(null);

    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        document.title = 'Holidaze - My Venues';
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
            void fetchProfile();
        }
    }, [user]);

    if (!user) {
        return <div className="text-center p-8">You must be logged in to view this page.</div>;
    }

    return (
        <div className="flex min-h-screen py-4">
            <AsideMenu profile={profile} />
            <div className="flex flex-col w-full items-center p-4 gap-2">
                {!profile ? (
                    <div className="text-center p-8">Loading profile...</div>
                ) : (
                    <>
                <h1 className="font-title text-2xl mb-6 md:text-3xl lg:text-4xl lg:mb-12">My Venues</h1>
                <div className="flex gap-4">
                    <button
                        className={`cursor-pointer rounded border border-secondary-beige p-2 w-40 ${view === 'list' ? 'bg-secondary-beige' : ''}`}
                        onClick={() => setView('list')}
                    >
                        My Venues
                    </button>
                    <button
                        className={`cursor-pointer rounded border border-secondary-beige p-2 w-40 ${view === 'create' ? 'bg-secondary-beige' : ''}`}
                        onClick={() => setView('create')}
                    >
                        Create New Venue
                    </button>
                </div>
                <div className="h-px w-full bg-custom-light-gray mt-4 rounded flex flex-col gap-2" />
                        {view === 'list' && (
                            <div className="flex flex-wrap gap-6 justify-center mt-4">
                                {profile.venues && profile.venues.length > 0 ? (
                                    profile.venues.map((venue) => (
                                        <div key={venue.id} className="flex flex-col items-center gap-3">
                                        <VenueCard key={venue.id} venue={venue} />
                                            <div className={"flex gap-4"}>
                                                <button
                                                    className="rounded flex items-center gap-2 justify-center w-28 border p-2 cursor-pointer text-custom-black border-secondary-beige hover:bg-secondary-beige"
                                                    onClick={() => {
                                                        setSelectedVenue(venue);
                                                        setView('edit');
                                                    }}
                                                >
                                                    <Pencil className={"w-4 h-4 text-green-700"}/>
                                                    <p>Edit</p>
                                                </button>
                                                <button
                                                    className="border rounded flex items-center justify-center gap-2 w-28 p-2 cursor-pointer text-custom-black border-secondary-beige border-secondary-beige hover:bg-secondary-beige"
                                                    onClick={() => {
                                                        setVenueToDelete(venue);
                                                        setModalOpen(true);
                                                    }}
                                                >
                                                    <Trash2 className={"w-5 h-5 text-red-700"}/>
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
                            <CreateVenueForm onSuccess={async () => {
                                const response = await readProfile(user.name);
                                setProfile(response.data);
                                setView('list')} }
                            />
                        )}
                        {view === 'edit' && selectedVenue && (
                            <EditVenueForm
                                venueData={selectedVenue}
                                onSuccess={async () => {
                                    const response = await readProfile(user.name);
                                    setProfile(response.data);
                                    setView('list');
                                    setSelectedVenue(null);
                                }}
                                onCancel={() => {
                                    setView('list');
                                    setSelectedVenue(null);
                                }}
                            />
                        )}


                    </>
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
                        const response = await readProfile(user.name);
                        setProfile(response.data);
                        setModalOpen(false);
                        setVenueToDelete(null);
                    } catch (error) {
                        alert("Failed to delete venue: " + error.message);
                    }
                }}
                message={`Are you sure you want to delete "${venueToDelete?.name}"?`}
            ></Modal>
        </div>
    );
}
