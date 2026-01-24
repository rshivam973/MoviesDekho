import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '../Layout/AppLayout';
import CircularRating from '../ui/circular-rating';
import { Button } from '../ui/button';
import { List, Heart, Bookmark } from 'lucide-react';
import { useAnimeDetails } from '../../hooks/useAnime';
import { Skeleton } from '../ui/skeleton';

const AnimeDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data: anime, isLoading } = useAnimeDetails(Number(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (isLoading) {
        return (
            <AppLayout>
                <div className="w-full h-[500px] bg-gray-900 animate-pulse flex items-center justify-center">
                    <div className="max-w-[1400px] w-full px-8 flex gap-8">
                        <Skeleton className="w-[300px] h-[450px] rounded-lg bg-gray-800" />
                        <div className="flex-1 space-y-4 pt-12">
                            <Skeleton className="h-10 w-2/3 bg-gray-800" />
                            <div className="flex gap-4 mt-8">
                                <Skeleton className="w-16 h-16 rounded-full bg-gray-800" />
                            </div>
                            <Skeleton className="h-32 w-full bg-gray-800" />
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    if (!anime) return <div className="h-screen flex items-center justify-center text-white bg-[#032541]">Anime not found</div>;

    // Mapping based on user provided JSON structure
    const title = anime.title_ov || anime.alternative_titles?.english || "Untitled";
    const mainPicture = anime.picture_url;
    const score = anime.statistics?.score || 0;
    const rank = anime.statistics?.ranked || 0;
    const popularity = anime.statistics?.popularity || 0;
    const synopsis = anime.synopsis;

    // Extract year from "Apr 3, 1998 to Apr 24, 1999"
    const airedString = anime.information?.aired || "";
    const year = airedString.split(',')[1]?.trim().split(' ')[0] || "";

    const genres = anime.information?.genres?.map((g: any) => g.name).join(', ') || "";
    const studios = anime.information?.studios?.map((s: any) => s.name).join(', ') || "";
    const duration = anime.information?.duration || "";
    const rating = anime.information?.rating || "";

    return (
        <AppLayout>
            <div className="relative w-full bg-[#0d253f] text-white py-12">
                <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row gap-8">
                    {/* Poster */}
                    <div className="flex-shrink-0 mx-auto md:mx-0">
                        <img
                            src={mainPicture}
                            alt={title}
                            className="w-[300px] h-auto rounded-lg shadow-xl"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold">
                                {title} <span className="font-normal text-gray-300 ml-1">({year})</span>
                            </h1>
                            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-300 mt-1">
                                <span className="border border-gray-400 px-1 rounded text-xs">{rating}</span>
                                <span>{airedString}</span>
                                <span className="before:content-['•'] before:mr-2 before:ml-2">
                                    {genres}
                                </span>
                                <span className="before:content-['•'] before:mr-2 before:ml-2">{duration}</span>
                            </div>
                        </div>

                        {/* Actions Row */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <div className="transform scale-125 origin-left">
                                    <CircularRating rating={score} size={60} strokeWidth={4} />
                                </div>
                                <div className="font-bold text-sm leading-tight ml-2">
                                    User<br />Score
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <Button variant="round" size="icon" className="bg-[#032541] hover:bg-[#10385a]">
                                    <List size={14} />
                                </Button>
                                <Button variant="round" size="icon" className="bg-[#032541] hover:bg-[#10385a]">
                                    <Heart size={14} />
                                </Button>
                                <Button variant="round" size="icon" className="bg-[#032541] hover:bg-[#10385a]">
                                    <Bookmark size={14} />
                                </Button>
                            </div>
                        </div>

                        {/* Tagline equivalent / Studios currently */}
                        <div className="italic text-gray-300 text-lg opacity-80">{studios}</div>

                        {/* Overview */}
                        <div>
                            <h3 className="text-xl font-bold mb-2">Synopsis</h3>
                            <p className="text-sm md:text-base leading-relaxed whitespace-pre-line">{synopsis}</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 border-t border-gray-700 pt-6">
                            <div>
                                <p className="font-bold">Status</p>
                                <p className="text-gray-300">{anime.information?.status}</p>
                            </div>
                            <div>
                                <p className="font-bold">Episodes</p>
                                <p className="text-gray-300">{anime.information?.episodes}</p>
                            </div>
                            <div>
                                <p className="font-bold">Rank</p>
                                <p className="text-gray-300">#{rank}</p>
                            </div>
                            <div>
                                <p className="font-bold">Popularity</p>
                                <p className="text-gray-300">#{popularity}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default AnimeDetails;
