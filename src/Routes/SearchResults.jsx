import {Filters} from "../Components/Filters/index.jsx";
import {useEffect} from "react";
import {VenueCard} from "../Components/Cards/VenueCard.jsx";
import {useState} from "react";

export function SearchResults() {

    const url = "https://v2.api.noroff.dev/holidaze/venues"

    const [venues, setVenues] = useState([]);

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

    return (
        <div className={"flex"}>
            <div className={"filter-aside"}>
                <div className={"border border-black p-2 w-fit"}>Sort by</div>
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
               <Filters/>
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
            <div>
                <h1>Search Results</h1>
                <div className={"flex flex-wrap items-center justify-center"}>
                    {venues.map((venue) => (
                        <VenueCard key={venue.id} venue={venue}/>
                    ))}
                </div>
            </div>
        </div>
)
}