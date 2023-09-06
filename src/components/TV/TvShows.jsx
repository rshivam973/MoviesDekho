import React from 'react';
import Header from '../Header/Header';
import Navi from '../Navbar/Navbar';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect } from 'react';
import { useState } from 'react';
import './TvShows.css';

const IMG_INITIAL_URL = "https://image.tmdb.org/t/p/w500/";

const TvShows = () => {

    const [topRated,setTopRated]= useState([]);
    const [popular, setPopular] = useState([]);
    const [onTheAir, setOnTheAir]= useState([]);
    const [airingToday, setAiringToday]= useState([]);

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


    useEffect(()=>{

        const topRated = async()=>{
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjMyMGU4MDFlZDNhNWI2NTI0MzRjNmQ5OGY3MWRlMiIsInN1YiI6IjYzNTJjM2QzMjU1ZGJhMDA3YTY0ZWJlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oUvaGp1DEH9UODXdSN_l3rqKsE1u5g7cqEm7c_5FQsY'
                }
              };
              
              fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
                .then(response => response.json())
                .then(
                    response => setTopRated(response.results)
                )
                .catch(err => console.error(err));
        }

        const popular = async()=>{
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjMyMGU4MDFlZDNhNWI2NTI0MzRjNmQ5OGY3MWRlMiIsInN1YiI6IjYzNTJjM2QzMjU1ZGJhMDA3YTY0ZWJlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oUvaGp1DEH9UODXdSN_l3rqKsE1u5g7cqEm7c_5FQsY'
                }
              };
              
              fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
                .then(response => response.json())
                .then(response => setPopular(response.results))
                .catch(err => console.error(err));
        }

        const onTheAir = async()=>{
            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjMyMGU4MDFlZDNhNWI2NTI0MzRjNmQ5OGY3MWRlMiIsInN1YiI6IjYzNTJjM2QzMjU1ZGJhMDA3YTY0ZWJlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oUvaGp1DEH9UODXdSN_l3rqKsE1u5g7cqEm7c_5FQsY'
                }
              };
              
              fetch('https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1', options)
                .then(response => response.json())
                .then(response => setOnTheAir(response.results))
                .catch(err => console.error(err));
        }

        const airingToday = ()=>{

            const options = {
                method: 'GET',
                headers: {
                  accept: 'application/json',
                  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjMyMGU4MDFlZDNhNWI2NTI0MzRjNmQ5OGY3MWRlMiIsInN1YiI6IjYzNTJjM2QzMjU1ZGJhMDA3YTY0ZWJlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oUvaGp1DEH9UODXdSN_l3rqKsE1u5g7cqEm7c_5FQsY'
                }
              };
              
              fetch('https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=1', options)
                .then(response => response.json())
                .then(response => setAiringToday(response.results))
                .catch(err => console.error(err));

        }

        topRated();
        popular();
        onTheAir();
        airingToday();


    },[]);


  return (
    <div>
        <Header />
        <Navi />
        <p
        style={{
          marginTop: "8px",
          marginLeft: "35px",
          fontWeight: "bold",
          fontSize: "25px",
        }}
      >
        Top Rated
      </p>
      <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <Carousel {...carouselConfig}>
          {topRated.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={IMG_INITIAL_URL + movie.poster_path}
                alt={movie.original_title}
                style={imgStyle}
              />
              <p className='movie-title'>{movie.name}</p>
            </div>
          ))}
        </Carousel>
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
        Popular
      </p>
      <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <Carousel {...carouselConfig}>
          {popular.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={IMG_INITIAL_URL + movie.poster_path}
                alt={movie.original_title}
                style={imgStyle}
              />
              <p className='movie-title'>{movie.name}</p>
            </div>
          ))}
        </Carousel>
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
        On The Air
      </p>
      <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <Carousel {...carouselConfig}>
          {onTheAir.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={IMG_INITIAL_URL + movie.poster_path}
                alt={movie.original_title}
                style={imgStyle}
              />
              <p className='movie-title'>{movie.name}</p>
            </div>
          ))}
        </Carousel>
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
        Airing Today
      </p>
      <div style={{ paddingLeft: "2%", paddingRight: "2%" }}>
        <Carousel {...carouselConfig}>
          {airingToday.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={IMG_INITIAL_URL + movie.poster_path}
                alt={movie.original_title}
                style={imgStyle}
              />
              <p className='movie-title'>{movie.name}</p>
            </div>
          ))}
        </Carousel>
      </div>

        
    </div>
  )
}

export default TvShows;