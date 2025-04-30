export function Rating () {
    return (
        <div className={"flex gap-1 p-1 bg-custom-white border border-[#FFDE74] items-center rounded w-fit absolute right-0 m-2"}>
            <div className={"font-text bg-[#FFDE74] text-custom-text p-1 rounded text-sm"}>5.0</div>
            <span className={"font-text text-custom-text text-sm"}>Excellent</span>
        </div>
    )
}