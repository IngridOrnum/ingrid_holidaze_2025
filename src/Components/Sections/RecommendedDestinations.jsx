import React from "react";
import DestinationCard from "../Cards/DestinationCard";
import {useNavigate} from "react-router-dom";

const destinations = [
    { title: "AMSTERDAM", imageSrc: "/assets/landing-page/amsterdam.jpg" },
    { title: "DENMARK", imageSrc: "/assets/landing-page/denmark.jpg" },
    { title: "SWITZERLAND", imageSrc: "/assets/landing-page/switzerland.jpg" },
    { title: "ITALY", imageSrc: "/assets/landing-page/italy.jpg" },
];

export default function RecommendedDestinations() {
    const navigate = useNavigate();

    function handleDestinationClick (title) {
        navigate(`/search-results?q=${encodeURIComponent(title)}`);
    }
    return (
        <section className="px-4 py-8">
            <h2 className="text-center text-lg font-semibold text-gray-800 mb-4">
                Recommended Destinations
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {destinations.map((dest) => (
                    <DestinationCard
                        key={dest.title}
                        title={dest.title}
                        imageSrc={dest.imageSrc}
                        onClick={() => handleDestinationClick(dest.title)}
                    />
                ))}
            </div>
        </section>
    );
}
