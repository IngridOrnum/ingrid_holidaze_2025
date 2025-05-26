import {useEffect, useState} from "react";
import {getVenues} from "../../Api/Venue/getVenues.jsx";
import {VenueCard} from "../Cards/VenueCard.jsx";
import {SkeletonVenueCard} from "../Cards/SkeletonVenueCard.jsx";

export function PopularVenues() {
    const [popularVenues, setPopularVenues] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function fetchPopular() {
            setLoading(true);
            const venues = await getVenues({
                searchQuery: "",
                sortOption: "latest",
                page: 1,
                limit: 100
            });

            const venuesWithBookingCount = venues
                .filter((venue) => Array.isArray(venue.bookings))
                .sort((a, b) => b.bookings.length - a.bookings.length)
                .slice(0, 6);

            setPopularVenues(venuesWithBookingCount);
            setLoading(false);
        }

        fetchPopular();
    }, []);


    return (
        <section className="flex flex-col px-4 py-8 items-center my-8 md:my-16 md:gap-4">
            <h2 className="font-text uppercase font-bold tracking-wider text-center text-lg text-gray-800 mb-4 md:text-2xl">
                Popular Venues
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading
                    ? Array(6)
                        .fill(0)
                        .map((_, i) => <SkeletonVenueCard key={i}/>)
                    : popularVenues.map((venue) => (
                        <VenueCard key={venue.id} venue={venue}/>
                    ))}
            </div>
        </section>
    );
}