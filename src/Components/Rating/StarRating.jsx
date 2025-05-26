import { Star } from "lucide-react";

export function StarRatingInput({ value, onChange }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((num) => (
                <button
                    key={num}
                    type="button"
                    onClick={() => onChange(num)}
                    className="text-yellow-400 hover:scale-110 transition-transform"
                >
                    <Star
                        className={`w-6 h-6 ${
                            num <= value ? "fill-yellow-400 stroke-yellow-400" : "stroke-yellow-400"
                        }`}
                    />
                </button>
            ))}
        </div>
    );
}
