import {useState} from "react";

export function Guests({adults, setAdults, children, setChildren}) {
    const [showGuestCounter, setShowGuestCounter] = useState(false);

    function increment(typeGuest) {
        if (typeGuest === "adults") setAdults((prev) => Math.min(prev + 1, 20));
        if (typeGuest === "children") setChildren((prev) => Math.min(prev + 1, 20));
    }

    function decrement(typeGuest) {
        if (typeGuest === "adults") setAdults((prev) => Math.max(prev - 1, 1));
        if (typeGuest === "children") setChildren((prev) => Math.max(prev - 1, 0));
    }

    const totalCount = adults + children;
    const totalDisplay = `${totalCount}${totalCount >= 40 ? "+" : ""} guests`;

    return (
        <div className={"relative"}>
            <label className={"block mb-1"}>Guests</label>
            <button className={"border border-black p-1 w-full text-left"}
                    onClick={() => setShowGuestCounter((prev) => !prev)}
            >
                {totalDisplay}
            </button>

            {showGuestCounter && (
                <div className={"absolute z-10 bg-white border border-gray-300 p-4 mt-2 w-full rounded shadow"}>
                    <div className={"flex justify-between items-center mb-2"}>
                        <span>Adults</span>
                        <div className="flex items-center gap-2">
                            <button onClick={() => decrement("adults")}>−</button>
                            <span>{adults === 20 ? "20+" : adults}</span>
                            <button onClick={() => increment("adults")}>+</button>
                        </div>
                    </div>
                    <div className={"flex justify-between items-center"}>
                        <span>Children</span>
                        <div className="flex items-center gap-2">
                            <button onClick={() => decrement("children")}>−</button>
                            <span>{children === 20 ? "20+" : children}</span>
                            <button onClick={() => increment("children")}>+</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}