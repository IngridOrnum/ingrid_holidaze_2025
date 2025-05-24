import {PriceSlider} from "./Slider.jsx";

export function Price({priceRange, setPriceRange}) {

    return (
        <div className="font-text w-full">
            <label className="block mb-1 font-medium tracking-wider">Price</label>
            <div className="flex justify-between text-sm mb-6 gap-2">
                <div className={"border border-custom-light-gray flex flex-col p-2 gap-1 w-full rounded-sm"}>
                    <span className={"text text-custom-medium-gray font-medium"}>Min. Price</span>
                    <span className={"font-medium text-base"}>{priceRange[0]} NOK</span>
                </div>
                <div className={"border border-custom-light-gray flex flex-col p-2 gap-1 w-full rounded-sm"}>
                    <span className={"text text-custom-medium-gray font-medium"}>Max. Price</span>
                    <span className={"font-medium text-base"}>{priceRange[1]} NOK</span>
                </div>

            </div>
            <PriceSlider values={priceRange} setValues={setPriceRange}/>
        </div>
    )
}