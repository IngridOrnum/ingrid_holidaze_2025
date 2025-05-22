export function PrimaryButton({text}) {
    return (
        <button className={"font-text bg-primary-orange rounded text-custom-white cursor-pointer px-10 py-2 border border-primary-orange hover:text-primary-orange hover:bg-custom-white lg:w-[280px] lg:h-[52px]"}>
            {text}
        </button>
    )
}