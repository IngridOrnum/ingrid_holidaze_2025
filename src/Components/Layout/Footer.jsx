import {Link} from "react-router-dom";

export function Footer() {
    return (
        <footer className={"bg-blue-200 p-4 items-center justify-center flex"}>
            <Link to={"/"}>
                <div>
                    Holidaze
                </div>
            </Link>
        </footer>

    )
}