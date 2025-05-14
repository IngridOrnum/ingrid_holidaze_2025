import {Link} from "react-router-dom";
import {Hero} from "./Components/Hero/hero.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Search} from 'lucide-react'

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
                            <Search/></button>
                    </div>
                </div>
            </div>

                <div className={"flex flex-col items-center"}>
                    <h2 className={"font-title text-lg"}>Recommended Destinations</h2>
                    <div className={"flex flex-col"}>
                        <div className={"flex"}>
                            <div className={"w-[165px] h-[120px] relative items-center rounded"}>
                                <img className={"object-cover h-full w-full absolute z-1 rounded"}
                                     src="/assets/landing-page/amsterdam.jpg" alt="amsterdam"/>
                                <div className={"absolute z-2 w-full h-full bg-black opacity-20 rounded"}></div>
                                <div className={"z-10 absolute w-full h-full items-center flex justify-center"}>
                                    <p className={"font-title text-base"}>
                                        Amsterdam
                                    </p>
                                </div>
                            </div>
                            <div className={"w-[165px] h-[120px] relative items-center rounded"}>
                                <img className={"object-cover h-full w-full absolute z-1 rounded"}
                                     src="/assets/landing-page/amsterdam.jpg" alt="amsterdam"/>
                                <div className={"absolute z-2 w-full h-full bg-black opacity-20 rounded"}></div>
                                <div className={"z-10 absolute w-full h-full items-center flex justify-center"}>
                                    <p className={"font-title text-base"}>
                                        Amsterdam
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={"flex"}>
                            <div className={"w-[165px] h-[120px] relative items-center rounded"}>
                                <img className={"object-cover h-full w-full absolute z-1 rounded"}
                                     src="/assets/landing-page/amsterdam.jpg" alt="amsterdam"/>
                                <div className={"absolute z-2 w-full h-full bg-black opacity-20 rounded"}></div>
                                <div className={"z-10 absolute w-full h-full items-center flex justify-center"}>
                                    <p className={"font-title text-base"}>
                                        Amsterdam
                                    </p>
                                </div>
                            </div>
                            <div className={"w-[165px] h-[120px] relative items-center rounded"}>
                                <img className={"object-cover h-full w-full absolute z-1 rounded"}
                                     src="/assets/landing-page/amsterdam.jpg" alt="amsterdam"/>
                                <div className={"absolute z-2 w-full h-full bg-black opacity-20 rounded"}></div>
                                <div className={"z-10 absolute w-full h-full items-center flex justify-center"}>
                                    <p className={"font-title text-base"}>
                                        Amsterdam
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




            <Link to={"/single-venue/:id"}>
                <div className={"bg-blue-400 p-6"}>
                    Single Venue
                </div>
            </Link>
        </div>
    )
}

export default App
