import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./MoviesList.css";

const IMG_INITIAL_URL = "https://image.tmdb.org/t/p/w500/";

function Movies() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  const TRENDING_MOVIES_API_URL =
    "https://api.themoviedb.org/3/trending/all/day?api_key=bb320e801ed3a5b652434c6d98f71de2";

  useEffect(() => {
    const trendingMovies = () => {
      fetch(TRENDING_MOVIES_API_URL)
        .then((res) => res.json())
        .then((data) => {
          setTrendingMovies(data.results);
        });
    };

    const upcomingMovies = () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjMyMGU4MDFlZDNhNWI2NTI0MzRjNmQ5OGY3MWRlMiIsInN1YiI6IjYzNTJjM2QzMjU1ZGJhMDA3YTY0ZWJlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oUvaGp1DEH9UODXdSN_l3rqKsE1u5g7cqEm7c_5FQsY",
        },
      };

      fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        options
      )
        .then((response) => response.json())
        .then((data) => {
          setUpcomingMovies(data.results);
        });
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
      <p
        style={{
          marginTop: "8px",
          marginLeft: "35px",
          fontWeight: "bold",
          fontSize: "25px",
        }}
      >
        Trending
      </p>
      <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
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
      <br/>
      <br/>

      <p
        style={{
          marginTop: "8px",
          marginLeft: "35px",
          fontWeight: "bold",
          fontSize: "25px",
        }}
      >
        Upcoming
      </p>
      <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
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
