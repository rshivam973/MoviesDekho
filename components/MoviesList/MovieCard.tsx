import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { getImageInitialUrl } from '@/utils/helpers';
import CircularRating from '../ui/circular-rating';
import Link from 'next/link';

interface MovieCardProps {
    id: number;
    title: string;
    posterPath: string;
    releaseDate: string;
    voteAverage: number;
    mediaType?: 'movie' | 'tv' | 'anime';
}

const MovieCard: React.FC<MovieCardProps> = ({
    id,
    title,
    posterPath,
    releaseDate,
    voteAverage,
    mediaType = 'movie',
}) => {
    const imageUrl = posterPath
        ? (posterPath.startsWith('http') ? posterPath : `${getImageInitialUrl()}${posterPath}`)
        : 'https://via.placeholder.com/500x750';

    // Format date logic
    let formattedDate = releaseDate;
    const dateObj = new Date(releaseDate);
    if (!isNaN(dateObj.getTime())) {
        formattedDate = dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
    }

    return (
        <div className="flex flex-col w-[150px] sm:w-[160px] md:w-[180px] lg:w-[200px] mb-4 relative group">
            {/* Image Container */}
            <div className="relative rounded-lg overflow-hidden shadow-sm h-[225px] sm:h-[240px] md:h-[270px] lg:h-[300px]">
                <Link href={`/${mediaType}/${id}`}>
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover cursor-pointer"
                    />
                </Link>

                {/* Hover Menu Icon */}
                <div className="absolute top-2 right-2 w-6 h-6 bg-muted/50 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors opacity-60 hover:opacity-100">
                    <MoreHorizontal size={16} />
                </div>
            </div>

            {/* Content */}
            <div className="relative pt-6 px-2 pb-2">
                {/* Floating Rating */}
                <div className="absolute -top-5 left-3">
                    <CircularRating rating={voteAverage} />
                </div>

                <Link href={`/${mediaType}/${id}`} className="hover:text-primary">
                    <h3 className="font-bold text-sm leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {title}
                    </h3>
                </Link>
                <p className="text-sm text-muted-foreground mt-1">{formattedDate}</p>
            </div>
        </div>
    );
};

export default MovieCard;
