import {AllFilters} from "../Filters/AllFilters.jsx";


export function AsideFilter({...props}) {
    return (
        <div className="filter-aside hidden md:flex sticky top-0 h-screen">
            <div className="overflow-y-auto p-4 flex flex-col gap-5 items-center mt-10">
                <AllFilters {...props}/>
            </div>
            <div className={"h-full w-px bg-custom-light-gray"}></div>
        </div>
    )
}