export function filterVenues ({venues, priceRange, facilities}) {
    return venues.filter((venue) => {
        const withinSetPrice = venue.price >= priceRange[0] && venue.price <= priceRange[1];

        const hasFacilities =
            facilities.length === 0 ||
            facilities.every((facility) => venue.meta?.[facility] === true)

        return withinSetPrice && hasFacilities;
    });
}
