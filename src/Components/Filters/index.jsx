import {PriceSlider} from "./Slider.jsx";

export function Filters ({ priceRange, setPriceRange }) {

    return (
        <div className="my-4">
            <label className="block mb-1 font-medium">Total Price</label>
            <PriceSlider values={priceRange} setValues={setPriceRange} />
            <div className="flex justify-between text-sm mt-2">
                <span>{priceRange[0]} NOK</span>
                <span>{priceRange[1]} NOK +</span>
            </div>
        </div>
    )
}