import React, { useEffect, useState } from 'react';
import Header from '../../Header/Header';
import Navi from '../../Navbar/Navbar';
import Cards from '../../Cards/Cards';
import './TopRated.css';

const IMG_INITIAL_URL = "https://image.tmdb.org/t/p/w500/";

function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  }

function renderCard(val) {
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
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreMovies = () => {
    if (isLoading) return;

    setIsLoading(true);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjMyMGU4MDFlZDNhNWI2NTI0MzRjNmQ5OGY3MWRlMiIsInN1YiI6IjYzNTJjM2QzMjU1ZGJhMDA3YTY0ZWJlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oUvaGp1DEH9UODXdSN_l3rqKsE1u5g7cqEm7c_5FQsY',
      },
    };

    fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`, options)
      .then(response => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data.results.length > 0) {
          const newMovies = data.results.filter(movie => !topRatedMovies.some(existingMovie => existingMovie.id === movie.id));
          setTopRatedMovies(prevMovies => [...prevMovies, ...newMovies]);
          setPage(prevPage => prevPage + 1);
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error loading movies:', error);
      });
  };

  useEffect(() => {
    // Initial load of movies
    loadMoreMovies();
  }, []);

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
            <button type="button load-more-button" className="btn btn-magick btn-lg btn3d" onClick={loadMoreMovies}><span className="glyphicon glyphicon-refresh"></span> Load More Movies</button>
        </div>
      </div>
    </div>
  );
};

export default TopRated;
