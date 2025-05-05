export function Search({ searchQuery, setSearchQuery}) {
    return (
        <div className={"flex flex-col"}>
            <label>Search</label>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-black p-1"
            />
        </div>
    );
}
