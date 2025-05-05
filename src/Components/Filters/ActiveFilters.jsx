export function ActiveFilters({ priceRange, totalGuests, facilities, selectedDates, searchQuery, onClear}) {
    const hasFilters =
        priceRange[0] > 0 ||
        priceRange[1] < 10000 ||
        facilities.length > 0 ||
        totalGuests > 1 ||
        selectedDates.length > 0 ||
        searchQuery.trim().length > 0;

    if (!hasFilters) return null;

    return (
        <div className="bg-gray-100 p-3 mb-4 rounded border border-gray-300">
            <h2 className="font-semibold mb-2">Active Filters:</h2>
            <ul className="list-disc list-inside space-y-1 text-sm">
                {searchQuery.trim() && <li>Search: <strong>{searchQuery}</strong></li>}

                {priceRange[0] > 0 || priceRange[1] < 10000 ? (
                    <li>Price: {priceRange[0]} - {priceRange[1]} NOK</li>
                ) : null}

                {totalGuests > 1 && <li>Guests: {totalGuests}</li>}

                {facilities.length > 0 && (
                    <li>Facilities: {facilities.join(", ")}</li>
                )}

                {selectedDates.length === 2 && (
                    <li>
                        Dates: {new Date(selectedDates[0]).toLocaleDateString()} –{" "}
                        {new Date(selectedDates[1]).toLocaleDateString()}
                    </li>
                )}
            </ul>

            <button
                onClick={onClear}
                className="mt-3 px-3 py-1 text-sm bg-red-100 hover:bg-red-200 border border-red-300 rounded"
            >
                Clear Filters
            </button>
        </div>
    );
}
