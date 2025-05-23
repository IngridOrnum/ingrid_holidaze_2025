import React from "react";

export default function DestinationCard({imageSrc, title, onClick}) {
    return (
        <div
            onClick={onClick}
            className={"group w-[165px] h-[120px] md:w-[200px] md:h-[160px] lg:w-[240px] lg:h-[200px] relative items-center rounded cursor-pointer overflow-hidden"}>
            <img
                src={imageSrc}
                alt={title}
                className="object-cover h-full w-full absolute z-0 rounded"
            />
            <div
                className={"absolute inset-0 z-10 w-full h-full bg-black/30 backdrop-blur-[2px] rounded transition-all duration-300 group-hover:backdrop-blur-none hover:bg-black/20"}>
                <div className={"absolute z-20 inset-0 w-full h-full items-center flex justify-center"}>
                    <p className={"font-text font-medium text-custom-white transition-all duration-300 group-hover:text-lg"}>
                        {title}
                    </p>
                </div>
            </div>
        </div>
    );
}


