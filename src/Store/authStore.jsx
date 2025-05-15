import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    accessToken: localStorage.getItem('accessToken') || null,
    user: (() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser || storedUser === "undefined") {
            return null;
        }
        return JSON.parse(storedUser);
    })(),



    setAccessToken: (token) => {
        localStorage.setItem('accessToken', token);
        set({ accessToken: token });
    },

    setUser: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        set({ user });
    },

    logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        set({ accessToken: null, user: null });
    },
}));
