"use client";

import React from 'react';
import Link from 'next/link';
import { ChevronRight, AlertCircle } from 'lucide-react';
import { useAnimeRanking } from '@/hooks/useAnime';
import MovieCard from '../MoviesList/MovieCard';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';

interface AnimeScrollerProps {
    title: string;
    rankingType: string;
    viewAllPath: string;
}

const AnimeScroller: React.FC<AnimeScrollerProps> = ({ title, rankingType, viewAllPath }) => {
    const { data: animes, isLoading, isError, error, refetch } = useAnimeRanking(rankingType, 20);

    return (
        <div className="py-4 max-w-[1400px] mx-auto px-4">
            <div className="flex justify-between items-center mb-6 px-2 border-l-4 border-primary pl-4">
                <h2 className="text-2xl font-bold text-foreground">{title}</h2>
                <Link
                    href={viewAllPath}
                    className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
                    prefetch={false}
                >
                    View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-6 pt-2 px-2 custom-scrollbar scroll-smooth">
                {isLoading ? (
                    Array.from({ length: 10 }).map((_, idx) => (
                        <div key={idx} className="flex-none">
                            <Skeleton className="w-[150px] sm:w-[160px] md:w-[180px] lg:w-[200px] h-[225px] sm:h-[240px] md:h-[270px] lg:h-[300px] rounded-lg" />
                        </div>
                    ))
                ) : isError ? (
                    <div className="w-full py-8 flex flex-col items-center justify-center text-destructive bg-destructive/5 rounded-xl border border-destructive/20 mx-2">
                        <AlertCircle size={32} className="mb-2 opacity-50" />
                        <h3 className="font-bold">Failed to load {title}</h3>
                        <p className="text-xs opacity-80">{(error as any)?.message || 'Proxy error'}</p>
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-3 border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => refetch()}
                        >
                            Retry
                        </Button>
                    </div>
                ) : (
                    animes?.map((anime: any) => (
                        <div key={anime.id} className="flex-none transition-transform hover:scale-105 duration-300">
                            <MovieCard
                                id={anime.id}
                                title={anime.title}
                                posterPath={anime.picture_url}
                                releaseDate={anime.aired_on || ""}
                                voteAverage={anime.score || 0}
                                mediaType="anime"
                                className="w-[150px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AnimeScroller;
