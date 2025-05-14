import {useEffect, useState} from "react";
import {readProfile} from "../Store/userStore.jsx";
import {useAuthStore} from "../Store/authStore.jsx";
import {AsideMenu} from "../Components/Layout/AsideMenu.jsx";
import {isVenueManager} from "../Utils/userRole.jsx";

export function Profile() {
    const [profile, setProfile] = useState(null);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        async function fetchProfile() {
            try {
                if (!user?.name) return;
                const profileData = await readProfile(user.name);
                setProfile(profileData.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }

        document.title = 'Holidaze - My Profile';
        fetchProfile();
    }, [user]);

    if (!profile) {
        return <div>Loading...</div>
    }

    return (
        <div className={"flex min-h-screen"}>
            <AsideMenu profile={profile}/>
            <div className="flex-1 flex flex-col items-center p-4">
                <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md text-center">
                    <div className="relative w-20 h-20 mx-auto">
                        <img
                            className="w-20 h-20 object-cover rounded-full"
                            src={profile.avatar?.url}
                            alt={profile.avatar?.alt}
                        />
                        {isVenueManager(profile) && (
                            <span className="absolute bottom-0 right-0 bg-orange-500 w-5 h-5 rounded-full flex items-center justify-center">

    </span>
                        )}
                    </div>


                    <h2 className="text-lg font-semibold">{profile.name}</h2>
                    <p className="text-orange-500 text-sm mb-2 flex items-center justify-center gap-2">
                        {isVenueManager(profile) ? (
                            <>
                                <span className="inline-block w-4 h-4 bg-orange-500 rounded-full"></span> {/* Midlertidig ikon */}
                                Venue Manager
                            </>
                        ) : (
                            "Customer"
                        )}
                    </p>
                    <p className="text-gray-500 text-sm mb-4">
                        {profile.bio || "No bio available"}
                    </p>
                    <button className="border border-orange-500 text-orange-500 rounded px-4 py-2 text-sm cursor-pointer">
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>

    )
}