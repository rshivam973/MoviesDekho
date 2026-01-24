import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getImageInitialUrl } from '../../utils/helpers';
import AppLayout from '../Layout/AppLayout';
import CircularRating from '../ui/circular-rating';
import { Button } from '../ui/button';
import { Play, List, Heart, Bookmark, X } from 'lucide-react';
import { useMovieDetails } from '../../hooks/useTmdb';
import { Skeleton } from '../ui/skeleton';
import MovieCard from '../MoviesList/MovieCard';

const MovieDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: movie, isLoading } = useMovieDetails(id || '');
    const [showTrailer, setShowTrailer] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (isLoading) {
        return (
            <AppLayout>
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
            </AppLayout>
        );
    }

    if (!movie) return <div className="h-screen flex items-center justify-center text-foreground bg-background">Movie not found</div>;

    const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    const posterUrl = `${getImageInitialUrl()}${movie.poster_path}`;
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
    const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US') : 'N/A';
    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : '';

    // API Mapping based on provided structure: movie.credits.crew, movie.credits.cast, movie.videos.results, movie.similar.results
    const directors = movie.credits?.crew?.filter((c: any) => c.job === 'Director') || [];
    const screenplays = movie.credits?.crew?.filter((c: any) => c.job === 'Screenplay' || c.job === 'Writer') || [];
    const trailer = movie.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
    const cast = movie.credits?.cast?.slice(0, 10) || [];
    const similarMovies = movie.similar?.results?.slice(0, 10) || [];

    return (
        <AppLayout>
            {/* Header Section */}
            <div
                className="relative w-full bg-cover bg-center bg-no-repeat text-white min-h-[500px]"
                style={{ backgroundImage: `url(${backdropUrl})` }}
            >
                {/* Dark Overlay - using a solid theme-based overlay */}
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>

                <div className="relative max-w-[1400px] mx-auto px-8 py-8 md:py-12 flex flex-col md:flex-row gap-8">
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
                        <div>
                            <h1 className="text-4xl font-extrabold tracking-tight">
                                {movie.title} <span className="font-light text-muted-foreground ml-1">({year})</span>
                            </h1>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-2 font-medium">
                                <span>{releaseDate}</span>
                                <span className="before:content-['•'] before:mr-2 before:ml-2">
                                    {movie.genres?.map((g: any) => g.name).join(', ')}
                                </span>
                                {runtime && <span className="before:content-['•'] before:mr-2 before:ml-2">{runtime}</span>}
                            </div>
                        </div>

                        {/* Actions Row */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="transform scale-125 origin-left">
                                    <CircularRating rating={movie.vote_average} size={60} strokeWidth={4} />
                                </div>
                                <div className="font-bold text-sm leading-tight ml-3">
                                    User<br />Score
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button variant="secondary" size="icon" className="rounded-full h-10 w-10">
                                    <List size={16} />
                                </Button>
                                <Button variant="secondary" size="icon" className="rounded-full h-10 w-10">
                                    <Heart size={16} />
                                </Button>
                                <Button variant="secondary" size="icon" className="rounded-full h-10 w-10">
                                    <Bookmark size={16} />
                                </Button>

                                {trailer && (
                                    <Button
                                        variant="ghost"
                                        className="text-foreground hover:text-primary gap-2 hover:bg-transparent transition-colors font-bold"
                                        onClick={() => setShowTrailer(true)}
                                    >
                                        <Play fill="currentColor" size={20} /> Play Trailer
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Tagline */}
                        {movie.tagline && <div className="italic text-muted-foreground text-lg font-medium opacity-90">{movie.tagline}</div>}

                        {/* Overview */}
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Overview</h3>
                            <p className="text-sm md:text-base leading-relaxed text-muted-foreground max-w-4xl">{movie.overview}</p>
                        </div>

                        {/* Crew */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4">
                            {directors.map((d: any) => (
                                <div key={d.id}>
                                    <p className="font-bold text-foreground">{d.name}</p>
                                    <p className="text-sm text-muted-foreground">Director</p>
                                </div>
                            ))}
                            {screenplays.slice(0, 3).map((w: any) => (
                                <div key={`${w.id}-${w.job}`}>
                                    <p className="font-bold text-foreground">{w.name}</p>
                                    <p className="text-sm text-muted-foreground">{w.job}</p>
                                </div>
                            ))}
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
        </AppLayout>
    );
};

export default MovieDetails;
