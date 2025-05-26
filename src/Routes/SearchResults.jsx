import {useSearchParams} from "react-router-dom";
import {getVenues} from "../Api/Venue/getVenues.jsx";
import {useEffect, useState} from "react";
import {VenueCard} from "../Components/Cards/VenueCard.jsx";
import {filterVenues} from "../Utils/filterVenues.jsx";
import {sortVenues} from "../Utils/sortVenues.jsx";
import {SecondaryButton} from "../Components/Buttons/SecondaryButton.jsx";
import {AsideFilter} from "../Components/Sections/AsideFilter.jsx";
import {DropdownFilter} from "../Components/Sections/DropdownFilter.jsx";
import {ArrowDownUp, SlidersHorizontal} from "lucide-react";
import {SkeletonVenueCard} from "../Components/Cards/SkeletonVenueCard.jsx";

export function SearchResults() {
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get("q") || "";
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [facilities, setFacilities] = useState([]);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const totalGuests = adults + children;
    const [selectedDates, setSelectedDates] = useState();
    const [sortOption, setSortOption] = useState("latest");
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [loading, setLoading] = useState(false);

    const [allVenues, setAllVenues] = useState([]);

    const [page, setPage] = useState(1);
    const [moreToLoad, setMoreToLoad] = useState(true);
    const limit = 20;

    useEffect(() => {
        (async () => {
            setLoading(true);
            let all = [];
            let page = 1;
            let more = true;

            while (more) {
                const data = await getVenues({
                    searchQuery,
                    sortOption,
                    page,
                    limit: 100,
                });

                all = [...all, ...data];
                if (data.length < 100) more = false;
                else page++;
            }

            setAllVenues(all);
            setLoading(false);
        })();
    }, [searchQuery, sortOption]);


    const filteredVenues = filterVenues({
        venues: allVenues,
        priceRange,
        facilities,
        totalGuests,
        selectedDates,
    });


    const sortedVenues = sortVenues(filteredVenues, sortOption);
    const paginatedVenues = sortedVenues.slice(0, page * limit);
    console.log("Total sorted venues:", sortedVenues.length);
    const uniqueIds = new Set(paginatedVenues.map((v) => v.id));
    console.log("Unique venue ids:", uniqueIds.size);

    useEffect(() => {
        document.title = 'Holidaze - Search Results'
    }, []);

    useEffect(() => {
        setPage(1);
        setMoreToLoad(true)
    }, [sortOption, searchQuery]);

    function handleClearFilters() {
        setPriceRange([0, 10000]);
        setFacilities([]);
        setAdults(1);
        setChildren(0);
        setSelectedDates([]);
        setSortOption("latest");
        setSearchQuery("");
        setPage(1);
        setMoreToLoad(true);
    }

    return (
        <div className={"flex"}>
            {showMobileFilters && (
                <DropdownFilter
                    setShowMobileFilters={setShowMobileFilters}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    selectedDates={selectedDates}
                    setSelectedDates={setSelectedDates}
                    adults={adults}
                    setAdults={setAdults}
                    children={children}
                    setChildren={setChildren}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    facilities={facilities}
                    setFacilities={setFacilities}
                    handleClearFilters={handleClearFilters}
                />
            )}

            <AsideFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
                adults={adults}
                setAdults={setAdults}
                children={children}
                setChildren={setChildren}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                facilities={facilities}
                setFacilities={setFacilities}
                handleClearFilters={handleClearFilters}
            />

            <div className={"flex flex-col w-full items-center my-10"}>
                <h1 className="font-title tracking-wider text-center text-2xl text-gray-800 mb-4 md:text-3xl md:my-10 lg:text-4xl ">Filter and
                    Search</h1>
                <div>
                    <div className={"flex justify-between w-full mb-2 items-center"}>
                        <div className={"flex gap-1 font-text text-sm text-custom-medium-gray"}>
                            <span className={"font-bold"}>{sortedVenues.length}</span>
                            <span>results</span>
                        </div>
                        <button className={"flex items-center h-[36px] gap-1 border-2 border-secondary-beige rounded-sm px-2 md:hidden"} onClick={() => setShowMobileFilters(true)}>
                            <SlidersHorizontal className={"w-4 h-4"}/>
                            <span>Filter</span>
                        </button>
                        <div className="relative">
                            <button
                                onClick={() => setShowSortMenu((prev) => !prev)}
                                className="flex items-center gap-1 border-2 border-secondary-beige rounded-sm h-[36px] px-2 py-1"
                            >
                                <ArrowDownUp className="w-4 h-4" />
                                <span>Sort</span>
                            </button>

                            {showSortMenu && (
                                <div className="absolute right-0 bg-white border border-gray-300 rounded shadow z-50 text-base w-40 top-full">
                                    <button
                                        onClick={() => { setSortOption("latest"); setShowSortMenu(false); }}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        Latest
                                    </button>
                                    <div className={"h-px w-full bg-gray-200"}></div>
                                    <button
                                        onClick={() => { setSortOption("price-high-low"); setShowSortMenu(false); }}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        Price: High-Low
                                    </button>
                                    <div className={"h-px w-full bg-gray-200"}></div>
                                    <button
                                        onClick={() => { setSortOption("price-low-high"); setShowSortMenu(false); }}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        Price: Low-High
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                    <div className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"}>
                        {loading
                            ? Array(8)
                                .fill(0)
                                .map((_, i) => <SkeletonVenueCard key={i} />)
                            : paginatedVenues.length > 0
                                ? paginatedVenues.map((venue) => (
                                    <VenueCard key={venue.id} venue={venue} />
                                ))
                                : <p className="text-center text-custom-medium-gray text-sm col-span-full">No results found. Try adjusting your filters.</p>}
                    </div>


                    <div className={"flex flex-col items-center gap-4 my-12"}>
                        {moreToLoad && (
                            <SecondaryButton text={"Load More"} onClick={() => setPage((prev) => prev + 1)}/>
                        )}
                        <span
                            className={"font-text font-light text-custom-medium-gray text-sm"}>Showing {paginatedVenues.length} of {sortedVenues.length} results</span>
                    </div>
                </div>
            </div>
        </div>
    )
}