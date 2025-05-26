import { useState } from "react";
import { postVenue } from "../../Api/Venue/postVenue.jsx";
import { StarRatingInput } from "../Rating/StarRating.jsx";
import { Rating } from "../Rating/Rating.jsx";
import { SecondaryButton } from "../Buttons/SecondaryButton.jsx";
import { PrimaryButton } from "../Buttons/PrimaryButton.jsx";
import { TertiaryButton } from "../Buttons/TertiaryButton.jsx";
import { Modal } from "../Modals/Modal.jsx";
import {FormStepIndicator} from "../Sections/FormStepIndicator.jsx";

export function CreateVenueForm({ onSuccess, onBackToVenues, setToast }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: 0,
        maxGuests: 0,
        rating: 0,
        media: [],
        meta: { wifi: false, parking: false, breakfast: false, pets: false },
        location: { address: "", city: "", zip: "", country: "", continent: "" },
    });
    const [newImageUrl, setNewImageUrl] = useState("");
    const [newImageCaption, setNewImageCaption] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setErrorMessage("");

        if (name in formData.meta) {
            setFormData((prev) => ({ ...prev, meta: { ...prev.meta, [name]: checked } }));
        } else if (name.startsWith("location.")) {
            const locField = name.split(".")[1];
            setFormData((prev) => ({ ...prev, location: { ...prev.location, [locField]: value } }));
        } else {
            let updatedValue = type === "number" ? Number(value) : value;

            if (name === "price" && updatedValue > 10000) {
                setErrorMessage("Price cannot exceed 10,000 NOK.");
                setTimeout(() => setErrorMessage(""), 3000);
                return;
            }

            if (name === "maxGuests" && updatedValue > 100) {
                setErrorMessage("Guests cannot exceed 100.");
                setTimeout(() => setErrorMessage(""), 3000);
                return;
            }

            setFormData((prev) => ({ ...prev, [name]: updatedValue }));
        }
    }

    function handleAddImage(url, alt) {
        if (!url) return;

        setFormData((prev) => ({
            ...prev,
            media: [...prev.media, { url, alt }],
        }));

        setNewImageUrl("");
        setNewImageCaption("");
    }

    function handleRemoveImage(index) {
        setFormData((prev) => ({
            ...prev,
            media: prev.media.filter((_, i) => i !== index),
        }));
    }

    function handleBack() {
        if (step > 1) setStep((prev) => prev - 1);
    }

    function handleClose() {
        setShowCancelModal(true);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (step < 3) return;

        setIsLoading(true);
        setToast({ message: "Creating venue...", type: "info" });

        try {
            await postVenue(formData);
            setToast({ message: "Venue successfully created!", type: "success" });
            if (onSuccess) onSuccess();
        } catch (error) {
            setToast({ message: `Error creating venue: ${error.message}`, type: "error" });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <form
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                className="flex flex-col gap-6 w-full max-w-lg items-center font-text mt-10"
            >

                <FormStepIndicator title="Create" name={formData.name} step={step} />

                {step === 1 && (
                    <>
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="name">Title</label>
                            <input name="name" value={formData.name} onChange={handleChange} className="border rounded p-2 w-full border-secondary-beige bg-custom-white" />
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <label htmlFor="description">Description</label>
                            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border rounded p-2 w-full border-secondary-beige bg-custom-white" />
                        </div>
                        <div className="flex gap-4 w-full">
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="price">Price</label>
                                <div className="relative w-full">
                                    <input type="number" name="price" placeholder="Price / night" value={formData.price} onChange={handleChange} className="border rounded p-2 w-full border-secondary-beige bg-custom-white pr-20" />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">NOK</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="maxGuests">Guests</label>
                                <div className="relative w-full">
                                    <input type="number" name="maxGuests" placeholder="Capacity (max guests)" value={formData.maxGuests} onChange={handleChange} className="border rounded p-2 w-full border-secondary-beige bg-custom-white pr-20" />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">guests</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between w-full">
                            <div className="flex flex-col gap-2 w-full md:w-[248px]">
                                <span>Facilities</span>
                                <fieldset className="flex flex-wrap gap-5 border bg-custom-white px-4 py-5 items-center border-secondary-beige h-[110px]">
                                    {["parking", "breakfast", "wifi", "pets"].map((item) => (
                                        <label key={item}>
                                            <input type="checkbox" name={item} checked={formData.meta[item]} onChange={handleChange} /> {item.charAt(0).toUpperCase() + item.slice(1)}
                                        </label>
                                    ))}
                                </fieldset>
                            </div>
                            <div className="flex flex-col gap-2 w-full md:w-[248px]">
                                <label>Rating</label>
                                <div className="border bg-custom-white p-4 border-secondary-beige flex flex-col items-center gap-4 h-[110px]">
                                    <StarRatingInput value={formData.rating} onChange={(rating) => setFormData((prev) => ({ ...prev, rating }))} />
                                    <Rating rating={formData.rating} />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="flex flex-col w-full">
                            <label htmlFor="url">Image URL</label>
                            <input name="url" type="url" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} className="border rounded p-2 border-secondary-beige bg-custom-white" />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="alt">Image Caption</label>
                            <input name="alt" type="text" value={newImageCaption} onChange={(e) => setNewImageCaption(e.target.value)} className="border rounded p-2 border-secondary-beige bg-custom-white" />
                        </div>
                        {newImageUrl && (
                            <div className="flex flex-col border border-secondary-beige bg-custom-white py-4 px-4 w-full">
                                <p>Preview:</p>
                                <img src={newImageUrl} alt="Image preview" className="mt-2 max-w-full max-h-48 object-cover rounded border border-secondary-beige" onError={(e) => (e.target.style.display = "none")} />
                            </div>
                        )}
                        <TertiaryButton onClick={() => handleAddImage(newImageUrl, newImageCaption)} text="+ Add Image" />
                        <div className="flex flex-col">
                            <p>Added Images:</p>
                            <div className="flex flex-wrap gap-4 mt-4">
                                {formData.media.map((img, i) => (
                                    <div key={i} className="relative group w-24 h-24 rounded overflow-hidden border border-secondary-beige">
                                        <img src={img.url} alt={img.alt || "Venue image"} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(i)}
                                            className="absolute top-1 text-xl cursor-pointer justify-center mx-auto right-1 bg-white text-red-900 rounded-full w-7 h-7 items-center opacity-0 group-hover:opacity-100 transition"
                                            aria-label="Remove image"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        {["address", "city", "country", "continent", "zip"].map((field) => (
                            <input key={field} name={`location.${field}`} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} value={formData.location[field]} onChange={handleChange} className="border rounded p-2 border-secondary-beige bg-custom-white" />
                        ))}
                    </>
                )}

                {errorMessage && <p className="text-red-900 text-sm">{errorMessage}</p>}

                <div className="flex items-center justify-center mt-8 flex-col-reverse gap-4 w-full md:flex-row">
                    <TertiaryButton onClick={handleClose} text="Cancel" />
                    <SecondaryButton onClick={handleBack} text="Back" disabled={step === 1} />
                    {step < 3 ? <PrimaryButton onClick={() => setStep(step + 1)} text="Continue" /> : <PrimaryButton onClick={handleSubmit} text={isLoading ? "Publishing..." : "Publish"} disabled={isLoading} />}
                </div>
            </form>

            <Modal
                isOpen={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                onConfirm={() => {
                    setShowCancelModal(false);
                    if (onBackToVenues) onBackToVenues();
                }}
                message="Are you sure you want to discard changes?"
                confirmText="Discard Changes"
                cancelText="Continue Editing"
            />
        </div>
    );
}