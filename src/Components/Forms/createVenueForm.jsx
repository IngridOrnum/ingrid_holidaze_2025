import {useState} from "react";
import {postVenue} from "../../Api/Venue/postVenue.jsx";

export function CreateVenueForm({ onSuccess }) {

    const [step, setStep] = useState(1);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [newImageCaption, setNewImageCaption] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: 0,
        maxGuests: 0,
        rating: 0,
        media: [],
        meta: {
            wifi: false,
            parking: false,
            breakfast: false,
            pets: false,
        },
        location: {
            address: '',
            city: '',
            zip: '',
            country: '',
            continent: '',
            lat: 0,
            lng: 0,
        },
    });

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        if (name in formData.meta) {
            setFormData((prev) => ({
                ...prev,
                meta: { ...prev.meta, [name]: checked },
            }));
        } else if (name.startsWith('location.')) {
            const locationField = name.split('.')[1];
            setFormData((prev) => ({
                ...prev,
                location: { ...prev.location, [locationField]: value },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: type === "number" ? Number(value) : value }));
        }
    }

    function handleNext() {
        if (step < 3) {
            setStep((prevStep) => prevStep + 1);
        }
    }

    function handleBack() {
        if (step > 1) {
            setStep((prevStep) => prevStep - 1);
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await postVenue(formData);
            alert("Venue successfully created!");
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            alert(error.message);
        }
    }


        return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-lg">
                <div className="flex justify-center items-center gap-6">
                    <div className={`flex flex-col items-center ${step >= 1 ? 'text-orange-500' : 'text-gray-400'}`}>
                        <span>🔴</span>
                        <p>Venue Details</p>
                    </div>
                    <div className="w-8 h-1 bg-orange-500"></div>
                    <div className={`flex flex-col items-center ${step >= 2 ? 'text-orange-500' : 'text-gray-400'}`}>
                        <span>🖼️</span>
                        <p>Media</p>
                    </div>
                    <div className="w-8 h-1 bg-orange-500"></div>
                    <div className={`flex flex-col items-center ${step === 3 ? 'text-orange-500' : 'text-gray-400'}`}>
                        <span>📍</span>
                        <p>Location</p>
                    </div>
                </div>

                {step === 1 && (
                    <>
                        <input
                            type="text"
                            name="name"
                            placeholder="Title"
                            value={formData.name}
                            onChange={handleChange}
                            className="border rounded p-2"
                        />

                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="border rounded p-2"
                        />

                        <div className="flex gap-4">
                            <input
                                type="number"
                                name="price"
                                placeholder="Price / night"
                                value={formData.price}
                                onChange={handleChange}
                                className="border rounded p-2 w-1/2"
                            />
                            <input
                                type="number"
                                name="maxGuests"
                                placeholder="Capacity (max guests)"
                                value={formData.maxGuests}
                                onChange={handleChange}
                                className="border rounded p-2 w-1/2"
                            />
                        </div>

                        <fieldset className="flex flex-wrap gap-4">
                            <label><input type="checkbox" name="parking" checked={formData.meta.parking} onChange={handleChange} /> Parking</label>
                            <label><input type="checkbox" name="breakfast" checked={formData.meta.breakfast} onChange={handleChange} /> Breakfast</label>
                            <label><input type="checkbox" name="wifi" checked={formData.meta.wifi} onChange={handleChange} /> Wi-Fi</label>
                            <label><input type="checkbox" name="pets" checked={formData.meta.pets} onChange={handleChange} /> Pets Allowed</label>
                        </fieldset>

                    </>
                    )}

                {step === 2 && (
                    <>
                        <input
                            type="url"
                            placeholder="Image URL"
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            className="border rounded p-2"
                        />

                        <input
                            type="text"
                            placeholder="Image Caption"
                            value={newImageCaption}
                            onChange={(e) => setNewImageCaption(e.target.value)}
                            className="border rounded p-2"
                        />

                        <button type="button" onClick={() => handleAddImage(newImageUrl, newImageCaption)}>
                            + Add Image
                        </button>

                    </>
                )}

                {step === 3 && (
                    <>
                        <input
                            type="text"
                            name="location.address"
                            placeholder="Address"
                            value={formData.location.address}
                            onChange={handleChange}
                            className="border rounded p-2"
                        />

                        <input
                            type="text"
                            name="location.city"
                            placeholder="City"
                            value={formData.location.city}
                            onChange={handleChange}
                            className="border rounded p-2"
                        />

                        <input
                            type="text"
                            name="location.country"
                            placeholder="Country"
                            value={formData.location.country}
                            onChange={handleChange}
                            className="border rounded p-2"
                        />

                        <input
                            type="text"
                            name="location.continent"
                            placeholder="Continent"
                            value={formData.location.continent}
                            onChange={handleChange}
                            className="border rounded p-2"
                        />

                        <input
                            type="text"
                            name="location.zip"
                            placeholder="Zip"
                            value={formData.location.zip}
                            onChange={handleChange}
                            className="border rounded p-2"
                        />

                    </>
                )}

                <div className="flex justify-between mt-8">
                    {/* Tilbake knapp */}
                    {step > 1 && (
                        <button
                            type="button"
                            onClick={handleBack}
                            className="border border-orange-500 text-orange-500 px-6 py-2 rounded hover:bg-orange-100 transition"
                        >
                            Back
                        </button>
                    )}

                    {/* Neste eller Publiser knapp */}
                    {step < 3 ? (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition ml-auto"
                        >
                            Continue
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition ml-auto"
                        >
                            Publish New Venue
                        </button>
                    )}
                </div>

            </form>
        </>
    )
}