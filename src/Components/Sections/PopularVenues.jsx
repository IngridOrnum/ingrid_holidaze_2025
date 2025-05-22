import {useEffect, useState} from "react";
import {getVenues} from "../../Api/Venue/getVenues.jsx";
import {VenueCard} from "../Cards/VenueCard.jsx";

export function PopularVenues() {

    const [popularVenues, setPopularVenues] = useState([]);

    useEffect(() => {
        async function fetchPopular() {
            const venues = await getVenues({
                searchQuery: "",
                sortOption: "latest",
                page: 1,
                limit: 100
            });

            const venuesWithBookingCount = venues
                .filter((venue) => Array.isArray(venue.bookings))
                .sort((a, b) => b.bookings.length - a.bookings.length)
                .slice(0,6);

            setPopularVenues(venuesWithBookingCount);
        }
        fetchPopular()
    }, []);

    return (
        <section className="flex flex-col items-center gap-10 justify-center">
            <h2>Popular Venues</h2>
            <div className={"flex flex-wrap gap-4 justify-center"}>
                {popularVenues.map((venue) => (
                    <VenueCard key={venue.id} venue={venue} />
                ))}
            </div>
        </section>
    );
}