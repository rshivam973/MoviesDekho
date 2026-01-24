"use client";

import React, { useState } from 'react';
import MovieCard from './MovieCard';

import { Button } from '../ui/button';
import { useInfiniteQuery } from '@tanstack/react-query';
import tmdbApi from '@/services/tmdb';
import { Skeleton } from '../ui/skeleton';

const PopularMovies: React.FC = () => {
    // const [sortOpen, setSortOpen] = useState(false); // Removed sidebar functionality
    // const [filterOpen, setFilterOpen] = useState(false); // Removed sidebar functionality

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: ['popular', 'movie'],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await tmdbApi.get('/movie/popular', {
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

    const observerTarget = React.useRef(null);
    const movies = data?.pages.flatMap((page) => page.results) ?? [];

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className="max-w-[1400px] mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground border-l-4 border-primary pl-4">Popular Movies</h2>

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
                    movies?.map((movie: any) => (
                        <MovieCard
                            key={`${movie.id}-${Math.random()}`} // Ensure unique keys for infinite scroll
                            id={movie.id}
                            title={movie.title}
                            posterPath={movie.poster_path}
                            releaseDate={movie.release_date}
                            voteAverage={movie.vote_average}
                            className="w-full"
                        />
                    ))
                )}
            </div>

            <div ref={observerTarget} className="h-32 w-full flex items-center justify-center mt-8">
                {isFetchingNextPage ? (
                    <div className="flex gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-.3s]" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-.5s]" />
                    </div>
                ) : !hasNextPage && movies.length > 0 ? (
                    <p className="text-muted-foreground text-sm font-medium">You've reached the end of the list</p>
                ) : null}
            </div>
        </div>
    );
};

export default PopularMovies;
