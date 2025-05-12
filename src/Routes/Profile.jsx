import {useEffect} from "react";

export function Profile() {
    useEffect(() => {
        document.title = 'Holidaze - My Profile'
    }, []);
    return (
        <>
            <h1>My Profile</h1>

        </>
    )
}