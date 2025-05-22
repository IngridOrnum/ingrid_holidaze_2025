import {PrimaryButton} from "../Buttons/PrimaryButton.jsx";
import {Link} from "react-router-dom";

export function ExploreNow() {

    return (
        <div className={"relative w-full h-[450px] flex justify-center mx-6"}>
            <img className={"absolute w-full h-full object-cover z-1"} src="/assets/landing-page/explore-more.jpg"
                 alt="Two girls smiling on the beach"/>
            <div className={"absolute p-4 bg-secondary-beige z-2 bottom-10 rounded flex flex-col items-center gap-6"}>
                <div className={"flex flex-col items-center gap-3"}>
                    <p className={"font-title text-xl"}>Find Your Holiday Paradise</p>
                    <p className={"font-text text-base"}>Handpicked stays for every style and budget.</p>
                </div>
                <Link to={"/search-results"}>
                    <PrimaryButton text={"Explore Now"}/>
                </Link>
            </div>
        </div>
    )
}