import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import tmdbApi from '../../api/tmdb';
import AppLayout from '../Layout/AppLayout';
import MovieCard from '../MoviesList/MovieCard';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';

const TvShows: React.FC = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: ['popular', 'tv'],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await tmdbApi.get('/tv/popular', {
                params: { page: pageParam }
            });
            return response.data;
        },
        getNextPageParam: (lastPage) => {
            if (lastPage.page < lastPage.total_pages) {
                return lastPage.page + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
    });

    const shows = data?.pages.flatMap((page) => page.results) ?? [];

    return (
        <AppLayout>
            <div className="max-w-[1400px] mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-foreground mb-8">Popular TV Shows</h2>

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
                        shows.map((show: any, index: number) => (
                            <MovieCard
                                key={`${show.id}-${index}`}
                                id={show.id}
                                title={show.name}
                                posterPath={show.poster_path}
                                releaseDate={show.first_air_date}
                                voteAverage={show.vote_average}
                                mediaType="tv"
                            />
                        ))
                    )}
                </div>

                {hasNextPage && (
                    <div className="mt-12 text-center pb-8">
                        <Button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className="bg-primary text-primary-foreground min-w-[200px] font-bold"
                        >
                            {isFetchingNextPage ? 'Loading...' : 'Load More'}
                        </Button>
                    </div>
                )}
            </div>
        </AppLayout>
    );
};

export default TvShows;
