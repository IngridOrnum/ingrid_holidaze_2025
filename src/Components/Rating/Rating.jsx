export function Rating ({rating}) {
    function getRatingText (rating) {
        if (rating >= 4.5) return "Outstanding";
        if (rating >= 4) return "Very Good";
        if (rating >= 3) return "Adequate";
        if (rating >= 2) return "Below Expectations";
        if (rating >= 1) return "Needs Improvement"
        return "No Rating";
    }


    return (
        <div className={"absolute right-2 top-2 flex gap-1 p-1 bg-custom-white border border-[#FFDE74] items-center rounded w-fit"}>
            <div className={"font-text bg-[#FFDE74] text-custom-text px-2 py-1 rounded text-sm"}>
                {Math.round(rating)}
            </div>
            <span className={"font-text text-custom-text text-sm"}>
                {getRatingText(rating)}
            </span>
        </div>
    )
}