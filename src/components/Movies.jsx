import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

function Movies({handleAddtoWatchlist,handleRemoveFromWatchList,watchlist}) {
  const [movies, setMovies] = useState([]);
  const[pageNo , setPageNo] = useState(1)

  const handlePrev=()=>{
    if(pageNo===1){
      setPageNo(1)
    }
    else{
      setPageNo(pageNo-1)
    }
   
  }

  const handleNext=()=>{
    setPageNo(pageNo+1)
  }
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=bec713d7a50eaf337303a6784ee11783&language=en-US&page=${pageNo}`
      )
      .then(function (res) {
        setMovies(res.data.results);
      });
  }, [pageNo]);
  return (
    <div className="p-5">
      <div className="text-center text-2xl m-5 font-bold">Trending Movies</div>
      <div className="flex flex-row flex-wrap justify-around gap-8">
        {movies.map((movieObj) => {
          return (
            <MovieCard
              key={movieObj.poster_path}
              poster_path={movieObj.poster_path}
              original_title={movieObj.original_title}
              handleAddtoWatchlist={handleAddtoWatchlist}
              movieObj={movieObj}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
              watchlist={watchlist}
            />
          );
        })}
      </div>
      <div>
        <Pagination handleNext={handleNext} handlePrev={handlePrev} pageNo={pageNo}/>
      </div>
    </div>
  );
}

export default Movies;
//https://api.themoviedb.org/3/movie/popular?api_key=bec713d7a50eaf337303a6784ee11783&language=en-US&page=1
//key={movieObj.poster_path} poster_path={movieObj.poster_path}
