
export function SkeletonBookingVenue() {
    return (
        <div className="p-4 mt-4 rounded flex flex-col gap-2 relative animate-pulse">
            <div className="rounded flex gap-6 flex-col md:flex-row items-center">
                <div className="h-40 w-52 md:h-44 md:w-56 bg-gray-300 rounded"></div>
                <div className="flex flex-col gap-2 w-full">
                    <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                    <div className="h-4 w-20 bg-gray-300 rounded"></div>
                    <div className="h-10 w-40 bg-gray-300 rounded mt-4"></div>
                </div>
            </div>
            <div className="h-px w-full bg-gray-300 mt-8"></div>
        </div>
    )
}
