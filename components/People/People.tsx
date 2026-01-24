"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

import { Button } from '../ui/button';
import { getImageInitialUrl } from '@/utils/helpers';
import { useInfiniteQuery } from '@tanstack/react-query';
import tmdbApi from '@/services/tmdb';
import { Skeleton } from '../ui/skeleton';

const People: React.FC = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: ['popularPeople'],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await tmdbApi.get('person/popular', {
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

    const people = data?.pages.flatMap((page) => page.results) ?? [];

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
                <h2 className="text-2xl font-bold mb-8 text-foreground border-l-4 border-primary pl-4">Popular People</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-6 justify-items-center">
                    {isLoading ? (
                        Array.from({ length: 18 }).map((_, idx) => (
                            <div key={idx} className="flex flex-col space-y-3">
                                <Skeleton className="aspect-[3/4] w-full rounded-xl" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[60%]" />
                                    <Skeleton className="h-3 w-[80%]" />
                                </div>
                            </div>
                        ))
                    ) : (
                        people?.map((person: any, index: number) => (
                            <Link
                                href={`/people/${person.id}`}
                                key={`${person.id}-${index}`}
                                className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 flex flex-col w-full max-w-[150px] sm:max-w-[160px] md:max-w-[180px] lg:max-w-[190px]"
                            >
                                <div className="aspect-[3/4] w-full relative overflow-hidden bg-muted">
                                    <img
                                        src={person.profile_path ? `${getImageInitialUrl()}${person.profile_path}` : 'https://via.placeholder.com/500x750?text=No+Image'}
                                        alt={person.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>
                                <div className="p-3 flex-1 flex flex-col justify-end bg-card">
                                    <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">{person.name}</h3>
                                    <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1 opacity-80">
                                        {person.known_for?.map((k: any) => k.title || k.name).join(', ') || 'N/A'}
                                    </p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>

                {/* Intersection Observer Target */}
                <div ref={observerTarget} className="h-32 w-full flex items-center justify-center mt-8">
                    {isFetchingNextPage ? (
                        <div className="flex gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-.3s]" />
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-.5s]" />
                        </div>
                    ) : !hasNextPage && people.length > 0 ? (
                        <p className="text-muted-foreground text-sm font-medium">You've reached the end of the list</p>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default People;
