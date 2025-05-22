import React from "react";

export default function DestinationCard({ imageSrc, title, onClick }) {
    return (
        <div
            onClick={onClick} className={"w-[165px] h-[120px] relative items-center rounded cursor-pointer"}>
            <img
                src={imageSrc}
                alt={title}
                className="object-cover h-full w-full absolute z-1 rounded"
            />
            <div className={"absolute z-2 w-full h-full bg-black opacity-20 rounded"}></div>
            <div className={"z-10 absolute w-full h-full items-center flex justify-center"}>
                <p className={"font-title text-base text-custom-white"}>
                    {title}
                </p>
            </div>
        </div>
    );
}


