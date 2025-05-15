import {useEffect} from "react";
import {AsideMenu} from "../../Components/Layout/AsideMenu.jsx";

export function MyVenues({profile}) {
    useEffect(() => {
        document.title = 'Holidaze - My Venues'
    }, []);
    return (
        <div className={"flex min-h-screen"}>
            <AsideMenu profile={profile}/>
            <h1>My Venues</h1>
        </div>
    )
}