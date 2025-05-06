import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear stored user data
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");

        // Optionally delay to show a logout message, or just redirect
        navigate("/login"); // or "/"
    }, [navigate]);

    return null; // or return a loading message if you want
}
