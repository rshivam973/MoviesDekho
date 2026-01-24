import AnimeScroller from "@/components/Anime/AnimeScroller";

export default function Page() {
    return (
        <div className="pt-8 space-y-4">
            <div className="max-w-[1400px] mx-auto px-6 mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-foreground">Explore Anime</h1>
                <p className="text-muted-foreground mt-2 text-lg">Discover the top rated, trending, and upcoming anime series and movies.</p>
            </div>

            <AnimeScroller
                title="Top Anime"
                rankingType="all"
                viewAllPath="/anime/ranking/all"
            />
            <AnimeScroller
                title="Top Airing"
                rankingType="airing"
                viewAllPath="/anime/ranking/airing"
            />
            <AnimeScroller
                title="Top Upcoming"
                rankingType="upcoming"
                viewAllPath="/anime/ranking/upcoming"
            />
            <AnimeScroller
                title="Popular Movies"
                rankingType="movie"
                viewAllPath="/anime/ranking/movie"
            />
            <AnimeScroller
                title="Most Popular"
                rankingType="bypopularity"
                viewAllPath="/anime/ranking/bypopularity"
            />
        </div>
    );
}
