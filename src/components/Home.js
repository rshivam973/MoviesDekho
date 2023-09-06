import React from 'react'
import Navbar from "./Navbar/Navbar";
import Header from "./Header/Header";
import Movies from './MoviesList/MoviesList';

const Home= () => {
  return (
    <div>
        <Header />
        <Navbar />
        <Movies/>
        
    </div>
  )
}

export default Home;