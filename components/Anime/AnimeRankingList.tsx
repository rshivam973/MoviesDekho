"use client";

import React, { useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useInfiniteQuery } from '@tanstack/react-query';
import malApi from '@/api/mal';
import MovieCard from '../MoviesList/MovieCard';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { AlertCircle } from 'lucide-react';
import BackButton from '../ui/back-button';

const AnimeRankingList: React.FC = () => {
    const { type } = useParams<{ type: string }>();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
        refetch
    } = useInfiniteQuery({
        queryKey: ['anime', 'ranking', 'infinite', type],
        queryFn: async ({ pageParam = 0 }) => {
            const response = await malApi.get('anime/ranking', {
                params: {
                    ranking_type: type || 'all',
                    limit: 20,
                    offset: pageParam,
                    fields: 'id,title,main_picture,mean,status,genres,num_episodes,start_date'
                }
            });
            return response.data;
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.data.length < 20) return undefined;
            return allPages.length * 20;
        },
        initialPageParam: 0,
    });

    const observerTarget = useRef(null);

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

    const animes = data?.pages.flatMap((page) => page.data).map((item: any) => ({
        id: item.node.id,
        title: item.node.title,
        picture_url: item.node.main_picture?.large || item.node.main_picture?.medium,
        score: item.node.mean,
        aired_on: item.node.start_date,
    })) ?? [];

    const pageTitle = type ? type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ') : 'All';

    return (
        <div className="max-w-[1400px] mx-auto px-4 py-8">
            <div className="flex flex-col items-start gap-4 mb-8">
                <BackButton />
                <h1 className="text-2xl md:text-3xl font-bold text-foreground border-l-4 border-primary pl-4">
                    Top Anime: {pageTitle}
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
                ) : isError ? (
                    <div className="col-span-full py-16 flex flex-col items-center justify-center text-destructive bg-destructive/5 rounded-2xl border border-destructive/20">
                        <AlertCircle size={48} className="mb-4 opacity-50" />
                        <h3 className="text-xl font-bold">Failed to load Anime</h3>
                        <p className="text-sm opacity-80 max-w-md text-center mt-2">
                            {(error as any)?.message || 'Something went wrong while fetching the anime list.'}
                        </p>
                        <Button
                            variant="default"
                            className="mt-6 rounded-full px-8"
                            onClick={() => refetch()}
                        >
                            Retry Loading
                        </Button>
                    </div>
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

            <div ref={observerTarget} className="h-32 w-full flex items-center justify-center mt-8">
                {isFetchingNextPage ? (
                    <div className="flex gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-.3s]" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-.5s]" />
                    </div>
                ) : !hasNextPage && animes.length > 0 ? (
                    <p className="text-muted-foreground text-sm font-medium">You've reached the end of the list</p>
                ) : null}
            </div>
        </div>
    );
};

export default AnimeRankingList;
