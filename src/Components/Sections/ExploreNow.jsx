import {PrimaryButton} from "../Buttons/PrimaryButton.jsx";
import {Link} from "react-router-dom";

export function ExploreNow() {

    return (
        <div className={"relative w-full max-w-[1000px] mx-auto h-[450px] md:rounded overflow-hidden"}>
            <img
                className={"w-full h-full object-cover"}
                src="/assets/landing-page/explore-more.jpg"
                alt="Two girls smiling on the beach"
            />
            <div className={"absolute bottom-4 right-4 md:bottom-10 md:right-10 py-3 px-4 bg-secondary-beige/90 z-10 flex flex-col items-center gap-4 rounded-md md:gap-8 md:py-10 md:px-10"}>
                <div className={"flex flex-col items-end gap-2 md:gap-4"}>
                    <p className={"font-text text-base font-bold tracking-wider uppercase md:text-xl text-right"}>Find Your Holiday Paradise</p>
                    <p className={"font-text font-light text-sm text-right md:text-base"}>Handpicked stays for every style and budget.</p>
                </div>
                <Link to={"/search-results"}>
                    <PrimaryButton text={"Explore Now"} />
                </Link>
            </div>
        </div>
    )
}