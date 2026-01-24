import React, { useState } from 'react';
import AppLayout from '../Layout/AppLayout';
import MovieCard from '../MoviesList/MovieCard';
import { useInfiniteAnimeRanking } from '../../hooks/useAnime';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';

const RANKING_TYPES = [
    { value: 'all', label: 'Top Anime' },
    { value: 'airing', label: 'Top Airing' },
    { value: 'upcoming', label: 'Top Upcoming' },
    { value: 'tv', label: 'TV Series' },
    { value: 'ova', label: 'OVA' },
    { value: 'movie', label: 'Movies' },
    { value: 'special', label: 'Specials' },
    { value: 'bypopularity', label: 'By Popularity' },
    { value: 'favorite', label: 'Favorites' },
];

const Anime: React.FC = () => {
    const [rankingType, setRankingType] = useState('all');

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useInfiniteAnimeRanking(rankingType);

    const animes = data?.pages.flatMap((page) => page.data).map((item: any) => ({
        id: item.node.id,
        title: item.node.title,
        picture_url: item.node.main_picture?.large || item.node.main_picture?.medium,
        score: item.node.mean,
        aired_on: item.node.start_date,
    })) ?? [];

    return (
        <AppLayout>
            <div className="max-w-[1400px] mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h2 className="text-3xl font-bold text-foreground">Anime Rankings</h2>
                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
                        {RANKING_TYPES.map((type) => (
                            <Button
                                key={type.value}
                                variant={rankingType === type.value ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setRankingType(type.value)}
                                className="whitespace-nowrap px-4 py-1 rounded-full text-xs font-semibold"
                            >
                                {type.label}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {isLoading ? (
                        Array.from({ length: 15 }).map((_, idx) => (
                            <div key={idx} className="flex flex-col space-y-3">
                                <Skeleton className="h-[270px] w-full rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[80%]" />
                                    <Skeleton className="h-4 w-[40%]" />
                                </div>
                            </div>
                        ))
                    ) : (
                        animes.map((anime: any, index: number) => (
                            <MovieCard
                                key={`${anime.id}-${index}`}
                                id={anime.id}
                                title={anime.title}
                                posterPath={anime.picture_url}
                                releaseDate={anime.aired_on}
                                voteAverage={anime.score || 0}
                                mediaType="anime"
                            />
                        ))
                    )}
                </div>

                {hasNextPage && (
                    <div className="mt-12 text-center pb-8 font-bold">
                        <Button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className="bg-primary text-primary-foreground min-w-[200px]"
                        >
                            {isFetchingNextPage ? 'Loading...' : 'Load More'}
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default Anime;
