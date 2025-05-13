import {Footer} from "./Footer.jsx";
import {Header} from "./Header.jsx";
import {Outlet} from "react-router-dom";

export function Layout() {
    return (
        <>
            <div className={"min-h-screen flex flex-col bg-[#FFFCF7]"}>
                <Header/>
                <main className={"grow mx-[20px] lg:mx-[80px]"}>
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </>

    )
}