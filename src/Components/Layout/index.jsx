import {Footer} from "./Footer.jsx";
import {Header} from "./Header.jsx";
import {Outlet} from "react-router-dom";
import { Toaster } from 'react-hot-toast';

export function Layout() {
    return (
        <>
            <div className={"min-h-screen flex flex-col bg-bg-color"}>
                <Header/>
                <main className={"flex-grow"}>
                    <Outlet/>
                    <Toaster position="top-center" reverseOrder={false} />
                </main>
                <Footer/>
            </div>
        </>

    )
}