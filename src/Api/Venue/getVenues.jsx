import {API_VENUES} from "../Constants.jsx";

export async function getVenues({ searchQuery, sortOption, page, limit,}) {
    try {
        const sortKey = sortOption === "latest" ? "created" : "price";
        const sortOrder = sortOption === "price-low-high" ? "asc" : "desc";

        let url;

        if (searchQuery.trim()) {
            const params = new URLSearchParams({ q: searchQuery.trim() });
            url = `${API_VENUES}/search?${params.toString()}`;
        } else {
            const params = new URLSearchParams({
                _bookings: "true",
                sort: sortKey,
                sortOrder: sortOrder,
                limit: limit.toString(),
                page: page.toString(),
            });
            url = `${API_VENUES}?${params.toString()}`;
        }

        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error("Error fetching venues:", error);
        return [];
    }
}
