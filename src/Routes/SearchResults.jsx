import {Filters} from "../Components/Filters/index.jsx";
import {useEffect, useState} from "react";
import {VenueCard} from "../Components/Cards/VenueCard.jsx";


export function SearchResults() {

    const url = "https://v2.api.noroff.dev/holidaze/venues?sort=created&sortOrder=desc"

    const [venues, setVenues] = useState([]);
    const [sortOption, setSortOption] = useState("latest");
    const [priceRange, setPriceRange] = useState([0, 10000]);


    useEffect(() => {
        async function getVenues () {
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

    const filteredVenues = venues.filter((venue) => {
        return venue.price >= priceRange[0] && venue.price <= priceRange[1];
    });

    const sortedVenues = [...filteredVenues].sort((a, b) => {
        if (sortOption === "price-low-high") {
            return a.price - b.price;
        } else if (sortOption === "price-high-low") {
            return b.price - a.price;
        } else if (sortOption === "latest")
        {
            return new Date(b.created) - new Date(a.created);
        }
        return 0;
    })

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
                    <label>Dates</label>
                    <input className={"border border-black"}/>
                </div>
                <div className={"flex flex-col"}>
                    <label>Guests</label>
                    <input className={"border border-black"}/>
                </div>
               <Filters priceRange={priceRange} setPriceRange={setPriceRange} />
                <div>
                    <span>Facilities</span>
                    <div>
                        <input type="checkbox" name="wifi" value="wifi"/>
                        <label htmlFor="wifi">Wi-Fi</label>
                        <input type="checkbox" name="parking" value="parking"/>
                        <label htmlFor="parking">Parking</label>
                        <input type="checkbox" name="breakfast" value="breakfast"/>
                        <label htmlFor="breakfast">Breakfast</label>
                        <input type="checkbox" name="pets" value="pets"/>
                        <label htmlFor="pets">Pets Allowed</label>
                    </div>
                </div>
                <button className={"border border-black p-2"}>Clear All Filters</button>
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