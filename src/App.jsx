import {Hero} from "./Components/Sections/hero.jsx";
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
                <div className={"absolute w-full bottom-2 mx-8 lg:mx-20 px-2"}>
                    <div
                        className={"mx-auto border border-primary-orange rounded-full flex items-center p-1 justify-between bg-custom-white text-sm max-w-[360px]"}>
                        <input type="text"
                               value={searchQuery}
                               onChange={(e) => setSearchQuery(e.target.value)}
                               placeholder="Search Venues"
                               className={"px-4 focus:outline-none"}
                        />
                        <button onClick={handleSearchClick}
                                className={"rounded-full bg-primary-orange border border-primary-orange cursor-pointer p-2 text-custom-white transition-all duration-300 hover:bg-custom-white hover:text-primary-orange"}>
                            <Search className={"h-4 w-4"}/>
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
