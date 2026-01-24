"use client";

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getImageInitialUrl } from '@/utils/helpers';
import { usePersonDetails } from '@/hooks/useTmdb';
import { Skeleton } from '../ui/skeleton';
import MovieCard from '../MoviesList/MovieCard';
import { Calendar, MapPin, User, Info } from 'lucide-react';
import BackButton from '../ui/back-button';

const PersonDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: person, isLoading } = usePersonDetails(id || '');

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
                        <Skeleton className="h-32 w-full bg-muted" />
                    </div>
                </div>
            </div>
        );
    }

    if (!person) return <div className="h-screen flex items-center justify-center text-foreground bg-background font-bold text-xl">Person not found</div>;

    const profileUrl = person.profile_path
        ? `${getImageInitialUrl()}${person.profile_path}`
        : 'https://via.placeholder.com/500x750?text=No+Profile+Image';

    const gender = person.gender === 1 ? 'Female' : (person.gender === 2 ? 'Male' : 'Non-binary/Unknown');
    const knownFor = person.combined_credits?.cast
        ?.sort((a: any, b: any) => (b.vote_count || 0) - (a.vote_count || 0))
        ?.slice(0, 15) || [];

    return (
        <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
            {/* Header Area (Similar to Movie Details) */}
            <div className="relative w-full bg-muted/30 border-b">
                <div className="max-w-[1400px] mx-auto px-8 py-4 md:py-8 flex flex-col items-start gap-6">
                    <BackButton />
                    <div className="flex flex-col md:flex-row gap-8 lg:gap-12">

                        {/* Left Column: Image */}
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                            <div className="w-[300px] h-[450px] relative rounded-lg shadow-2xl border border-border/50 overflow-hidden bg-muted">
                                <img
                                    src={profileUrl}
                                    alt={person.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Right Column: Name & Info */}
                        <div className="flex-1 space-y-8 text-foreground min-w-0">
                            <div>
                                <h1 className="text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight mb-2">
                                    {person.name}
                                </h1>
                                <div className="flex items-center gap-4 text-muted-foreground font-medium">
                                    <span className="flex items-center gap-1.5"><User size={16} className="text-primary" /> {gender}</span>
                                    {person.birthday && (
                                        <span className="flex items-center gap-1.5 before:content-['•'] before:mr-2">
                                            <Calendar size={16} className="text-primary" /> {person.birthday} ({new Date().getFullYear() - new Date(person.birthday).getFullYear()} years old)
                                        </span>
                                    )}
                                </div>
                                {person.place_of_birth && (
                                    <p className="text-muted-foreground mt-2 flex items-center gap-1.5 font-medium">
                                        <MapPin size={16} className="text-primary" /> {person.place_of_birth}
                                    </p>
                                )}
                            </div>

                            {person.biography && (
                                <section className="space-y-3">
                                    <h3 className="text-2xl font-bold flex items-center gap-2">
                                        <span className="w-1 h-6 bg-primary rounded-full" />
                                        Biography
                                    </h3>
                                    <div className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-line max-w-4xl line-clamp-[12]">
                                        {person.biography}
                                    </div>
                                </section>
                            )}

                            <div className="flex flex-wrap gap-8 pt-4">
                                <div>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">Department</p>
                                    <p className="font-semibold">{person.known_for_department || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">Famous For</p>
                                    <p className="font-semibold">{knownFor.length} Projects</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Area: Works */}
            <div className="max-w-[1400px] mx-auto px-8 py-12">
                {knownFor.length > 0 && (
                    <section className="space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <span className="w-1 h-6 bg-primary rounded-full" />
                                Known For
                            </h3>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
                            {knownFor.map((work: any, index: number) => (
                                <div key={`${work.id}-${index}`} className="flex-none">
                                    <MovieCard
                                        id={work.id}
                                        title={work.title || work.name || 'Untitled'}
                                        posterPath={work.poster_path}
                                        releaseDate={work.release_date || work.first_air_date || ''}
                                        voteAverage={work.vote_average}
                                        mediaType={work.media_type}
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

export default PersonDetails;
