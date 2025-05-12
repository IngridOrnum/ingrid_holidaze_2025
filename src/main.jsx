import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {SingleVenue} from "./Routes/SingleVenue.jsx";
import {ConfirmBooking} from "./Routes/Customer/ConfirmBooking.jsx";
import {BookingComplete} from "./Routes/Customer/BookingComplete.jsx";
import {Profile} from "./Routes/Profile.jsx";
import {Layout} from "./Components/Layout/index.jsx";
import {SearchResults} from "./Routes/SearchResults.jsx";
import {OnRegister} from "./Routes/Auth/Register.jsx";
import {OnLogin} from "./Routes/Auth/Login.jsx";
import {Logout} from "./Api/Auth/Logout.jsx";
import {Bookings} from "./Routes/Customer/Bookings.jsx";

const router = createBrowserRouter([
    {
        path: "",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <App/>
            },
            {
                path: "/login",
                element: <OnLogin/>
            },
            {
                path: "/register",
                element: <OnRegister/>
            },
            {
              path: "/logout",
              element: <Logout/>
            },
            {
                path: "/single-venue/:id",
                element: <SingleVenue/>
            },
            {
                path: "/bookings",
                element: <Bookings/>
            },
            {
                path: "/confirm-booking",
                element: <ConfirmBooking/>
            },
            {
                path: "/booking-complete",
                element: <BookingComplete/>
            },
            {
                path: "/profile",
                element: <Profile/>
            },
            {
                path: "/search-results",
                element: <SearchResults/>
            },
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
