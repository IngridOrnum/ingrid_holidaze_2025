import { useState, useEffect } from "react";
import { putVenue } from "../../Api/Venue/putVenue.jsx";
import {StarRatingInput} from "../Rating/StarRating.jsx";
import { useLocation } from "react-router-dom";

export function EditVenueForm({ venueData, onSuccess, onCancel }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(venueData);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [newImageCaption, setNewImageCaption] = useState('');

    useEffect(() => {
        if (venueData) {
            setFormData(venueData);
        }
    }, [venueData]);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        if (name in formData.meta) {
            setFormData((prev) => ({
                ...prev,
                meta: { ...prev.meta, [name]: checked },
            }));
        } else if (name.startsWith("location.")) {
            const locField = name.split(".")[1];
            setFormData((prev) => ({
                ...prev,
                location: { ...prev.location, [locField]: value },
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === "number" ? Number(value) : value,
            }));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (step < 3) {
            console.warn("Submit blocked, not on final step.");
            return;
        }

        try {
            await putVenue(formData.id, formData);
            alert("Venue updated!");
            if (onSuccess) onSuccess();
        } catch (error) {
            alert("Error updating venue: " + error.message);
        }
    }

    function handleBack() {
        if (step > 1) {
            setStep((prev) => prev - 1);
        } else if (onCancel) {
            onCancel();
        }
    }

    function handleAddImage(url, alt) {
        if (!url) return;

        setFormData((prev) => ({
            ...prev,
            media: [...prev.media, { url, alt }],
        }));

        setNewImageUrl('');
        setNewImageCaption('');
    }


    return (
        <form
            onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
            }}
            className="flex flex-col gap-6 w-full max-w-lg"
        >
        <button type="button" onClick={handleBack} className="text-sm text-gray-600 hover:underline">
                &lt; Back
            </button>
            <h2 className="text-xl font-bold">Edit – <span className="font-semibold">{formData.name}</span></h2>
            {/* Progress steps like in create form */}
            <div className="flex justify-center items-center gap-6">
                <div className={`flex flex-col items-center ${step >= 1 ? 'text-orange-500' : 'text-gray-400'}`}>
                    <span>🔴</span><p>Venue Details</p>
                </div>
                <div className="w-8 h-1 bg-orange-500"></div>
                <div className={`flex flex-col items-center ${step >= 2 ? 'text-orange-500' : 'text-gray-400'}`}>
                    <span>🖼️</span><p>Media</p>
                </div>
                <div className="w-8 h-1 bg-orange-500"></div>
                <div className={`flex flex-col items-center ${step === 3 ? 'text-orange-500' : 'text-gray-400'}`}>
                    <span>📍</span><p>Location</p>
                </div>
            </div>

            {step === 1 && (
                <>
                    <input name="name" placeholder="Title" value={formData.name} onChange={handleChange} className="border rounded p-2" />
                    <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border rounded p-2" />

                    <div className="flex gap-4">
                        <input type="number" name="price" placeholder="Price / night" value={formData.price} onChange={handleChange} className="border rounded p-2 w-1/2" />
                        <input type="number" name="maxGuests" placeholder="Capacity (max guests)" value={formData.maxGuests} onChange={handleChange} className="border rounded p-2 w-1/2" />
                    </div>

                    <div className="flex gap-4">
                    <fieldset className="flex flex-wrap gap-4">
                        <label><input type="checkbox" name="parking" checked={formData.meta.parking} onChange={handleChange} /> Parking</label>
                        <label><input type="checkbox" name="breakfast" checked={formData.meta.breakfast} onChange={handleChange} /> Breakfast</label>
                        <label><input type="checkbox" name="wifi" checked={formData.meta.wifi} onChange={handleChange} /> Wi-Fi</label>
                        <label><input type="checkbox" name="pets" checked={formData.meta.pets} onChange={handleChange} /> Pets Allowed</label>
                    </fieldset>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <StarRatingInput
                            value={formData.rating || 0}
                            onChange={(rating) =>
                                setFormData((prev) => ({ ...prev, rating }))
                            }
                        />
                    </div>

                </>
            )}

            {step === 2 && (
                <>
                    <input type="url" placeholder="Image URL" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} className="border rounded p-2" />
                    <input type="text" placeholder="Image Caption" value={newImageCaption} onChange={(e) => setNewImageCaption(e.target.value)} className="border rounded p-2" />
                    <button type="button" onClick={() => handleAddImage(newImageUrl, newImageCaption)}>
                        + Add Image
                    </button>

                    <ul className="text-sm text-gray-600 space-y-1 mt-2">
                        {formData.media?.map((img, i) => (
                            <li key={i}>✅ {img.url} {img.alt && `– ${img.alt}`}</li>
                        ))}
                    </ul>

                </>
            )}

            {step === 3 && (
                <>
                    <input name="location.address" placeholder="Address" value={formData.location.address} onChange={handleChange} className="border rounded p-2" />
                    <input name="location.city" placeholder="City" value={formData.location.city} onChange={handleChange} className="border rounded p-2" />
                    <input name="location.country" placeholder="Country" value={formData.location.country} onChange={handleChange} className="border rounded p-2" />
                    <input name="location.continent" placeholder="Continent" value={formData.location.continent} onChange={handleChange} className="border rounded p-2" />
                    <input name="location.zip" placeholder="Zip" value={formData.location.zip} onChange={handleChange} className="border rounded p-2" />
                </>
            )}

            <div className="flex justify-between mt-8">
                {step > 1 ? (
                    <button type="button" onClick={handleBack} className="border border-orange-500 text-orange-500 px-6 py-2 rounded hover:bg-orange-100 transition">Back</button>
                ) : (
                    <button type="button" onClick={onCancel} className="border border-orange-500 text-orange-500 px-6 py-2 rounded hover:bg-orange-100 transition">Cancel</button>
                )}

                {step < 3 ? (
                    <button type="button" onClick={() => setStep(step + 1)} className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition ml-auto">Continue</button>
                ) : (
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition ml-auto"
                    >
                        Update Venue
                    </button>
                )}
            </div>
        </form>
    );
}
