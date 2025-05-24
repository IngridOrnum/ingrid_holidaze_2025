import {Search} from "./Search.jsx";
import {BookingCalendar} from "./Calendar.jsx";
import {Guests} from "./Guests.jsx";
import {Price} from "./Price.jsx";
import {Facilities} from "./Facilities.jsx";
import {TertiaryButton} from "../Buttons/TertiaryButton.jsx";

export function AllFilters({
                            searchQuery, setSearchQuery,
                            selectedDates, setSelectedDates,
                            adults, setAdults,
                            children, setChildren,
                            priceRange, setPriceRange,
                            facilities, setFacilities,
                            handleClearFilters
                        }) {
    return (
        <div className={"flex flex-col items-center gap-4"}>
            <Search
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <BookingCalendar
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
            />
            <Guests
                adults={adults}
                setAdults={setAdults}
                children={children}
                setChildren={setChildren}
                showLimitMessage={false}
            />
            <Price
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                facilities={facilities}
                setFacilities={setFacilities}
                setChildren={setChildren}
                setAdults={setAdults}
            />
            <Facilities
                facilities={facilities}
                setFacilities={setFacilities}
            />
            <div className="w-full h-px bg-custom-light-gray mx-6 my-4"></div>
            <TertiaryButton onClick={handleClearFilters} text="Clear All Filters"/>
        </div>
    );
}
