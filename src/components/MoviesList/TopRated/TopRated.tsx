import React, { useEffect, useState, useCallback } from 'react';
import Header from '../../Header/Header';
import Navi from '../../Navbar/Navbar';
import Cards from '../../Cards/Cards';
import './TopRated.css';
import tmdbApi from "../../../api/tmdb";
import { getImageInitialUrl } from '../../../utils/helpers';


const IMG_INITIAL_URL = getImageInitialUrl();

interface MovieType {
    id: number;
    poster_path: string;
    original_title: string;
    release_date: string;
    vote_average: number;
}

function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + '...';
}

function renderCard(val: MovieType) {
    const finalImgUrl = IMG_INITIAL_URL + val.poster_path;
    const truncatedName = truncateText(val.original_title, 21); // Adjust the maxLength as needed
    return (
        <Cards
            key={val.id}
            name={truncatedName}
            img={finalImgUrl}
            releaseDate={val.release_date}
            rating={val.vote_average}
        />
    );
}

const TopRated = () => {
    const [topRatedMovies, setTopRatedMovies] = useState<MovieType[]>([]);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loadMoreMovies = useCallback(async () => {
        if (isLoading) return;

        setIsLoading(true);

        try {
            const response = await tmdbApi.get('/movie/top_rated', {
                params: { language: 'en-US', page }
            });
            const data = response.data;
            if (data.results.length > 0) {
                const newMovies = data.results.filter((movie: MovieType) => !topRatedMovies.some((existingMovie: MovieType) => existingMovie.id === movie.id));
                setTopRatedMovies(prevMovies => [...prevMovies, ...newMovies]);
                setPage(prevPage => prevPage + 1);
            }
        } catch (error) {
            console.error('Error loading movies:', error);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, page, topRatedMovies]);

    useEffect(() => {
        // Initial load of movies
        loadMoreMovies();
    }, [loadMoreMovies]);

    return (
        <div>
            <Header />
            <Navi />
            <p style={{ marginTop: '8px', marginLeft: '35px', fontWeight: 'bold', fontSize: '25px' }}>Top Rated</p>
            <div>
                {topRatedMovies.map((movie) => renderCard(movie))}
                <br />
                {isLoading && <p>Loading...</p>}
                <div className='text-center'>
                    <button type="button" className="btn btn-magick btn-lg btn3d load-more-button" onClick={loadMoreMovies}><span className="glyphicon glyphicon-refresh"></span> Load More Movies</button>
                </div>
            </div>
        </div>
    );
};

export default TopRated;
