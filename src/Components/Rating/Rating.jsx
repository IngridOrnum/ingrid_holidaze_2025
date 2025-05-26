import {Star} from "lucide-react";

export function Rating ({rating, className = ""}) {
    function getRatingText (rating) {
        if (rating >= 4.5) return "Outstanding";
        if (rating >= 4) return "Very Good";
        if (rating >= 3) return "Adequate";
        if (rating >= 2) return "Below Expectations";
        if (rating >= 1) return "Needs Improvement"
        return "No Rating";
    }


    return (
        <div className={`flex gap-1 p-1 bg-custom-white border border-[#FFDE74] items-center rounded w-fit ${className}`}>
            <div className={"font-text bg-[#FFDE74] text-custom-text lg:px-2 px-1 py-1 rounded flex gap-[4px] lg:gap-1 items-center text-xs"}>
                <Star className={"h-3 w-3 lg:h-4 lg:w-4 fill-black text-black"}/>
                {Math.round(rating)}
            </div>
            <span className={"font-text text-custom-text text-xs"}>
                {getRatingText(rating)}
            </span>
        </div>
    )
}