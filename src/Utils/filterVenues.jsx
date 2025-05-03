export function filterVenues ({venues, priceRange, facilities, totalGuests, selectedDates}) {
    return venues.filter((venue) => {
        const withinSetPrice = venue.price >= priceRange[0] && venue.price <= priceRange[1];
        const hasFacilities = facilities.length === 0 || facilities.every((facility) => venue.meta?.[facility] === true)
        const capacity = venue.maxGuests >= totalGuests;

        const isAvailable = selectedDates.length === 0 || selectedDates.every((selectedDate) => {
            const selected = new Date(selectedDate);
            return venue.bookings.every((booking) => {
                const from = new Date(booking.dateFrom);
                const to = new Date(booking.dateTo);
                return selected < from || selected > to;
            });
        });

        return withinSetPrice && hasFacilities && capacity && isAvailable;
    });
}
