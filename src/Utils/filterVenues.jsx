export function filterVenues({ venues, priceRange, facilities, totalGuests, selectedDates }) {
    return venues.filter((venue) => {
        // 1. Filter by price
        if (venue.price < priceRange[0] || venue.price > priceRange[1]) {
            return false;
        }

        // 2. Filter by guest capacity
        if (venue.maxGuests < totalGuests) {
            return false;
        }

        // 3. Filter by facilities
        if (facilities.length > 0) {
            for (const facility of facilities) {
                // Check if venue.meta exists and has the facility
                if (!venue.meta || venue.meta[facility] !== true) {
                    return false;
                }
            }
        }

        // 4. Filter by selected dates
        if (selectedDates.length === 2 && venue.bookings?.length > 0) {
            const [startDate, endDate] = selectedDates.map((d) => new Date(d));

            const isUnavailable = venue.bookings.some((booking) => {
                const bookingStart = new Date(booking.dateFrom);
                const bookingEnd = new Date(booking.dateTo);

                // Check for date overlap
                return (
                    (startDate <= bookingEnd && endDate >= bookingStart)
                );
            });

            if (isUnavailable) {
                return false;
            }
        }

        return true; // ✅ Passed all filters
    });
}
