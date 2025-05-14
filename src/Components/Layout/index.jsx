import {Footer} from "./Footer.jsx";
import {Header} from "./Header.jsx";
import {Outlet} from "react-router-dom";

export function Layout() {
    return (
        <>
            <div className={"min-h-screen flex flex-col bg-bg-color"}>
                <Header/>
                <main>
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </>

    )
}