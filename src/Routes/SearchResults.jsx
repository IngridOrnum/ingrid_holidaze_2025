import { useSearchParams } from "react-router-dom";
import {getVenues} from "../Api/Venue/getVenues.jsx";
import {Filters} from "../Components/Filters/index.jsx";
import {useEffect, useState} from "react";
import {VenueCard} from "../Components/Cards/VenueCard.jsx";
import {filterVenues} from "../Utils/filterVenues.jsx";
import {sortVenues} from "../Utils/sortVenues.jsx";
import {Guests} from "../Components/Filters/Guests.jsx";
import {BookingCalendar} from "../Components/Filters/Calendar.jsx";
import {Facilities} from "../Components/Filters/Facilities.jsx";
import {Search} from "../Components/Filters/Search.jsx";

export function SearchResults() {
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get("q") || "";
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [venues, setVenues] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [facilities, setFacilities] = useState([]);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const totalGuests = adults + children;
    const [selectedDates, setSelectedDates] = useState();

    const [page, setPage] = useState(1);
    const [moreToLoad, setMoreToLoad] = useState(true);
    const limit = 20;

    useEffect(() => {
        (async () => {
            const data = await getVenues({
                searchQuery,
                sortOption,
                page,
                limit,
            });

            if (searchQuery.trim()) {
                setVenues(data);
                setMoreToLoad(false);
            } else {
                setVenues((prev) => {
                    const newVenues = data.filter(
                        (newVenue) => !prev.some((venue) => venue.id === newVenue.id)
                    );
                    return [...prev, ...newVenues];
                });

                if (data.length < limit) {
                    setMoreToLoad(false);
                }
            }
        })();
    }, [page, sortOption, searchQuery]);


    const filteredVenues = filterVenues({
        venues,
        priceRange,
        facilities,
        totalGuests,
        selectedDates,
    });

    const [sortOption, setSortOption] = useState("latest");
    const sortedVenues = sortVenues(filteredVenues, sortOption);

    console.log("Total sorted venues:", sortedVenues.length);
    const uniqueIds = new Set(sortedVenues.map((v) => v.id));
    console.log("Unique venue ids:", uniqueIds.size);

    useEffect(() => {
        document.title = 'Holidaze - Search Results'
    }, []);

    useEffect(() => {
        setVenues([]);
        setPage(1);
        setMoreToLoad(true)
    }, [sortOption, searchQuery]);

    useEffect(() => {
        (async () => {
            await getVenues();
        })();
    }, [page, sortOption, searchQuery]);

    function handleClearFilters() {
        setPriceRange([0, 10000]);
        setFacilities([]);
        setAdults(1);
        setChildren(0);
        setSelectedDates([]);
        setSortOption("latest");
        setSearchQuery("");

        setVenues([]);
        setPage(1);
        setMoreToLoad(true);
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
                <Search
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    setVenues={setVenues}
                    setPage={setPage}
                />
                <BookingCalendar
                    selectedDates={selectedDates}
                    setSelectedDates={setSelectedDates}
                />
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
                {moreToLoad && (
                    <button
                        className={"p-2 border border-black cursor-pointer"}
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Load More
                    </button>
                )}
            </div>
        </div>
    )
}