
export function SkeletonVenueCard() {
    return (
        <div className="flex flex-col overflow-hidden rounded w-[240px] cursor-pointer shadow animate-pulse">
            <div className="relative">
                <div className="h-[160px] w-full bg-gray-300"></div>
            </div>
            <div className="flex flex-col p-5 gap-6">
                <div className="flex gap-2 flex-col">
                    <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                </div>
                <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
}
