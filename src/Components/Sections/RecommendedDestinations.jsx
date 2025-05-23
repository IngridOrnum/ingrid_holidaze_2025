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
        <section className="flex flex-col px-4 py-8 items-center my-8 md:my-16 md:gap-4">
            <h2 className="font-title font-medium text-center text-lg text-gray-800 mb-4 md:text-xl xl:text-2xl">
                Recommended Destinations
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
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
