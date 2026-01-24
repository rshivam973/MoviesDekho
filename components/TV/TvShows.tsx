"use client";

import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import tmdbApi from '@/services/tmdb';

import MovieCard from '../MoviesList/MovieCard';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import BackButton from '../ui/back-button';

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
            const response = await tmdbApi.get('tv/popular', {
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

    const observerTarget = useRef(null);
    const shows = data?.pages.flatMap((page) => page.results) ?? [];

    useEffect(() => {
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
        <>
            <div className="max-w-[1400px] mx-auto px-4 py-8">
                <div className="flex flex-col items-start gap-4 mb-8">
                    <BackButton />
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground border-l-4 border-primary pl-4">
                        Popular TV Shows
                    </h1>
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

                <div ref={observerTarget} className="h-32 w-full flex items-center justify-center mt-8">
                    {isFetchingNextPage ? (
                        <div className="flex gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-.3s]" />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-.5s]" />
                        </div>
                    ) : !hasNextPage && shows.length > 0 ? (
                        <p className="text-muted-foreground text-sm font-medium">You've reached the end of the list</p>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default TvShows;
