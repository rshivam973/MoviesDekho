import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Navi from "../Navbar/Navbar";
import "./Anime.css";

const RAPID_API_KEY= process.env.REACT_APP_RAPID_API_KEY;

const Anime = () => {
  const [topAnimes, setTopAnimes] = useState([]);
  const [upcomingAnimes, setUpcomingAnimes]= useState([]);

  // Define the carousel configuration
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

  const imgStyle = {
    width: "100%",
    height: "280px",
    borderRadius: "18px",

  };

  useEffect(() => {
    const topAnimes = async () => {
      const url = "https://myanimelist.p.rapidapi.com/anime/top/all";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            RAPID_API_KEY,
          "X-RapidAPI-Host": "myanimelist.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setTopAnimes(result);
      } catch (error) {
        console.error(error);
      }
    };

    const upcomingAnimes = async () => {
      const url = "https://myanimelist.p.rapidapi.com/anime/top/upcoming";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            RAPID_API_KEY,
          "X-RapidAPI-Host": "myanimelist.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setUpcomingAnimes(result);
      } catch (error) {
        console.error(error);
      }
    };

    topAnimes();
    upcomingAnimes();
  }, []);

  return (
    <div className="">
      <Header />
      <Navi />

      <p style={{marginTop:'8px',marginLeft:'35px',fontWeight:'bold',fontSize:'25px'}}>Top Animes</p>
      <div style={{paddingLeft:"2%", paddingRight:"2%"}}>
      {topAnimes.length > 0 && (
        <Carousel {...carouselConfig}>
          {topAnimes.map((anime) => (
            <div key={anime.rank} className="anime-card" >
              <img src={anime.picture_url} alt={anime.title} style={imgStyle} />
              <div className="anime-card-content">
                <p className="anime-title">{anime.title}</p>
                <a href={anime.myanimelist_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm rounded anime-external-link">Click for more</a>
              </div>
            </div>
          ))}
        </Carousel>
      )}
      </div>
      <br/>

      <p style={{marginTop:'8px',marginLeft:'35px',fontWeight:'bold',fontSize:'25px'}}>Top Upcoming Animes</p>
      <div style={{paddingLeft:"2%", paddingRight:"2%"}}>
      {upcomingAnimes.length > 0 && (
        <Carousel {...carouselConfig}>
          {upcomingAnimes.map((anime) => (
            <div key={anime.rank} className="anime-card">
              <img src={anime.picture_url} alt={anime.title} style={imgStyle} />
              <div className="anime-card-content">
                <p className="anime-title">{anime.title}</p>
                <a href={anime.myanimelist_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm rounded anime-external-link">Click for more</a>
              </div>
            </div>
          ))}
        </Carousel>
      )}
      </div>
      <br/>  



    </div>
  );
};

export default Anime;
