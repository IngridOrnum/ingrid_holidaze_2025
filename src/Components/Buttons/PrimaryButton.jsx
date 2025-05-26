export function PrimaryButton({ text, onClick, type = "button", disabled = false, className = "" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`font-text bg-primary-orange rounded w-[210px] h-[40px] text-custom-white cursor-pointer px-10 py-2 border transition-all duration-300 border-primary-orange hover:text-primary-orange hover:bg-custom-white lg:w-[280px] lg:h-[52px] ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {text}
        </button>
    );
}
