import {Filters} from "../Components/Filters/index.jsx";
import {useEffect, useState} from "react";
import {VenueCard} from "../Components/Cards/VenueCard.jsx";
import {filterVenues} from "../Utils/filterVenues.jsx";
import {sortVenues} from "../Utils/sortVenues.jsx";
import {Guests} from "../Components/Filters/Guests.jsx";
import {BookingCalendar} from "../Components/Filters/Calendar.jsx";
import {Facilities} from "../Components/Filters/Facilities.jsx";

export function SearchResults() {

    const url = "https://v2.api.noroff.dev/holidaze/venues?_bookings=true&sort=created&sortOrder=desc"

    const [venues, setVenues] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [facilities, setFacilities] = useState([]);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const totalGuests = adults + children;
    const [selectedDates, setSelectedDates] = useState([]);


    const filteredVenues = filterVenues({
        venues,
        priceRange,
        facilities,
        totalGuests,
        selectedDates
    });

    const [sortOption, setSortOption] = useState("latest");
    const sortedVenues = sortVenues(filteredVenues, sortOption);


    useEffect(() => {
        async function getVenues() {
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                if (!data.data) throw new Error("Data not found in response");
                setVenues(data.data);
            } catch (error) {
                console.error("Error fetching venues:", error)
            }
        }

        getVenues();
    }, []);

    function handleClearFilters() {
        setPriceRange([0, 10000]);
        setFacilities([]);
        setAdults(1);
        setChildren(0);
        setSelectedDates([]);
        setSortOption("latest");
    }

    return (
        <div className={"flex"}>
            <div className={"filter-aside"}>
                <div className={"flex flex-col"}>
                    <label htmlFor="sort">Sort by</label>
                    <select
                        name="sort"
                        id="sort"
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value)}
                        className="border border-black p-1"
                    >
                        <option value="latest">Latest</option>
                        <option value="price-high-low">Price high-low</option>
                        <option value="price-low-high">Price low-high</option>
                    </select>
                </div>
                <div className={"flex flex-col"}>
                    <label>Location</label>
                    <input className={"border border-black"}/>
                </div>
                <div className={"flex flex-col"}>
                    <BookingCalendar
                        selectedDates={selectedDates}
                        setSelectedDates={setSelectedDates}/>
                </div>
                <Guests
                    adults={adults}
                    setAdults={setAdults}
                    children={children}
                    setChildren={setChildren}
                />
                <Filters
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    facilities={facilities}
                    setFacilities={setFacilities}
                    setChildren={setChildren}
                    setAdults={setAdults}
                />
                <Facilities
                    facilities={facilities}
                    setFacilities={setFacilities}
                />
                <button
                    className={"border border-black p-2 cursor-pointer"}
                    onClick={handleClearFilters}>
                    Clear All Filters
                </button>
            </div>
            <div className={"flex flex-col items-center"}>
                <h1>Search Results</h1>
                <div className={"flex flex-wrap items-center justify-center"}>
                    {sortedVenues.map((venue) => (
                        <VenueCard key={venue.id} venue={venue}/>
                    ))}
                </div>
            </div>
        </div>
    )
}