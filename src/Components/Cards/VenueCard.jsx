import {Rating} from "../Rating/Rating.jsx";
import {Link} from "react-router-dom";

export function VenueCard({venue}) {
    const firstImage = venue.media?.[0]?.url || "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg";
    const imageAlt = venue.media?.[0]?.alt || "Venue image";

    return (
        <>
            <Link to={`/single-venue/${venue.id}`}>
                <div key={venue.id} className={"flex flex-col overflow-hidden rounded w-[240px] cursor-pointer"}>
                    <div className={"relative"}>
                        <Rating/>
                        {firstImage && (
                            <img
                                src={firstImage}
                                alt={imageAlt}
                                className="h-[160px] w-full object-cover"
                            />
                        )}
                    </div>
                    <div className={"flex flex-col p-5 gap-4"}>
                        <div className={"flex gap-1 flex-col"}>
                            <p className={"font-title text-custom-text"}>{venue.name}</p>
                            <p className={"font-text text-custom-text"}>{venue.location?.city}, {venue.location?.country}</p>
                        </div>
                        <p className={"font-text text-custom-text"}>{venue.price} NOK / night</p>
                    </div>
                </div>
            </Link>
        </>
    )
}