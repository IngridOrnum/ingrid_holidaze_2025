import { Range } from "react-range";

const MIN = 0;
const MAX = 10000;

export function PriceSlider({ values, setValues }) {
    if (!Array.isArray(values) || values.length < 2) {
        return null; // eller vis en spinner/error
    }
    return (
        <div className="w-full px-4">
            <Range
                step={100}
                min={MIN}
                max={MAX}
                values={values}
                onChange={setValues}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        className="h-1 w-full rounded bg-gray-300"
                    >
                        <div
                            className="h-1 bg-red-500"
                            style={{
                                width: `${(values[1] - values[0]) / (MAX - MIN) * 100}%`,
                                marginLeft: `${(values[0] - MIN) / (MAX - MIN) * 100}%`,
                            }}
                        />
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => {
                    const {key, ...rest} = props;
                    return (

                    <div
                        key={key}
                        {...rest}
                        className="h-5 w-5 rounded-full bg-red-500 shadow-md cursor-pointer"
                    />
                )}}
            />
        </div>
    );
}
