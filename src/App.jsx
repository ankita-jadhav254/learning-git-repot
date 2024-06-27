import { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist";
import Banner from "./components/Banner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  let [watchlist, setWatchList] = useState([]);

  let handleAddtoWatchlist = (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    setWatchList(newWatchList);
    localStorage.setItem('movieApp', JSON.stringify(newWatchList))
    console.log(newWatchList);
  };

  let handleRemoveFromWatchList = (movieObj) => {
    let filteredWatchList = watchlist.filter((movie) => {
      return movie.id != movieObj.id;
    });
    setWatchList(filteredWatchList)
    localStorage.setItem('movieApp',JSON.stringify(filteredWatchList) )
    console.log(filteredWatchList)
  };

useEffect(()=>{
  let moviesFromLocalStrorage = localStorage.getItem('movieApp')
  if(!moviesFromLocalStrorage){
    return
  }
setWatchList(JSON.parse(moviesFromLocalStrorage))
} ,[])


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />{" "}
                <Movies handleAddtoWatchlist={handleAddtoWatchlist} handleRemoveFromWatchList={handleRemoveFromWatchList} watchlist={watchlist} />
              </>
            }
          />

          <Route
            path="/watchlist"
            element={
              <>
                <Watchlist watchlist={watchlist} setWatchList={setWatchList} handleRemoveFromWatchList={handleRemoveFromWatchList} />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
