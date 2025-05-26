import {Images, Info, Navigation} from "lucide-react";

export function FormStepIndicator({ title, name, step }) {
    return (
        <>
            <h2 className="font-title flex text-xl gap-1 my-2 md:text-3xl flex-wrap">
                <p className="font-light">{title} – </p>
                <span className="font-bold">{name || "New Venue"}</span>
            </h2>
            <div className="flex justify-center items-center font-text text-sm">
                <div
                    className={`flex flex-col items-center gap-3 ${step >= 1 ? 'text-primary-orange' : 'text-custom-black'}`}>
                    <div className={"flex items-center"}>
                        <div
                            className={`flex rounded-full border-2 border-primary-orange p-3 items-center ${step >= 1 ? 'bg-primary-orange' : 'bg-custom-white'}`}>
                            <Info className={`h-5 w-5 ${step >= 1 ? 'text-custom-white' : 'text-primary-orange'}`}/>
                        </div>
                        <div
                            className={`w-16 md:w-24 h-1 ${step >= 2 ? 'bg-primary-orange' : 'bg-primary-orange/50'}`}></div>
                    </div>
                    <p className={"w-full"}>Venue Details</p>
                </div>
                <div
                    className={`flex flex-col items-center gap-3 ${step >= 2 ? 'text-primary-orange' : 'text-custom-black'}`}>
                    <div className={"flex items-center"}>
                        <div
                            className={`flex rounded-full border-2 border-primary-orange p-3 items-center ${step >= 2 ? 'bg-primary-orange' : 'bg-custom-white'}`}>
                            <Images
                                className={`h-5 w-5 ${step >= 2 ? 'text-custom-white' : 'text-primary-orange'}`}/>
                        </div>
                        <div
                            className={`w-16 md:w-24 h-1 ${step >= 3 ? 'bg-primary-orange' : 'bg-primary-orange/50'}`}></div>
                    </div>
                    <p className={"ml-2 w-full"}>Media</p>
                </div>
                <div
                    className={`flex flex-col items-center gap-3 ${step >= 3 ? 'text-primary-orange' : 'text-custom-black'}`}>
                    <div
                        className={`flex mr-4 rounded-full border-2 border-primary-orange p-3 items-center ${step >= 3 ? 'bg-primary-orange' : 'bg-custom-white'}`}>
                        <Navigation
                            className={`h-5 w-5 ${step >= 3 ? 'text-custom-white' : 'text-primary-orange'}`}/>
                    </div>
                    <p className={"mr-1 w-full"}>Location</p>
                </div>
            </div>
        </>
    )
}
