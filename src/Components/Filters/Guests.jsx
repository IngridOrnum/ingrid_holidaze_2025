import {useState} from "react";
import {PlusIcon, MinusIcon} from "lucide-react";

export function Guests({ adults, setAdults, children, setChildren, maxGuests }) {
    const [showGuestCounter, setShowGuestCounter] = useState(false);
    const maxCount = maxGuests ?? 40;
    const totalCount = adults + children;
    const reachedMaxGuests = totalCount >= maxCount;
    const showPlusSign = maxCount === 40 && totalCount >= maxCount;
    const totalDisplay = `${totalCount}${showPlusSign ? "+" : ""} guests`;

    function increment(typeGuest) {
        const totalGuests = adults + children;
        if (totalGuests >= maxCount) return;

        if (typeGuest === "adults") {
            setAdults((prev) => prev + 1);
        }
        if (typeGuest === "children") {
            setChildren((prev) => prev + 1);
        }
    }

    function decrement(typeGuest) {
        if (typeGuest === "adults") {
            setAdults((prev) => Math.max(prev - 1, 1));
        }
        if (typeGuest === "children") {
            setChildren((prev) => Math.max(prev - 1, 0));
        }
    }


    return (
        <div className={"relative w-full"}>
            <label className={"block mb-1"}>Guests</label>
            <button className={"border border-custom-light-gray p-1 w-full text-left flex gap-3 items-center"}
                    onClick={() => setShowGuestCounter((prev) => !prev)}
            >
                {totalDisplay}
                {reachedMaxGuests && <span className="ml-2 text-xs text-red-500">(Guest limit)</span>}
            </button>

            {showGuestCounter && (
                <div className={"absolute z-10 bg-white border border-custom-light-gray p-4 top-full w-full rounded shadow"}>
                    <div className={"flex justify-between items-center mb-2"}>
                        <span>Adults</span>
                        <div className="flex items-center gap-2">
                            <button onClick={() => decrement("adults")} className={"rounded-full border border-custom-light-gray w-6 h-6 flex items-center justify-center hover:bg-custom-light-gray cursor-pointer"}>
                                <MinusIcon/>
                            </button>
                            <span>{adults}</span>
                            <button onClick={() => increment("adults")} disabled={reachedMaxGuests}
                                    className={`rounded-full border border-custom-light-gray w-6 h-6 flex items-center justify-center 
                                    ${reachedMaxGuests ? "opacity-50 cursor-not-allowed" : "hover:bg-custom-light-gray cursor-pointer"}`}>
                                <PlusIcon/>
                            </button>
                        </div>
                    </div>
                    <div className={"flex justify-between items-center"}>
                        <span>Children</span>
                        <div className="flex items-center gap-2">
                            <button onClick={() => decrement("children")} className={"rounded-full border border-custom-light-gray w-6 h-6 flex items-center justify-center hover:bg-custom-light-gray cursor-pointer"}>
                                <MinusIcon/>
                            </button>
                            <span>{children === 20 ? "20+" : children}</span>
                            <button onClick={() => increment("children")} disabled={reachedMaxGuests}
                                    className={`rounded-full border border-custom-light-gray w-6 h-6 flex items-center justify-center 
                                    ${reachedMaxGuests ? "opacity-50 cursor-not-allowed" : "hover:bg-custom-light-gray cursor-pointer"}`}>
                                <PlusIcon/>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}