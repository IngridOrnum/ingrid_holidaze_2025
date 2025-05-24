export function Search({ searchQuery, setSearchQuery}) {
    return (
        <div className={"flex flex-col font-text gap-1 w-full"}>
            <label className={"font-medium tracking-wider"}>Search</label>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-custom-light-gray font-light rounded py-1 px-2 cursor-pointer w-full focus:outline-none"
            />
        </div>
    );
}
