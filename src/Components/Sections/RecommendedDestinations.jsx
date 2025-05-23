import React from "react";
import DestinationCard from "../Cards/DestinationCard";
import {useNavigate} from "react-router-dom";

const destinations = [
    { title: "amsterdam", imageSrc: "/assets/landing-page/amsterdam.jpg" },
    { title: "denmark", imageSrc: "/assets/landing-page/denmark.jpg" },
    { title: "switzerland", imageSrc: "/assets/landing-page/switzerland.jpg" },
    { title: "italy", imageSrc: "/assets/landing-page/italy.jpg" },
];

export default function RecommendedDestinations() {
    const navigate = useNavigate();

    function handleDestinationClick (title) {
        navigate(`/search-results?q=${encodeURIComponent(title)}`);
    }
    return (
        <section className="flex flex-col px-4 py-8 items-center my-8 md:my-16 md:gap-4">
            <h2 className="font-text uppercase font-bold tracking-wider text-center text-lg text-gray-800 mb-4 md:text-2xl">
                Recommended Destinations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
