import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useAuthStore} from "../../Store/authStore.jsx";

export function Logout() {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    useEffect(() => {
        logout();
        navigate("/");
    }, [logout, navigate]);

    return null;
}
