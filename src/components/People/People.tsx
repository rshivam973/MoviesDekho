import React from 'react';
import AppLayout from '../Layout/AppLayout';
import { Button } from '../ui/button';
import { getImageInitialUrl } from '../../utils/helpers';
import { useInfiniteQuery } from '@tanstack/react-query';
import tmdbApi from '../../api/tmdb';
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
            const response = await tmdbApi.get('/person/popular', {
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

    const people = data?.pages.flatMap((page) => page.results) ?? [];

    return (
        <AppLayout>
            <div className="max-w-[1400px] mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Popular People</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {isLoading ? (
                        Array.from({ length: 15 }).map((_, idx) => (
                            <div key={idx} className="flex flex-col space-y-3">
                                <Skeleton className="h-[235px] w-full rounded-lg" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[60%]" />
                                    <Skeleton className="h-3 w-[80%]" />
                                </div>
                            </div>
                        ))
                    ) : (
                        people?.map((person: any) => (
                            <div key={person.id} className="bg-card rounded-lg shadow-sm border border-border overflow-hidden group hover:border-primary transition-colors">
                                <img
                                    src={person.profile_path ? `${getImageInitialUrl()}${person.profile_path}` : 'https://via.placeholder.com/235x235?text=No+Image'}
                                    alt={person.name}
                                    className="w-full h-[235px] object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="p-4">
                                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{person.name}</h3>
                                    <p className="text-sm text-muted-foreground truncate">
                                        {person.known_for.map((k: any) => k.title || k.name).join(', ')}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <div className="mt-8 text-center pb-8">
                    {hasNextPage && (
                        <Button
                            onClick={() => fetchNextPage()}
                            disabled={isFetchingNextPage}
                            className="w-full md:w-auto px-12 bg-primary text-primary-foreground font-bold text-lg rounded-full hover:bg-primary/90 min-w-[200px]"
                        >
                            {isFetchingNextPage ? 'Loading...' : 'Load More'}
                        </Button>
                    )}
                </div>
            </div>
        </AppLayout>
    );
};

export default People;
