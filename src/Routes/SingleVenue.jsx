import {Link, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {Rating} from "../Components/Rating/Rating.jsx";

export function SingleVenue() {

    const [singleVenue, setSingleVenue] = useState(null);

    const {id} = useParams();
    const url = "https://v2.api.noroff.dev/holidaze/venues/";

    const facilityIcons = {
        wifi: "/assets/icons/wifi.svg",
        pets: "/assets/icons/pets.svg",
        breakfast: "/assets/icons/breakfast.svg",
        parking: "/assets/icons/car.svg",
    };


    useEffect(() => {
        async function getSingleVenue() {
            try {
                const res = await fetch(url + id);
                const data = await res.json();
                setSingleVenue(data.data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching venues:", error)
            }
        }

        getSingleVenue();
    }, [id]);

    return (
        <div className={"flex flex-col items-center justify-center"}>
            {singleVenue ? (
                <div>
                    <img src={singleVenue.media[0]?.url || "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"} alt={singleVenue.media[0]?.alt || singleVenue.name}/>
                    <div className={"flex justify-between"}>
                        <div>
                            <h1 className={"font-title text-custom-text text-3xl"}>{singleVenue.name}</h1>
                            <div className={"flex gap-1 bg-custom-white border border-[#FFDE74] items-center rounded w-fit right-0 m-2"}>
                                <div className={"font-text bg-[#FFDE74] text-custom-text items-center flex justify-center w-6 h-6 rounded text-sm"}>{singleVenue.rating}</div>
                                <span className={"font-text text-custom-text text-sm px-2"}>Excellent</span>
                            </div>
                            <p className={"text-custom-text"}>{singleVenue.description}</p>
                            <div>
                                {singleVenue.meta && (
                                    <ul className="flex flex-wrap gap-2 mt-4">
                                        {Object.entries(singleVenue.meta)
                                            .filter(([_, value]) => value === true)
                                            .map(([key]) => (
                                                <li key={key} className="text-custom-text px-2 py-1 rounded text-sm flex items-center gap-2 capitalize">
                                                    <img src={facilityIcons[key]} alt={key} className="w-4 h-4" />
                                                    {key}
                                                </li>
                                            ))}
                                    </ul>

                                )}
                            </div>
                        </div>
                        <div>
                            <p>{singleVenue.price} NOK / night</p>
                            <Link to={"/confirm-booking"}>
                                <button className={"bg-blue-400"}>Book Stay</button>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}