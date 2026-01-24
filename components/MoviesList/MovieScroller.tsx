"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import MovieCard from './MovieCard';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import tmdbApi from '@/api/tmdb';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ChevronRight, AlertCircle } from 'lucide-react';

interface Movie {
    id: number;
    title: string;
    name?: string;
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
}

interface MovieScrollerProps {
    title: string;
    fetchUrl: string;
    isInfinite?: boolean;
    viewAllPath?: string;
    mediaType?: 'movie' | 'tv' | 'anime';
}

const MovieScroller: React.FC<MovieScrollerProps> = ({
    title,
    fetchUrl,
    isInfinite = true,
    viewAllPath,
    mediaType: propMediaType
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Dynamic Query based on isInfinite prop
    const infiniteQuery = useInfiniteQuery({
        queryKey: ['scroller', fetchUrl, 'infinite'],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await tmdbApi.get(fetchUrl.startsWith('/') ? fetchUrl.slice(1) : fetchUrl, {
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
        enabled: isInfinite
    });

    const staticQuery = useQuery({
        queryKey: ['scroller', fetchUrl, 'static'],
        queryFn: async () => {
            const response = await tmdbApi.get(fetchUrl.startsWith('/') ? fetchUrl.slice(1) : fetchUrl, {
                params: { page: 1 }
            });
            return response.data;
        },
        enabled: !isInfinite
    });

    const isLoading = isInfinite ? infiniteQuery.isLoading : staticQuery.isLoading;
    const isError = isInfinite ? infiniteQuery.isError : staticQuery.isError;
    const error = isInfinite ? infiniteQuery.error : staticQuery.error;
    const isFetchingNextPage = isInfinite ? infiniteQuery.isFetchingNextPage : false;
    const hasNextPage = isInfinite ? infiniteQuery.hasNextPage : false;
    const fetchNextPage = isInfinite ? infiniteQuery.fetchNextPage : () => { };

    const movies = isInfinite
        ? (infiniteQuery.data?.pages.flatMap((page) => page.results) as Movie[] ?? [])
        : (staticQuery.data?.results as Movie[] ?? []);

    // Auto-scroll logic
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container || isHovered || isLoading || isFetchingNextPage) return;

        const autoScroll = setInterval(() => {
            if (container) {
                container.scrollLeft += 1;

                // Infinite fetch logic integrated with auto-scroll
                const { scrollLeft, scrollWidth, clientWidth } = container;
                if (isInfinite && scrollLeft + clientWidth >= scrollWidth - 200 && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }
        }, 30);

        return () => clearInterval(autoScroll);
    }, [isHovered, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, isInfinite]);

    // Handle horizontal scroll to trigger next page (manual scroll)
    const handleScroll = useCallback(() => {
        if (!scrollContainerRef.current || !isInfinite || !hasNextPage || isFetchingNextPage) return;

        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 100) {
            fetchNextPage();
        }
    }, [isInfinite, hasNextPage, isFetchingNextPage, fetchNextPage]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    return (
        <div className="py-8 max-w-[1400px] mx-auto px-4">
            <div className="flex justify-between items-center mb-4 px-2 border-l-4 border-primary pl-4">
                <h2 className="text-2xl font-bold text-foreground animate-in fade-in slide-in-from-left duration-700">
                    {title}
                </h2>
                {viewAllPath && (
                    <Link
                        href={viewAllPath}
                        className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
                    >
                        View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                )}
            </div>
            <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    ref={scrollContainerRef}
                    className="flex gap-4 overflow-x-auto pb-6 pt-4 px-2 snap-x scrollbar-hide scroll-smooth"
                >
                    {isLoading ? (
                        Array.from({ length: 10 }).map((_, idx) => (
                            <div key={idx} className="flex-none snap-start">
                                <Skeleton className="w-[150px] sm:w-[160px] md:w-[180px] lg:w-[200px] h-[225px] sm:h-[240px] md:h-[270px] lg:h-[300px] rounded-lg" />
                            </div>
                        ))
                    ) : isError ? (
                        <div className="w-full py-12 flex flex-col items-center justify-center text-destructive bg-destructive/5 rounded-xl border border-destructive/20 mx-2">
                            <AlertCircle size={40} className="mb-4 opacity-50" />
                            <h3 className="text-lg font-bold">Failed to load {title}</h3>
                            <p className="text-sm opacity-80">{(error as any)?.message || 'Please check your connection or try again later'}</p>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-4 border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                onClick={() => isInfinite ? infiniteQuery.refetch() : staticQuery.refetch()}
                            >
                                Try Again
                            </Button>
                        </div>
                    ) : (
                        <>
                            {movies.map((movie, index) => (
                                <div
                                    key={`${movie.id}-${index}`}
                                    className="flex-none snap-start animate-in fade-in zoom-in-95 duration-500 fill-mode-both"
                                    style={{ animationDelay: `${(index % 20) * 50}ms` }}
                                >
                                    <MovieCard
                                        id={movie.id}
                                        title={movie.title || movie.name || 'Untitled'}
                                        posterPath={movie.poster_path}
                                        releaseDate={movie.release_date || movie.first_air_date || ''}
                                        voteAverage={movie.vote_average}
                                        mediaType={propMediaType || (title.toLowerCase().includes('tv') ? 'tv' : 'movie')}
                                    />
                                </div>
                            ))}
                            {isFetchingNextPage && (
                                Array.from({ length: 4 }).map((_, idx) => (
                                    <div key={`skeleton-next-${idx}`} className="flex-none snap-start">
                                        <Skeleton className="w-[150px] sm:w-[160px] md:w-[180px] lg:w-[200px] h-[225px] sm:h-[240px] md:h-[270px] lg:h-[300px] rounded-lg" />
                                    </div>
                                ))
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MovieScroller;
