import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {SingleVenue} from "./Routes/SingleVenue.jsx";
import {ConfirmBooking} from "./Routes/Customer/ConfirmBooking.jsx";
import {BookingComplete} from "./Routes/Customer/BookingComplete.jsx";
import {CustomerProfile} from "./Routes/Customer/CustomerProfile.jsx";
import {VenueManagerProfile} from "./Routes/VenueManager/VenueManagerProfile.jsx";
import {Layout} from "./Components/Layout/index.jsx";
import {SearchResults} from "./Routes/SearchResults.jsx";

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
                path: "/single-venue/:id",
                element: <SingleVenue/>
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
                path: "/customer-profile",
                element: <CustomerProfile/>
            },
            {
                path: "/venue-manager-profile",
                element: <VenueManagerProfile/>
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
