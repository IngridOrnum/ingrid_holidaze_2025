import React, { useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";

import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";

export function BookingCalendar ({selectedDates, setSelectedDates}) {
        return (
            <div className="w-[300px]">
                <Calendar
                    selected={selectedDates}
                    onChange={setSelectedDates}
                    range={true}
                />
            </div>

        );
}
