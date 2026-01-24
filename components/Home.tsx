"use client";

import React from 'react';
import HeroSection from './Home/HeroSection';
import MovieScroller from './MoviesList/MovieScroller';
import { useRapidAnimeRanking } from '@/hooks/useAnime';
import MovieCard from './MoviesList/MovieCard';
import { Skeleton } from './ui/skeleton';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const AnimeTrendScroller: React.FC = () => {
  const { data: animes, isLoading } = useRapidAnimeRanking('airing');

  return (
    <div className="py-8 max-w-[1400px] mx-auto px-4">
      <div className="flex justify-between items-center mb-4 px-2 border-l-4 border-primary pl-4">
        <h2 className="text-2xl font-bold text-foreground">Trending Anime</h2>
        <Link
          href="/anime"
          className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
          prefetch={false}
        >
          View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-6 pt-4 px-2 scrollbar-hide">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, idx) => (
            <div key={idx} className="flex-none">
              <Skeleton className="w-[150px] sm:w-[160px] md:w-[180px] lg:w-[200px] h-[225px] sm:h-[240px] md:h-[270px] lg:h-[300px] rounded-lg" />
            </div>
          ))
        ) : (
          animes?.map((anime: any) => (
            <div key={anime.myanimelist_id} className="flex-none">
              <MovieCard
                id={anime.myanimelist_id}
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

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <div className="space-y-4">
        <MovieScroller
          title="Trending Movies"
          fetchUrl="/trending/movie/week"
          isInfinite={false}
          viewAllPath="/movie"
        />
        <MovieScroller
          title="Trending Trailers"
          fetchUrl="/movie/upcoming"
          isInfinite={false}
          viewAllPath="/movie"
        />
        <MovieScroller
          title="Trending TV Shows"
          fetchUrl="/trending/tv/week"
          isInfinite={false}
          viewAllPath="/tvshows"
          mediaType="tv"
        />
        <AnimeTrendScroller />
      </div>
    </>
  );
};

export default Home;
