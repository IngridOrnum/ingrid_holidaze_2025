import { useState } from "react";
import { DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css';

export function BookingCalendar({ selectedDates, setSelectedDates, bookedDates = [] }) {
    const [showCalendar, setShowCalendar] = useState(false);

    function formatDate(date) {
        if (!date) return "";
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
        });
    }

    const formattedRange = selectedDates?.from
        ? `${formatDate(selectedDates.from)} - ${formatDate(selectedDates.to || selectedDates.from)}`
        : "Select dates";

    return (
        <div className="w-full relative">
            <label className="block mb-1">Dates</label>
            <button
                className="border border-black p-1 w-full text-left"
                onClick={() => setShowCalendar(prev => !prev)}
            >
                {formattedRange}
            </button>

            {showCalendar && (
                <div className="absolute top-full left-0 bg-white z-10 mt-2 border p-2 shadow rounded">
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
                    />
                </div>
            )}
        </div>
    );
}
