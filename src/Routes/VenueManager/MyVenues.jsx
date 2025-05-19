import { useState, useEffect } from "react";
import { AsideMenu } from "../../Components/Layout/AsideMenu.jsx";
import { CreateVenueForm } from "../../Components/Forms/CreateVenueForm.jsx";
import { VenueCard } from "../../Components/Cards/VenueCard.jsx";
import {useAuthStore} from "../../Store/authStore.jsx";
import {readProfile} from "../../Store/userStore.jsx";

export function MyVenues({venues = [] }) {
    const [profile, setProfile] = useState(null);
    const [view, setView] = useState('list');

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
            fetchProfile();
        }
    }, [user]);

    if (!user) {
        return <div className="text-center p-8">You must be logged in to view this page.</div>;
    }

    return (
        <div className="flex min-h-screen">
            <AsideMenu profile={profile} />
            <div className="flex-1 flex flex-col items-center p-4">
                {!profile ? (
                    <div className="text-center p-8">Loading profile...</div>
                ) : (
                    <>
                <h1>My Venues</h1>
                <div className="flex gap-4">
                    <button
                        className={`rounded border border-custom-light-gray px-4 py-2 ${view === 'list' ? 'bg-gray-100' : ''}`}
                        onClick={() => setView('list')}
                    >
                        My Venues
                    </button>
                    <button
                        className={`rounded border border-custom-light-gray px-4 py-2 ${view === 'create' ? 'bg-gray-100' : ''}`}
                        onClick={() => setView('create')}
                    >
                        Create New Venue
                    </button>
                </div>
                <div className="h-px w-full bg-custom-light-gray mt-4" />
                        {view === 'list' && (
                            <div className="flex flex-wrap gap-6 justify-center">
                                {profile.venues && profile.venues.length > 0 ? (
                                    profile.venues.map((venue) => (
                                        <div className={"flex flex-col items-center gap-4"}>
                                        <VenueCard key={venue.id} venue={venue} />
                                            <div className={"flex gap-4"}>
                                                <button className={"border p-2 cursor-pointer text-green-700"}>Edit</button>
                                                <button className={"border p-2 cursor-pointer text-red-700"}>Delete</button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="font-text text-custom-text">You have no venues yet.</p>
                                )}
                            </div>
                        )}

                        {view === 'create' && (
                    <CreateVenueForm onSuccess={() => setView('list')} />
                )}
                    </>
                    )}
            </div>
        </div>
    );
}
