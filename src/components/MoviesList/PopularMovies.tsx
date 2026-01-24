import React, { useState } from 'react';
import MovieCard from './MovieCard';
import AppLayout from '../Layout/AppLayout';
import { Button } from '../ui/button';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useInfiniteQuery } from '@tanstack/react-query';
import tmdbApi from '../../api/tmdb';
import { Skeleton } from '../ui/skeleton';

const PopularMovies: React.FC = () => {
    const [sortOpen, setSortOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);

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

    const movies = data?.pages.flatMap((page) => page.results) ?? [];

    return (
        <AppLayout>
            <div className="max-w-[1400px] mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Popular Movies</h2>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar / Filters */}
                    <div className="w-full md:w-[260px] flex-shrink-0 space-y-4">
                        {/* Sort Card */}
                        <div className="border border-border rounded-lg shadow-sm overflow-hidden bg-card">
                            <div
                                className="flex justify-between items-center p-4 cursor-pointer hover:bg-accent"
                                onClick={() => setSortOpen(!sortOpen)}
                            >
                                <h3 className="font-bold text-foreground">Sort</h3>
                                {sortOpen ? <ChevronDown size={20} className="text-foreground" /> : <ChevronRight size={20} className="text-foreground" />}
                            </div>
                            {sortOpen && (
                                <div className="p-4 border-t border-border">
                                    <p className="text-sm text-muted-foreground">Sort Results By</p>
                                    <select className="w-full mt-2 p-2 border border-input rounded bg-secondary text-foreground">
                                        <option>Popularity Descending</option>
                                        <option>Rating Descending</option>
                                        <option>Release Date Descending</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Filters Card */}
                        <div className="border border-border rounded-lg shadow-sm overflow-hidden bg-card">
                            <div
                                className="flex justify-between items-center p-4 cursor-pointer hover:bg-accent"
                                onClick={() => setFilterOpen(!filterOpen)}
                            >
                                <h3 className="font-bold text-foreground">Filters</h3>
                                {filterOpen ? <ChevronDown size={20} className="text-foreground" /> : <ChevronRight size={20} className="text-foreground" />}
                            </div>
                            {filterOpen && (
                                <div className="p-4 border-t border-border space-y-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-2">Show Me</p>
                                        <div className="space-y-2">
                                            <label className="flex items-center space-x-2">
                                                <input type="radio" name="showme" defaultChecked className="text-primary" />
                                                <span className="text-sm text-foreground">Everything</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="radio" name="showme" className="text-primary" />
                                                <span className="text-sm text-foreground">Movies I Haven't Seen</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input type="radio" name="showme" className="text-primary" />
                                                <span className="text-sm text-foreground">Movies I Have Seen</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="pt-2 border-t border-border">
                                        <p className="text-sm text-muted-foreground">Availabilities</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <Button className="w-full rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80">Search</Button>
                    </div>

                    {/* Grid */}
                    <div className="flex-1">
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
                                        key={movie.id}
                                        id={movie.id}
                                        title={movie.title}
                                        posterPath={movie.poster_path}
                                        releaseDate={movie.release_date}
                                        voteAverage={movie.vote_average}
                                    />
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
                </div>
            </div>
        </AppLayout>
    );
};

export default PopularMovies;
