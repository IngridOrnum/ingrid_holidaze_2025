import {useEffect, useState} from "react";
import {readProfile} from "../Store/userStore.jsx";
import {useAuthStore} from "../Store/authStore.jsx";
import {AsideMenu} from "../Components/Layout/AsideMenu.jsx";
import {isVenueManager} from "../Utils/userRole.jsx";
import {updateProfile} from "../Api/Profile/putProfile.jsx";
import {toast} from "react-hot-toast";

export function Profile() {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        avatar: '',
        bio: '',
        role: 'customer',
    });
    const setUser = useAuthStore((state) => state.setUser);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        async function fetchProfile() {
            try {
                if (!user?.name) {
                    console.log("No user available, skipping profile fetch.");
                    return;
                }

                const profileData = await readProfile(user.name);
                setProfile(profileData.data);

                setFormData({
                    avatar: profileData.data.avatar?.url || '',
                    bio: profileData.data.bio || '',
                    role: profileData.data.venueManager ? 'manager' : 'customer',
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        }

        if (user) {
            document.title = 'Holidaze - My Profile';
            fetchProfile();
        }
    }, [user]);


    if (!user) {
        return <div className="text-center p-8">You must be logged in to view this page.</div>;
    }


    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSaveChanges(e) {
        e.preventDefault();
        try {
            const updatedProfile = {
                avatar: { url: formData.avatar, alt: `${profile.name}'s avatar` },
                bio: formData.bio,
                venueManager: formData.role === 'manager',
            };

            await updateProfile(user.name, updatedProfile);

            setProfile(prev => ({
                ...prev,
                ...updatedProfile
            }));

            setUser({
                ...user,
                ...updatedProfile,
            });

            toast.success("Profile updated successfully! 🎉");
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error("Error updating profile 😞");
        }
    }


    function handleCancel() {
        if (!profile) return;
        setFormData({
            avatar: profile.avatar?.url || '',
            bio: profile.bio || '',
            role: profile.venueManager ? 'manager' : 'customer',
        });
        setIsEditing(false); // Lukk skjema
        toast('Changes cancelled', { icon: '❌' });
    }


    return (
        <div className={"flex min-h-screen"}>
            <AsideMenu profile={profile}/>
            <div className="flex-1 flex flex-col items-center p-4">
                {!profile ? (
                    <div className="text-center p-8">Loading profile...</div>
                ) : (
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
                    <button
                        className="border border-orange-500 text-orange-500 rounded px-4 py-2 text-sm cursor-pointer"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit Profile
                    </button>
                    {isEditing && (
                    <div className={"border border-secondary-beige"}>
                        <form className={"flex flex-col font-text text-left p-4"} onSubmit={handleSaveChanges}>
                            <label htmlFor="avatar">Avatar Image (url)</label>
                            <input
                                type="text"
                                name="avatar"
                                value={formData.avatar}
                                onChange={handleChange}
                                className={"border border-custom-light-gray rounded px-4 py-2 mt-2 mb-6"}
                            />

                            <label htmlFor="bio">Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                cols="30"
                                rows="5"
                                className={"border border-custom-light-gray rounded px-4 py-2 mt-2 mb-6"}
                            ></textarea>

                            <fieldset className="border border-gray-300 p-4 rounded mb-6">
                                <legend className="text-sm font-medium text-gray-700 p-2">Register as a:</legend>
                                <div>
                                    <input
                                        type="radio"
                                        id="customer"
                                        name="role"
                                        value="customer"
                                        checked={formData.role === 'customer'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="customer">Customer</label>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        id="manager"
                                        name="role"
                                        value="manager"
                                        checked={formData.role === 'manager'}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="manager">Venue Manager</label>
                                </div>
                            </fieldset>

                            <div className={"flex items-center mx-auto gap-6"}>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="border border-custom-light-gray text-custom-light-gray rounded px-4 py-2 text-sm cursor-pointer"
                                >
                                    Cancel & Close
                                </button>

                                <button type="submit" className="border border-orange-500 text-orange-500 rounded px-4 py-2 text-sm cursor-pointer">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                        )}
                </div>
                )}
            </div>
        </div>

    )
}