import { Rating } from "../Rating/Rating.jsx";
import { Link } from "react-router-dom";
import {MapPin} from "lucide-react";

export function VenueCard({ venue }) {

    function formatLocation(str, maxLength = 15) {
        if (!str) return "";
        const formatted = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        return formatted.length > maxLength
            ? formatted.slice(0, maxLength - 1) + "…"
            : formatted;
    }


    if (!venue) {
        return null;
    }

    const city = formatLocation(venue.location?.city) || "Oslo";
    const country = formatLocation(venue.location?.country) || "Norway";


    const firstImage = venue.media?.[0]?.url || "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg";
    const imageAlt = venue.media?.[0]?.alt || "Venue image";

    return (
        <Link to={`/single-venue/${venue.id}`}>
            <div className="flex flex-col overflow-hidden rounded w-[240px] cursor-pointer shadow transition-transform duration-200 hover:scale-[1.02] hover:shadow-md">
            <div className="relative">
                <Rating rating={venue.rating ?? 0} className="absolute right-2 top-2" />
                <img
                        src={firstImage}
                        alt={imageAlt}
                        className="h-[160px] w-full object-cover"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg";
                        }}
                    />
                </div>
                <div className="flex flex-col p-5 gap-6">
                    <div className="flex gap-2 flex-col">
                        <p className="font-text text-lg font-medium tracking-wider text-custom-text max-w-[200px] truncate">
                            {venue.name}
                        </p>

                        <p className="font-text text-sm text-custom-text flex gap-1 items-center whitespace-nowrap overflow-hidden text-ellipsis">
                            <MapPin className="font-light w-4 h-4" />
                            {city}, {country}
                        </p>

                    </div>
                    <p className="font-text font-medium text-custom-text">{venue.price} NOK / night</p>
                </div>
            </div>
        </Link>
    );
}