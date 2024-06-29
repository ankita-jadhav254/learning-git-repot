import { useEffect, useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import Watchlist from "./components/Watchlist";
import Banner from "./components/Banner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  let [watchlist, setWatchList] = useState([]);

  let handleAddtoWatchlist = async (movieObj) => {
    try {
        let response = await fetch('http://localhost:3000/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieObj)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        let newMovie = await response.json();
        let newWatchList = [...watchlist, newMovie];
        setWatchList(newWatchList);
        console.log(newWatchList);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

let handleRemoveFromWatchList = async (movieObj) => {
  try {
      let response = await fetch(`http://localhost:3000/movies/${movieObj.id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      let filteredWatchList = watchlist.filter((movie) => {
          return movie.id !== movieObj.id;
      });

      setWatchList(filteredWatchList);
      console.log(filteredWatchList);
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
};


useEffect(() => {
  const fetchWatchList = async () => {
    try {
      let response = await fetch('http://localhost:3000/movies', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      let movies = await response.json();
      setWatchList(movies);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  fetchWatchList();
}, []);



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
