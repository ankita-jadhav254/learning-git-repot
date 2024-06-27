import React from "react";
import Watchlist from "./Watchlist";

function MovieCard({
  poster_path,
  original_title,
  handleAddtoWatchlist,
  movieObj,
  handleRemoveFromWatchList,
  watchlist,
}) {
  function doesContain(movieObj) {
    for (let i = 0; i < watchlist.length; i++) {
      if (watchlist[i].id == movieObj.id) {
        return true;
      }
    }
    return false;
  }

  return (
    <div
      className="h-[50vh] w-[180px] bg-cover bg-center rounded-xl hover:scale-110 duration-300ms hover:cursor-pointer scroll-smooth flex flex-col justify-between items-end"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {doesContain(movieObj) ? (
        <div
          onClick={() => handleRemoveFromWatchList(movieObj)}
          className="h-8 w-8 m-4 bg-gray-900/60 rounded-xl flex justify-center items-center"
        >
          &#10060;
        </div>
      ) : (
        <div
          onClick={() => handleAddtoWatchlist(movieObj)}
          className="h-8 w-8 m-4 bg-gray-900/60 rounded-xl flex justify-center items-center"
        >
          &#128525;
        </div>
      )}

      <div className="text-white text-xl w-full p-2 text-center bg-gray-900/60">
        {original_title}
      </div>
    </div>
  );
}

export default MovieCard;
