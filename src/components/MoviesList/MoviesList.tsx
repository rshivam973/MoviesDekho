import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./MoviesList.css";
import { getImageInitialUrl } from "../../utils/helpers";
import tmdbApi from "../../api/tmdb";
interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  name?: string;
}

const IMG_INITIAL_URL = getImageInitialUrl();
const API_KEY = process.env.REACT_APP_API_KEY;

const Movies: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);

  const TRENDING_MOVIES_API_URL =
    "https://api.themoviedb.org/3/trending/all/day?api_key=" + API_KEY;

  useEffect(() => {
    const trendingMovies = async () => {
      try {
        const response = await tmdbApi.get('/trending/all/day');
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    const upcomingMovies = async () => {
      try {
        const response = await tmdbApi.get('/movie/upcoming', {
          params: { language: 'en-US', page: 1 }
        });
        setUpcomingMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };

    trendingMovies();
    upcomingMovies();
  }, []);

  // Configuration for the carousel
  const carouselConfig = {
    responsive: {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    },
    autoPlay: true,
    autoPlaySpeed: 3000,
    infinite: true, // Enable infinite looping
  };

  // CSS styles for the movie images
  const imgStyle = {
    width: "100%",
    height: "280px",
    borderRadius: "18px",
  };

  return (
    <>
      <p className="mt-2 ml-9 font-bold text-2xl">
        Trending
      </p>
      <div className="px-2">
        <Carousel {...carouselConfig}>
          {trendingMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={IMG_INITIAL_URL + movie.poster_path}
                alt={movie.original_title}
                style={imgStyle}
              />
              <p className="px-2">{movie.original_title}</p>
            </div>
          ))}
        </Carousel>
      </div>

      <div className="hr-class">
        <hr color="black" />
      </div>
      <br />
      <br />

      <p className="mt-2 ml-9 font-bold text-2xl">
        Upcoming
      </p>
      <div className="px-2">
        <Carousel {...carouselConfig}>
          {upcomingMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={IMG_INITIAL_URL + movie.poster_path}
                alt={movie.original_title}
                style={imgStyle}
              />
              <p className="px-2">{movie.original_title}</p>
            </div>
          ))}
        </Carousel>
      </div>

      <hr color="black" className="hr-class" />
    </>
  );
}

export default Movies;
