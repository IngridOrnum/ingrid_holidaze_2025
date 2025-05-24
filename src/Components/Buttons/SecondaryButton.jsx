export function SecondaryButton({text, ...props}) {
    return (
        <button className={"font-text bg-custom-white w-[210px] h-[40px] rounded text-primary-orange cursor-pointer px-10 py-2 border transition-all duration-300 border-primary-orange hover:text-custom-white hover:bg-primary-orange lg:w-[280px] lg:h-[52px]"}
            {...props}>
            {text}
        </button>
    )
}