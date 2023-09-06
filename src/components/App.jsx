import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import TopRated from "./MoviesList/TopRated/TopRated";
import Home from "./Home";
import Anime from "./Anime/Anime";
import TvShows from "./TV/TvShows";
import Contact from "./Contact/Contact";


function App(){
    return (<div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                    <Route path='/Top-rated' element={<TopRated />}/ >
                    <Route path="/anime" element={<Anime/>} />
                    <Route path="/tvshows" element={<TvShows/>} />
                    <Route path="/contact" element={<Contact/>}/>


            </Routes>
        </BrowserRouter>

    </div>);
}

export default App;