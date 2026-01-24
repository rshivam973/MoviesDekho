import React from 'react';

const HeroSection: React.FC = () => {
    // Static high-quality background image (The Rip/Generic Movie Vibe)
    const backgroundUrl = "https://image.tmdb.org/t/p/original/3F2EXWF1thX0BdrVaKvnm6mAhqh.jpg";

    return (
        <div className="relative w-full h-[360px] md:h-[450px] lg:h-[500px] text-white">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${backgroundUrl})` }}
            >
                {/* Overlay with tint */}
                <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]"></div>
            </div>

            {/* Content */}
            <div className="relative max-w-[1400px] mx-auto px-4 h-full flex flex-col justify-center gap-6">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 text-foreground">Welcome.</h1>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground/90">
                        Millions of movies, TV shows and people to discover. Explore now.
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
