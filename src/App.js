import React, { useEffect, useState } from 'react'
import Glide from "./components/glide";
import './App.css';
import Moviecard from './components/Moviecard'

export default function App() {


  const [movies, setMovies] = useState([])
console.log(movies)
  useEffect(() => {
    const url = 'https://api.themoviedb.org/3/trending/all/day?api_key=c31dce7dae483b752a1adfcb2a791674&page=1'
    try {
      fetch(url)
        .then((res)=> res.json())
        .then((data) => setMovies(data.results))

    } catch (error) {
      console.log(error.message)
    }
  }, [])
  
  return (
    <>
    <div className="title-section">
      <h1>Popular Movies</h1> <h3>see all</h3>
    </div>
      <Glide
        settings={{
          glideToShow: 6,
          glideToScroll: 1,
          responsive: [
            {
              breakpoint: 767,
              settings: {
                glideToShow: 1,
                glideToScroll: 1
              }
            }
          ]
        }}
      >
        {movies.filter(movie => movie.media_type === "movie" && movie.popularity >= 1000).map((movie, idx) => <Moviecard movie={movie} idx={idx}/>)}
      </Glide>
    </>
  );
}
