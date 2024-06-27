import React, { useEffect, useState } from "react";
import genreids from "../Utility/genreids";
function Watchlist({ watchlist , setWatchList , handleRemoveFromWatchList}) {
  const [search, setSearch] = useState("");
  const [genrelist , setGenreList] = useState(['All Genre'])
  const [currGenre, setCurrGenre] = useState('All Genre')
  let handlesearch = (e) => {
    setSearch(e.target.value);
  };
 let sortIncreasing = ()=>{
       let sortedIncreasing=watchlist.sort((movieA, movieB)=>{
        return movieA.vote_average - movieB.vote_average
       })
       setWatchList([...sortedIncreasing])
 }

 let sortDecreasing = ()=>{
  let sortedDecreasing=watchlist.sort((movieA, movieB)=>{
    return movieA.vote_average - movieB.vote_average
   })
   setWatchList([...sortedDecreasing])
 }
 let handleFilter = (genre)=>{
  setCurrGenre(genre)
 }

 useEffect(()=>{
  let temp = watchlist.map((movieObj)=>{
     return genreids[movieObj.genre_ids[0]]
     
  })
  temp = new Set(temp)
  setGenreList(['All Genre', ...temp])
 }, [watchlist])

  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        {genrelist.map((genre)=>{
          return <div onClick={()=>handleFilter(genre)} className={currGenre===genre?"flex justify-center items-center bg-blue-400 h-[3rem] w-[9rem] rounded-xl text-white font-bold mx-4":"flex justify-center items-center bg-gray-500/40 h-[3rem] w-[9rem] rounded-xl text-white font-bold mx-4"}>
          {genre}
        </div>

        })}

      </div>
      <div className="flex justify-center my-4 ">
        <input
          onChange={handlesearch}
          className="bg-gray-200  h-[2rem] w-[15rem] px-4 outlier-none"
          type="text"
          value={search}
          placeholder="Search Movies"
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-600 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Name</th>
              <th className="flex justify-center">
             
                <div onClick={sortIncreasing} className="p-2">
                  <i class="fa-solid fa-arrow-up"></i>
                </div>
               <div className="p-2">Rating </div> 
                <div onClick={sortDecreasing} className="p-2">
                  <i class="fa-solid fa-arrow-down"></i>
                </div>
             
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>

          <tbody>
            {watchlist.filter((movieObj)=>{
           
              if(currGenre=='All Genre'){
                return true
              }
              else{
                return genreids[movieObj.genre_ids[0]]==currGenre;
              }
            })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr key={movieObj.id} className="border-b-2">
                    <td className="flex items-center px-6 py-4">
                      <img
                        className="h-[5rem] w-[10rem]"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.backdrop_path}`}
                      ></img>
                      <div className="m-8 px-2 font-bold">
                        {" "}
                        {movieObj.original_title}{" "}
                      </div>
                    </td>
                    <td> {movieObj.vote_average} </td>
                    <td> {movieObj.popularity}</td>
                    <td> {genreids[movieObj.genre_ids[0]]} </td>
                    <td onClick={()=>handleRemoveFromWatchList(movieObj)} className="text-red-800 font-bold "> Delete</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
