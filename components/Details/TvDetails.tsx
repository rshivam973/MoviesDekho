"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getImageInitialUrl } from '@/utils/helpers';
import CircularRating from '../ui/circular-rating';
import { Button } from '../ui/button';
import { Play, X, Tv, Calendar, Globe, Building2, Languages } from 'lucide-react';
import { useTvDetails } from '@/hooks/useTmdb';
import { Skeleton } from '../ui/skeleton';
import MovieCard from '../MoviesList/MovieCard';
import BackButton from '../ui/back-button';

const TvDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: tv, isLoading } = useTvDetails(id || '');
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (isLoading) {
        return (
            <div className="w-full h-[500px] bg-background/5 animate-pulse flex items-center justify-center">
                <div className="max-w-[1400px] w-full px-8 flex gap-8">
                    <Skeleton className="w-[300px] h-[450px] rounded-lg bg-muted" />
                    <div className="flex-1 space-y-4 pt-12">
                        <Skeleton className="h-10 w-2/3 bg-muted" />
                        <Skeleton className="h-4 w-1/3 bg-muted" />
                        <div className="flex gap-4 mt-8">
                            <Skeleton className="w-16 h-16 rounded-full bg-muted" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-20 bg-muted" />
                                <Skeleton className="h-4 w-20 bg-muted" />
                            </div>
                        </div>
                        <Skeleton className="h-32 w-full bg-muted" />
                    </div>
                </div>
            </div>
        );
    }

    if (!tv) return <div className="h-screen flex items-center justify-center text-foreground bg-background">TV Show not found</div>;

    const backdropUrl = `https://image.tmdb.org/t/p/original${tv.backdrop_path}`;
    const posterUrl = `${getImageInitialUrl()}${tv.poster_path}`;
    const year = tv.first_air_date ? new Date(tv.first_air_date).getFullYear() : '';
    const airDate = tv.first_air_date ? new Date(tv.first_air_date).toLocaleDateString('en-US') : 'N/A';
    const status = tv.status || 'N/A';

    const creators = tv.created_by || [];
    const trailer = tv.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
    const cast = tv.credits?.cast?.slice(0, 10) || [];
    const similarTv = tv.similar?.results?.slice(0, 10) || [];

    return (
        <>
            {/* Header Section */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat text-white min-h-[500px]"
                style={{ backgroundImage: `url(${backdropUrl})` }}
            >
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>

                <div className="relative max-w-[1400px] mx-auto px-8 py-4 md:py-8 flex flex-col items-start gap-6">
                    <BackButton />
                    <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                        {/* Poster */}
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                            <img
                                src={posterUrl}
                                alt={tv.name}
                                className="w-[300px] h-[450px] rounded-lg shadow-2xl object-cover border border-border/50"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-6 text-foreground">
                            <div className="space-y-4">
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    <h1 className="text-4xl font-extrabold tracking-tight">
                                        {tv.name} <span className="font-light text-muted-foreground ml-1">({year})</span>
                                    </h1>
                                    <div className="flex items-center gap-2 bg-background/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 w-fit">
                                        <CircularRating rating={tv.vote_average} size={40} strokeWidth={3} />
                                        <span className="text-xs font-bold uppercase tracking-tighter leading-none">User<br />Score</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-2 font-medium">
                                    <span>{airDate}</span>
                                    <span className="before:content-['•'] before:mr-2 before:ml-2">
                                        {tv.genres?.map((g: any) => g.name).join(', ')}
                                    </span>
                                    <span className="before:content-['•'] before:mr-2 before:ml-2">
                                        {tv.number_of_seasons} Seasons, {tv.number_of_episodes} Episodes
                                    </span>
                                </div>
                            </div>

                            {/* Actions Row */}
                            <div className="flex items-center gap-4">
                                {trailer && (
                                    <Button
                                        variant="outline"
                                        className="bg-primary/20 border-primary/30 text-foreground hover:bg-primary/30 gap-2 font-bold transition-all shadow-lg hover:shadow-primary/20 px-6 rounded-full"
                                        onClick={() => setShowTrailer(true)}
                                    >
                                        <Play fill="currentColor" size={18} /> Play Trailer
                                    </Button>
                                )}
                            </div>

                            {/* Tagline */}
                            {tv.tagline && <div className="italic text-muted-foreground text-lg font-medium opacity-90">{tv.tagline}</div>}

                            {/* Overview */}
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Overview</h3>
                                <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-4xl">{tv.overview}</p>
                            </div>

                            {/* Brief Info Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-4 border-y border-border/50">
                                <div>
                                    <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.25em] mb-1 flex items-center gap-1.5 opacity-70">
                                        <Tv size={13} className="text-primary" /> Seasons
                                    </p>
                                    <p className="text-xl font-black">{tv.number_of_seasons}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.25em] mb-1 flex items-center gap-1.5 opacity-70">
                                        <Tv size={13} className="text-primary" /> Episodes
                                    </p>
                                    <p className="text-xl font-black">{tv.number_of_episodes}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.25em] mb-1 flex items-center gap-1.5 opacity-70">
                                        <Globe size={13} className="text-blue-500" /> Language
                                    </p>
                                    <p className="text-xl font-black uppercase">{tv.original_language}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.25em] mb-1 flex items-center gap-1.5 opacity-70">
                                        <Calendar size={13} className="text-green-500" /> Type
                                    </p>
                                    <p className="text-xl font-black">{tv.type}</p>
                                </div>
                            </div>

                            {/* Creators */}
                            <div className="flex flex-wrap gap-8">
                                {creators.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-1">Creators</h4>
                                        <p className="font-semibold">{creators.map((c: any) => c.name).join(', ')}</p>
                                    </div>
                                )}
                                <div>
                                    <h4 className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-1">Status</h4>
                                    <p className="font-semibold">{status}</p>
                                </div>
                                {tv.networks && tv.networks.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-1">Network</h4>
                                        <div className="flex flex-wrap gap-3 mt-2">
                                            {tv.networks.map((net: any) => (
                                                <div key={net.id} className="flex items-center bg-white/10 px-5 py-2.5 rounded-xl border border-white/10 shadow-lg backdrop-blur-md hover:bg-white/20 transition-all">
                                                    {net.logo_path ? (
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/h30${net.logo_path}`}
                                                            alt={net.name}
                                                            className="h-5 object-contain brightness-0 invert"
                                                        />
                                                    ) : <span className="text-xs font-bold">{net.name}</span>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Details container */}
            <div className="max-w-[1400px] mx-auto px-8 py-10 space-y-12">
                {/* Episodes & Airing Info */}
                {(tv.last_episode_to_air || tv.next_episode_to_air) && (
                    <section className="grid md:grid-cols-2 gap-8">
                        {tv.last_episode_to_air && (
                            <div className="bg-card/50 border border-border rounded-2xl p-6 relative overflow-hidden group hover:border-primary/50 transition-colors">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Calendar size={64} />
                                </div>
                                <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Last Episode Aired</h4>
                                <div className="flex gap-4">
                                    {tv.last_episode_to_air.still_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${tv.last_episode_to_air.still_path}`}
                                            alt={tv.last_episode_to_air.name}
                                            className="w-32 h-20 object-cover rounded-lg border border-border/50"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <p className="font-bold text-lg leading-tight">{tv.last_episode_to_air.name}</p>
                                        <p className="text-sm text-muted-foreground mt-1">S{tv.last_episode_to_air.season_number} E{tv.last_episode_to_air.episode_number} • {new Date(tv.last_episode_to_air.air_date).toLocaleDateString()}</p>
                                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{tv.last_episode_to_air.overview}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        {tv.next_episode_to_air && (
                            <div className="bg-card/50 border border-border rounded-2xl p-6 relative overflow-hidden group hover:border-primary/50 transition-colors">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Play size={64} />
                                </div>
                                <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">Next Episode To Air</h4>
                                <div className="flex gap-4">
                                    {tv.next_episode_to_air.still_path && (
                                        <img
                                            src={`https://image.tmdb.org/t/p/w200${tv.next_episode_to_air.still_path}`}
                                            alt={tv.next_episode_to_air.name}
                                            className="w-32 h-20 object-cover rounded-lg border border-border/50"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <p className="font-bold text-lg leading-tight">{tv.next_episode_to_air.name}</p>
                                        <p className="text-sm text-muted-foreground mt-1">S{tv.next_episode_to_air.season_number} E{tv.next_episode_to_air.episode_number} • {new Date(tv.next_episode_to_air.air_date).toLocaleDateString()}</p>
                                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{tv.next_episode_to_air.overview}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* Seasons Gallery */}
                {tv.seasons && tv.seasons.length > 0 && (
                    <section>
                        <h3 className="text-2xl font-bold mb-6 text-foreground border-l-4 border-primary pl-4">Seasons</h3>
                        <div className="flex overflow-x-auto gap-4 pb-6 custom-scrollbar scroll-smooth">
                            {tv.seasons.map((season: any) => (
                                <div key={season.id} className="flex-none w-[110px] group cursor-pointer">
                                    <div className="relative aspect-[2/3] rounded-lg overflow-hidden border border-border/50 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                                        <img
                                            src={season.poster_path ? `https://image.tmdb.org/t/p/w300${season.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Poster'}
                                            alt={season.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                                            <p className="text-xs font-bold text-white line-clamp-3">{season.overview || 'No overview available.'}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <p className="font-bold text-sm text-foreground leading-tight group-hover:text-primary transition-colors">{season.name}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{season.episode_count} Episodes • {season.air_date ? new Date(season.air_date).getFullYear() : 'N/A'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Cast Section */}
                {cast.length > 0 && (
                    <section>
                        <h3 className="text-2xl font-bold mb-6 text-foreground">Top Billed Cast</h3>
                        <div className="flex overflow-x-auto gap-5 pb-6 custom-scrollbar scroll-smooth">
                            {cast.map((actor: any) => (
                                <div key={actor.id} className="flex-none w-[140px] bg-card rounded-xl shadow-lg border border-border overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
                                    <img
                                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w300${actor.profile_path}` : 'https://via.placeholder.com/300x450?text=No+Image'}
                                        alt={actor.name}
                                        className="w-full h-[180px] object-cover"
                                    />
                                    <div className="p-3">
                                        <p className="font-bold text-sm text-foreground leading-tight">{actor.name}</p>
                                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{actor.character}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Similar TV Shows Section */}
                {similarTv.length > 0 && (
                    <section>
                        <h3 className="text-2xl font-bold mb-6 text-foreground border-l-4 border-primary pl-4">Similar TV Shows</h3>
                        <div className="flex overflow-x-auto gap-4 pb-6 custom-scrollbar scroll-smooth">
                            {similarTv.map((sim: any) => (
                                <div key={sim.id} className="flex-none">
                                    <MovieCard
                                        id={sim.id}
                                        title={sim.name}
                                        posterPath={sim.poster_path}
                                        releaseDate={sim.first_air_date}
                                        voteAverage={sim.vote_average}
                                        mediaType="tv"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Production Info */}
                <section className="grid md:grid-cols-2 gap-8 pt-8 border-t border-border/50">
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Languages size={20} className="text-primary" /> Spoken Languages
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {tv.spoken_languages?.map((lang: any) => (
                                <span key={lang.iso_639_1} className="px-3 py-1 bg-secondary/50 rounded-full text-sm font-medium border border-border">
                                    {lang.english_name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Building2 size={20} className="text-primary" /> Production Companies
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {tv.production_companies?.map((company: any) => (
                                <div key={company.id} className="flex items-center gap-3 bg-secondary/40 px-6 py-3 rounded-2xl border border-white/5 hover:bg-secondary/60 transition-all shadow-xl">
                                    {company.logo_path ? (
                                        <div className="bg-white/95 p-1.5 rounded-md shadow-sm">
                                            <img
                                                src={`https://image.tmdb.org/t/p/h30${company.logo_path}`}
                                                alt={company.name}
                                                className="h-6 object-contain grayscale brightness-0"
                                            />
                                        </div>
                                    ) : <Building2 size={20} className="text-muted-foreground opacity-70" />}
                                    <span className="text-xs font-extrabold tracking-tight">{company.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {/* Trailer Popup Modal */}
            {showTrailer && trailer && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-300"
                    onClick={() => setShowTrailer(false)}
                >
                    <div className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl rounded-lg overflow-hidden border border-border/20">
                        <button
                            className="absolute top-4 right-4 z-[60] bg-black/50 text-white rounded-full p-2 hover:bg-black transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowTrailer(false);
                            }}
                        >
                            <X size={24} />
                        </button>
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                            title="Trailer"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
};

export default TvDetails;
