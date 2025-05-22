import {Hero} from "./Components/Hero/hero.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Search} from 'lucide-react'
import RecommendedDestinations from "./Components/Sections/RecommendedDestinations.jsx";
import {ExploreNow} from "./Components/Sections/ExploreNow.jsx";
import {PopularVenues} from "./Components/Sections/PopularVenues.jsx";

function App() {

    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    function handleSearchClick() {
        if (searchQuery.trim()) {
            navigate(`/search-results?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate("/search-results")
        }
    }

    useEffect(() => {
        document.title = 'Holidaze - Home'
    }, []);

    return (
        <div className={"flex flex-col justify-center items-center"}>
            <div className={"w-full items-center flex flex-col relative"}>
                <Hero/>
                <div className={"absolute bottom-6 w-full mx-[20px] lg:mx-[80px]"}>
                    <div
                        className={"border border-primary-orange rounded-full flex items-center p-2 mx-6 justify-between bg-custom-white"}>
                        <input type="text"
                               value={searchQuery}
                               onChange={(e) => setSearchQuery(e.target.value)}
                               placeholder="Search Venues"
                               className={"px-4 focus:outline-none"}
                        />
                        <button onClick={handleSearchClick}
                                className={"rounded-full bg-primary-orange border border-primary-orange cursor-pointer p-3 text-custom-white hover:bg-custom-white hover:text-primary-orange"}>
                            <Search/>
                        </button>
                    </div>
                </div>
            </div>
            <RecommendedDestinations/>
            <ExploreNow/>
            <PopularVenues/>
        </div>
    )
}

export default App
