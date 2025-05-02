export function filterVenues ({venues, priceRange, facilities, totalGuests}) {
    return venues.filter((venue) => {
        const withinSetPrice = venue.price >= priceRange[0] && venue.price <= priceRange[1];
        const hasFacilities = facilities.length === 0 || facilities.every((facility) => venue.meta?.[facility] === true)
        const capacity = venue.maxGuests >= totalGuests;

        return withinSetPrice && hasFacilities && capacity;
    });
}
