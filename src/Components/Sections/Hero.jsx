
export function Hero () {
    return (
        <div className="relative w-full h-[80vh] bg-gray-200">
            <video
                className="absolute inset-0 object-cover w-full h-full"
                autoPlay
                loop
                muted
                playsInline
                src="/assets/landing-page/beach-video.mp4"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center px-4">
                <h1 className="text-white text-3xl sm:text-5xl font-semibold drop-shadow-lg max-w-2xl">
                    Start planning your dream getaway with <span className="italic text-yellow-300">Holidaze</span>
                </h1>
            </div>
        </div>
    )
}