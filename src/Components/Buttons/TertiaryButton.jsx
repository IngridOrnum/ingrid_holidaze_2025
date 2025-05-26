export function TertiaryButton({text, className = "", ...props}) {
    return (
        <button type={"button"} className={`font-text text-custom-medium-gray rounded bg-custom-white cursor-pointer w-[210px] h-[40px] px-10 py-2 border transition-all duration-300 border-custom-medium-gray hover:bg-gray-400 hover:text-custom-white lg:w-[280px] lg:h-[52px] ${className}`}
                {...props}>
            {text}
        </button>
    )
}