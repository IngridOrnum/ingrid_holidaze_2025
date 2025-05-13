import { create } from 'zustand';

export const useBookingStore = create((set) => ({
    booking: null,
    setBooking: (bookingData) => set({ booking: bookingData }),
    clearBooking: () => set({ booking: null }),
}));
