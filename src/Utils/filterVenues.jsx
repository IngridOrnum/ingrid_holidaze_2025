export function filterVenues({ venues, priceRange, facilities, totalGuests, selectedDates }) {
    return venues.filter((venue) => {
        if (venue.price < priceRange[0] || venue.price > priceRange[1]) {
            return false;
        }

        if (venue.maxGuests < totalGuests) {
            return false;
        }

        if (facilities.length > 0) {
            for (const facility of facilities) {
                // Check if venue.meta exists and has the facility
                if (!venue.meta || venue.meta[facility] !== true) {
                    return false;
                }
            }
        }

        if (selectedDates?.from && selectedDates?.to && venue.bookings?.length > 0) {
            const startDate = new Date(selectedDates.from);
            const endDate = new Date(selectedDates.to);

            const isUnavailable = venue.bookings.some((booking) => {
                const bookingStart = new Date(booking.dateFrom);
                const bookingEnd = new Date(booking.dateTo);

                return (
                    (startDate < bookingEnd && endDate > bookingStart)
                );
            });

            if (isUnavailable) {
                return false;
            }
        }
        return true;
    });
}
