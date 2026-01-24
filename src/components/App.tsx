import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopRated from "./MoviesList/TopRated/TopRated";
import Home from "./Home";
import Anime from "./Anime/Anime";
import TvShows from "./TV/TvShows";
import Contact from "./Contact/Contact";
import MovieDetails from "./Details/MovieDetails";
import PopularMovies from "./MoviesList/PopularMovies";
import People from "./People/People";
import AnimeDetails from "./Details/AnimeDetails";

function App(): React.JSX.Element {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path='/movie/:id' element={<MovieDetails />} />
                    <Route path='/movie' element={<PopularMovies />} />
                    <Route path='/people' element={<People />} />
                    <Route path='/Top-rated' element={<TopRated />} />
                    <Route path='/anime/:id' element={<AnimeDetails />} />
                    <Route path="/anime" element={<Anime />} />
                    <Route path="/tvshows" element={<TvShows />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
