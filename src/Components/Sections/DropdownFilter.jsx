import {AllFilters} from "../Filters/AllFilters.jsx";
import {SecondaryButton} from "../Buttons/SecondaryButton.jsx";


export function DropdownFilter({ setShowMobileFilters, ...props }) {
    return (
        <aside className="fixed inset-0 bg-white z-50 overflow-y-auto p-4 md:hidden flex justify-center">
            <div className={"max-w-md items-center flex flex-col gap-4"}>
                <div className="flex justify-between items-center mb-4 w-full">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <button onClick={() => setShowMobileFilters(false)} className="text-lg border rounded-full w-10 h-10 cursor-pointer hover:bg-custom-medium-gray hover:text-custom-white">✕</button>
                </div>
                <AllFilters {...props}/>
                <SecondaryButton onClick={() => setShowMobileFilters(false)} text={"Apply Filters"}/>
            </div>

        </aside>
    )
}