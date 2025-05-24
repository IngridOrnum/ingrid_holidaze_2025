import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';

export function BookingCalendar({ selectedDates, setSelectedDates, bookedDates = [] }) {
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);

    function formatDate(date) {
        if (!date) return "";
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
        });
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setShowCalendar(false);
            }
        }

        if (showCalendar) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showCalendar]);


    const formattedRange = selectedDates?.from
        ? `${formatDate(selectedDates.from)} - ${formatDate(selectedDates.to || selectedDates.from)}`
        : "Select dates";

    return (
        <div ref={calendarRef} className="w-full relative flex flex-col font-text gap-1">
        <label className={"block font-medium tracking-wider"}>Dates</label>
            <button
                className="border border-custom-light-gray rounded p-2 w-full text-left cursor-pointer"
                onClick={() => setShowCalendar(prev => !prev)}
            >
                {formattedRange}
            </button>

            {showCalendar && (
                <div className="absolute top-full left-0 bg-white z-10 mt-2  p-2 shadow rounded w-full overflow-hidden">

                <DayPicker
                        mode="range"
                        selected={selectedDates}
                        onSelect={setSelectedDates}
                        numberOfMonths={1}
                        pagedNavigation
                        modifiers={{
                            booked: bookedDates,
                        }}
                        modifiersClassNames={{
                            booked: 'booked-day',
                        }}
                        disabled={bookedDates}
                        className="text-sm w-full"
                    />
                </div>
            )}
        </div>
    );
}
