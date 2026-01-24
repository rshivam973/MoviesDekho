"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getImageInitialUrl } from '@/utils/helpers';
import CircularRating from '../ui/circular-rating';
import { Button } from '../ui/button';
import { Play, X, Calendar, Clock, Globe, Building2, Languages, Star } from 'lucide-react';
import { useMovieDetails } from '@/hooks/useTmdb';
import { Skeleton } from '../ui/skeleton';
import MovieCard from '../MoviesList/MovieCard';
import BackButton from '../ui/back-button';

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: movie, isLoading } = useMovieDetails(id || '');
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

    if (!movie) return <div className="h-screen flex items-center justify-center text-foreground bg-background">Movie not found</div>;

    const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    const posterUrl = `${getImageInitialUrl()}${movie.poster_path}`;
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
    const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US') : 'N/A';
    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : '';

    const directors = movie.credits?.crew?.filter((c: any) => c.job === 'Director') || [];
    const screenplays = movie.credits?.crew?.filter((c: any) => c.job === 'Screenplay' || c.job === 'Writer') || [];
    const trailer = movie.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
    const cast = movie.credits?.cast?.slice(0, 10) || [];
    const similarMovies = movie.similar?.results?.slice(0, 10) || [];

    return (
        <>
            {/* Header Section */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat text-white min-h-[500px]"
                style={{ backgroundImage: `url(${backdropUrl})` }}
            >
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>

                <div className="relative max-w-[1400px] mx-auto px-8 py-4 md:py-8 flex flex-col items-start gap-6">
                    <BackButton className="text-white hover:text-primary" />
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Poster */}
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                            <img
                                src={posterUrl}
                                alt={movie.title}
                                className="w-[300px] h-[450px] rounded-lg shadow-2xl object-cover border border-border/50"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-6 text-foreground">
                            <div className="space-y-4">
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    <h1 className="text-4xl font-extrabold tracking-tight">
                                        {movie.title} <span className="font-light text-muted-foreground ml-1">({year})</span>
                                    </h1>
                                    <div className="flex items-center gap-2 bg-background/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 w-fit">
                                        <CircularRating rating={movie.vote_average} size={40} strokeWidth={3} />
                                        <span className="text-xs font-bold uppercase tracking-tighter leading-none">User<br />Score</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-2 font-medium">
                                    <span>{releaseDate}</span>
                                    <span className="before:content-['•'] before:mr-2 before:ml-2">
                                        {movie.genres?.map((g: any) => g.name).join(', ')}
                                    </span>
                                    {runtime && <span className="before:content-['•'] before:mr-2 before:ml-2">{runtime}</span>}
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
                            {movie.tagline && <div className="italic text-muted-foreground text-lg font-medium opacity-90">{movie.tagline}</div>}

                            {/* Overview */}
                            <div>
                                <h3 className="text-2xl font-bold mb-2">Overview</h3>
                                <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-4xl">{movie.overview}</p>
                            </div>

                            {/* Brief Info Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-4 border-y border-border/50">
                                <div>
                                    <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.25em] mb-1 flex items-center gap-1.5 opacity-70">
                                        <Calendar size={13} className="text-primary" /> Released
                                    </p>
                                    <p className="text-xl font-black">{year}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.25em] mb-1 flex items-center gap-1.5 opacity-70">
                                        <Clock size={13} className="text-primary" /> Runtime
                                    </p>
                                    <p className="text-xl font-black">{runtime || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.25em] mb-1 flex items-center gap-1.5 opacity-70">
                                        <Globe size={13} className="text-blue-500/70" /> Language
                                    </p>
                                    <p className="text-xl font-black uppercase">{movie.original_language}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.25em] mb-1 flex items-center gap-1.5 opacity-70">
                                        <Star size={13} className="text-green-500/70" /> Status
                                    </p>
                                    <p className="text-xl font-black">{movie.status}</p>
                                </div>
                            </div>

                            {/* Crew */}
                            <div className="flex flex-wrap gap-8">
                                {directors.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-1">Director</h4>
                                        <p className="font-semibold">{directors.map((d: any) => d.name).join(', ')}</p>
                                    </div>
                                )}
                                {screenplays.length > 0 && (
                                    <div>
                                        <h4 className="text-xs font-bold text-muted-foreground tracking-widest uppercase mb-1">Writer</h4>
                                        <p className="font-semibold">{screenplays.slice(0, 2).map((w: any) => w.name).join(', ')}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Details container */}
            <div className="max-w-[1400px] mx-auto px-8 py-10 space-y-12">
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

                {/* Similar Movies Section */}
                {similarMovies.length > 0 && (
                    <section>
                        <h3 className="text-2xl font-bold mb-6 text-foreground border-l-4 border-primary pl-4">Similar Movies</h3>
                        <div className="flex overflow-x-auto gap-4 pb-6 custom-scrollbar scroll-smooth">
                            {similarMovies.map((sim: any) => (
                                <div key={sim.id} className="flex-none">
                                    <MovieCard
                                        id={sim.id}
                                        title={sim.title}
                                        posterPath={sim.poster_path}
                                        releaseDate={sim.release_date}
                                        voteAverage={sim.vote_average}
                                        mediaType="movie"
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
                            {movie.spoken_languages?.map((lang: any) => (
                                <span key={lang.iso_639_1} className="px-4 py-1.5 bg-secondary/50 rounded-full text-sm font-medium border border-border">
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
                            {movie.production_companies?.map((company: any) => (
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

export default MovieDetails;
