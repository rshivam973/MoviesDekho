"use client";

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import CircularRating from '../ui/circular-rating';
import { Button } from '../ui/button';
import { Calendar, Clock, Tv, Star, Users, Hash } from 'lucide-react';
import { useAnimeDetails } from '@/hooks/useAnime';
import { Skeleton } from '../ui/skeleton';
import MovieCard from '../MoviesList/MovieCard';
import BackButton from '../ui/back-button';
import { cn } from '@/lib/utils';

const AnimeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: anime, isLoading } = useAnimeDetails(Number(id));

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
                            </div>
                        </div>
                        <Skeleton className="h-32 w-full bg-muted" />
                    </div>
                </div>
            </div>
        );
    }

    if (!anime) return <div className="h-screen flex items-center justify-center text-foreground bg-background">Anime not found</div>;

    const title = anime.title || anime.alternative_titles?.en || "Untitled";
    const mainPicture = anime.main_picture?.large || anime.main_picture?.medium;
    const score = anime.mean || 0;
    const rank = anime.rank || 0;
    const popularity = anime.popularity || 0;
    const synopsis = anime.synopsis || "No synopsis available.";
    const background = anime.background;

    const startDate = anime.start_date;
    const year = startDate ? new Date(startDate).getFullYear() : "";

    const genres = anime.genres?.map((g: any) => g.name).join(', ') || "N/A";
    const studios = anime.studios?.map((s: any) => s.name).join(', ') || "N/A";

    const durationSeconds = anime.average_episode_duration || 0;
    const durationMinutes = Math.floor(durationSeconds / 60);
    const durationDisplay = durationMinutes > 0 ? `${durationMinutes} min` : "N/A";

    const rating = anime.rating?.replace('_', '-').toUpperCase() || "N/A";
    const status = anime.status?.replace('_', ' ') || "N/A";
    const episodes = anime.num_episodes || "Unknown";
    const source = anime.source || "Unknown";

    return (
        <div className="min-h-screen bg-background text-foreground pb-12">
            {/* Header / Hero Section */}
            <div className="relative w-full bg-secondary/30 border-b">
                <div className="max-w-[1400px] mx-auto px-4 py-4 md:py-8 flex flex-col items-start gap-6">
                    <BackButton />
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Poster */}
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                            <img
                                src={mainPicture}
                                alt={title}
                                className="w-[300px] h-auto rounded-xl shadow-2xl border border-border"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="px-3 py-1 rounded bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider shadow-sm">
                                        {anime.media_type || "Anime"}
                                    </span>
                                    <span className="px-3 py-1 rounded bg-secondary text-secondary-foreground border border-border text-xs font-bold uppercase tracking-wider shadow-sm">
                                        {rating}
                                    </span>
                                    {anime.nsfw && anime.nsfw !== 'white' && (
                                        <span className={cn(
                                            "px-3 py-1 rounded border text-xs font-bold uppercase tracking-wider shadow-md",
                                            anime.nsfw === 'black' ? "bg-red-500 text-white border-red-600" : "bg-yellow-500 text-black border-yellow-600"
                                        )}>
                                            NSFW: {anime.nsfw}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                                        {title} <span className="font-light text-muted-foreground ml-1">({year})</span>
                                    </h1>
                                    <div className="flex items-center gap-2 bg-background/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 w-fit">
                                        <CircularRating rating={score} size={40} strokeWidth={3} />
                                        <span className="text-xs font-bold uppercase tracking-tighter leading-none">User<br />Score</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-3 font-medium">
                                    <span className="flex items-center gap-1.5"><Calendar size={14} /> {startDate} {anime.end_date ? `- ${anime.end_date}` : ''}</span>
                                    <span className="flex items-center gap-1.5"><Tv size={14} /> {status}</span>
                                    <span className="flex items-center gap-1.5"><Clock size={14} /> {durationDisplay}</span>
                                    <span className="before:content-['•'] before:mr-2 before:ml-2">
                                        {genres}
                                    </span>
                                </div>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 py-4 border-y border-border/50">
                                <div>
                                    <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.25em] mb-1 flex items-center gap-1.5 opacity-70">
                                        <Star size={13} className="text-yellow-500" /> Rank
                                    </p>
                                    <p className="text-xl font-black">#{rank}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.25em] mb-1 flex items-center gap-1.5 opacity-70">
                                        <Hash size={13} className="text-primary" /> Popularity
                                    </p>
                                    <p className="text-xl font-black">#{popularity}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.25em] mb-1 flex items-center gap-1.5 opacity-70">
                                        <Users size={13} className="text-blue-500" /> Members
                                    </p>
                                    <p className="text-xl font-black">{anime.num_list_users?.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-[0.25em] mb-1 flex items-center gap-1.5 opacity-70">
                                        <Users size={13} className="text-green-500" /> Scorers
                                    </p>
                                    <p className="text-xl font-black">{anime.num_scoring_users?.toLocaleString()}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-muted-foreground tracking-widest uppercase mb-1">Studios</h3>
                                <p className="font-semibold text-lg">{studios}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Details Body */}
            <div className="max-w-[1400px] mx-auto px-4 py-10 space-y-12">
                {/* Information Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-8">
                        {/* Synopsis */}
                        <section>
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="w-1 h-6 bg-primary rounded-full" />
                                Synopsis
                            </h3>
                            <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg">
                                {synopsis}
                            </p>
                        </section>

                        {/* Background */}
                        {background && (
                            <section>
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-primary rounded-full" />
                                    Background
                                </h3>
                                <p className="text-muted-foreground leading-relaxed italic border-l-4 border-border pl-6 py-2">
                                    {background}
                                </p>
                            </section>
                        )}
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <section className="bg-secondary/20 rounded-2xl p-6 border">
                            <h4 className="text-xl font-bold mb-6">Details</h4>
                            <div className="space-y-5">
                                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                                    <span className="text-muted-foreground font-medium">Episodes</span>
                                    <span className="font-bold">{episodes}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                                    <span className="text-muted-foreground font-medium">Source</span>
                                    <span className="font-bold capitalize">{source}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-border/50 pb-2">
                                    <span className="text-muted-foreground font-medium">Season</span>
                                    <span className="font-bold capitalize">{anime.start_season?.season} {anime.start_season?.year}</span>
                                </div>
                                {anime.broadcast && (
                                    <div className="flex justify-between items-start border-b border-border/50 pb-2">
                                        <span className="text-muted-foreground font-medium">Broadcast</span>
                                        <span className="font-bold text-right capitalize">{anime.broadcast.day_of_the_week}s at {anime.broadcast.start_time}</span>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Statistics Section */}
                        {anime.statistics?.status && (
                            <section className="bg-secondary/20 rounded-2xl p-6 border">
                                <h4 className="text-xl font-bold mb-6">Watching Status</h4>
                                <div className="space-y-4">
                                    {Object.entries(anime.statistics.status).map(([key, value]) => (
                                        <div key={key} className="space-y-1.5">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground capitalize">{key.replace('_', ' ')}</span>
                                                <span className="font-bold">{Number(value).toLocaleString()}</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full transition-all",
                                                        key === 'completed' ? 'bg-green-500' :
                                                            key === 'watching' ? 'bg-blue-500' :
                                                                key === 'dropped' ? 'bg-red-500' :
                                                                    key === 'on_hold' ? 'bg-yellow-500' : 'bg-primary'
                                                    )}
                                                    style={{ width: `${(Number(value) / Number(anime.statistics.num_list_users)) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <div className="pt-2 border-t border-border/50 flex justify-between items-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                        <span>Total Members</span>
                                        <span>{Number(anime.statistics.num_list_users).toLocaleString()}</span>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Alt Titles */}
                        {anime.alternative_titles && (
                            <section className="bg-secondary/20 rounded-2xl p-6 border">
                                <h4 className="text-xl font-bold mb-4">Alt Titles</h4>
                                <div className="space-y-4 text-sm">
                                    {anime.alternative_titles.en && (
                                        <div>
                                            <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">English</p>
                                            <p className="font-medium">{anime.alternative_titles.en}</p>
                                        </div>
                                    )}
                                    {anime.alternative_titles.ja && (
                                        <div>
                                            <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Japanese</p>
                                            <p className="font-medium font-noto">{anime.alternative_titles.ja}</p>
                                        </div>
                                    )}
                                    {anime.alternative_titles.synonyms && anime.alternative_titles.synonyms.length > 0 && (
                                        <div>
                                            <p className="text-muted-foreground font-bold uppercase text-[10px] tracking-widest">Synonyms</p>
                                            <p className="font-medium">{anime.alternative_titles.synonyms.join(', ')}</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {/* Images Gallery */}
                {anime.pictures && anime.pictures.length > 0 && (
                    <section>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary rounded-full" />
                            Gallery
                        </h3>
                        <div className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar scroll-smooth">
                            {anime.pictures.map((pic: any, index: number) => (
                                <div key={index} className="flex-none rounded-lg overflow-hidden border border-border shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                                    <img
                                        src={pic.large || pic.medium}
                                        alt={`Gallery Image ${index + 1}`}
                                        className="h-[160px] w-auto object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Related Manga */}
                {anime.related_manga && anime.related_manga.length > 0 && (
                    <section>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary rounded-full" />
                            Related Manga
                        </h3>
                        <div className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar scroll-smooth">
                            {anime.related_manga.map((rel: any) => (
                                <div key={rel.node.id} className="flex-none group bg-card rounded-lg overflow-hidden border border-border/50 shadow-md p-2 w-[110px] hover:shadow-xl transition-all duration-300">
                                    <img
                                        src={rel.node.main_picture?.large || rel.node.main_picture?.medium}
                                        alt={rel.node.title}
                                        className="w-full h-[150px] object-cover rounded-md mb-2"
                                    />
                                    <p className="font-bold text-[10px] line-clamp-2 min-h-[2rem] flex items-center leading-tight">{rel.node.title}</p>
                                    <p className="text-[8px] text-muted-foreground mt-1 capitalize font-medium">{rel.relation_type_formatted}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Related Anime */}
                {anime.related_anime && anime.related_anime.length > 0 && (
                    <section>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary rounded-full" />
                            Related Anime
                        </h3>
                        <div className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar scroll-smooth">
                            {anime.related_anime.map((rel: any) => (
                                <div key={rel.node.id} className="flex-none group">
                                    <div className="relative">
                                        <MovieCard
                                            id={rel.node.id}
                                            title={rel.node.title}
                                            posterPath={rel.node.main_picture?.large || rel.node.main_picture?.medium}
                                            releaseDate=""
                                            voteAverage={0}
                                            mediaType="anime"
                                            className="w-[150px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
                                        />
                                        <div className="absolute top-2 left-2 pointer-events-none">
                                            <span className="px-2 py-1 rounded bg-black/70 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm">
                                                {rel.relation_type_formatted}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Recommendations */}
                {anime.recommendations && anime.recommendations.length > 0 && (
                    <section>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-primary rounded-full" />
                            Recommendations
                        </h3>
                        <div className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar scroll-smooth">
                            {anime.recommendations.map((rec: any) => (
                                <div key={rec.node.id} className="flex-none">
                                    <MovieCard
                                        id={rec.node.id}
                                        title={rec.node.title}
                                        posterPath={rec.node.main_picture?.large || rec.node.main_picture?.medium}
                                        releaseDate=""
                                        voteAverage={0}
                                        mediaType="anime"
                                        className="w-[150px] sm:w-[160px] md:w-[180px] lg:w-[200px]"
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default AnimeDetails;
