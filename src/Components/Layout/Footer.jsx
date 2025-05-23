import {Link} from "react-router-dom";


export function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={"flex flex-col p-4 bg-secondary-beige px-[40px] pt-16 lg:px-20 lg:pt-[80px] items-center gap-10 lg:gap-20"}>
            <Link to={"/"}>
                <img src="/assets/logo.png" alt="Holidaze Logo"
                     className={"w-[120px] h-10 lg:w-[180px] lg:h-[62px] cursor-pointer"}/>
            </Link>
            <ul className={"flex flex-col gap-10 font-light font-text text-base lg:flex-row lg:gap-16 items-center"}>
                <li className="relative group">
                    <Link to={"/"}>
                        <span
                            className="text-inherit after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-[#420C1B] after:transition-all after:duration-300 group-hover:after:w-full">
                            Home
                        </span>
                    </Link>
                </li>
                <li className="relative group">
                    <Link to={"/search-results"}>
                         <span
                             className="text-inherit after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-[#420C1B] after:transition-all after:duration-300 group-hover:after:w-full">
                                            Search
                         </span>
                    </Link>
                </li>
                <li className="relative group">
                    <Link to={"/search-results"}>
                         <span className="text-inherit after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-[#420C1B] after:transition-all after:duration-300 group-hover:after:w-full">
                                            About
                         </span>
                    </Link>
                </li>
                <li className="relative group">

                         <span className="text-inherit after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-[#420C1B] after:transition-all after:duration-300 group-hover:after:w-full">
                                            Cookies
                         </span>
                </li>
            </ul>
            <div className={"w-full flex flex-col items-center gap-8 pb-4"}>
                <div className={"w-full h-px bg-primary-orange opacity-20"}></div>
                <span className={"font-text font-light text-custom-brown text-sm"}>
                    © {currentYear} Holidaze. All rights reserved.</span>
            </div>
        </footer>
    )
}