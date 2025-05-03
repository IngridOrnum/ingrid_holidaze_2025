import React, {useState} from "react";
import {Calendar} from "@demark-pro/react-booking-calendar";

import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

export function BookingCalendar({selectedDates, setSelectedDates}) {
    const [showCalendar, setShowCalendar] = useState(false);

    function formatDate(date) {
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
        });
    }

    const formattedRange =
        selectedDates.length > 1
            ? `${formatDate(new Date(selectedDates[0]))} - ${formatDate(
                new Date(selectedDates[selectedDates.length - 1])
            )}`
            : "Select dates";

    return (

        <div className="w-[300px] relative">
            <label className={"block mb-1"}>Dates</label>
            <button className={"border border-black p-1 w-full text-left"}
                    onClick={() => setShowCalendar((prev) => !prev)}
            >
                {formattedRange}
            </button>

            {showCalendar && (
                <Calendar
                    selected={selectedDates}
                    onChange={setSelectedDates}
                    range={true}
                />
            )}
        </div>
    );
}
