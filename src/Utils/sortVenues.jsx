export function sortVenues(venues, sortOption) {
    return [...venues].sort((a, b) => {
        if (sortOption === "price-low-high") return a.price - b.price;
        if (sortOption === "price-high-low") return b.price - a.price;
        if (sortOption === "latest") return new Date(b.created) - new Date(a.created);
        return 0;
    });
}
