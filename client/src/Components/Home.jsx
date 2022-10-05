import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideogames,
  getGenres,
  filterByGenre,
  filterByCreator,
  orderByName,
  clearPage,
  filterByPlatform,
  getPlatforms,
} from "../actions";
import "./Home.css";
import Card from "./card";
import Paginado from "./paginado";
import SearchBar from "./searchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const allGenres = useSelector((state) => state.genres);
  const allPlatforms = useSelector((state) => state.platforms);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [videoGamesPerPage] = useState(15);
  const indexOfLastVideoGame = currentPage * videoGamesPerPage;
  const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamesPerPage;
  const currentVideoGames = allVideogames.slice(
    indexOfFirstVideoGame,
    indexOfLastVideoGame
  );

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  function handleClickReload(e) {
    e.preventDefault();
    dispatch(getVideogames());
  }

  const handleFilterByGenre = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByGenre(e.target.value));
  };

  const handleFilterByCreator = (e) => {
    e.preventDefault();
    dispatch(filterByCreator(e.target.value));
    setCurrentPage(1);
  };

  const handleOrderByName = (e) => {
    e.preventDefault();
    const value = e.target.value;
    if (value === "A-Z" || value === "Z-A") {
      dispatch(orderByName(value, "name"));
    } else {
      dispatch(orderByName(value, "rating"));
    }
    setCurrentPage(1);
    setOrder(`Order ${e.target.value}`);
  };

  const handleFilterByPlatforms = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByPlatform(e.target.value));
  };

  return (
    <div className="c1">
      <div className="c2">
        <Link className="hpbot1" to="/create">
          {" "}
          CREATE A VIDEOGAME{" "}
        </Link>
        <h1 className="titulo">VIDEOGAMES</h1>
        <button
          className="hpbot"
          onClick={(e) => {
            handleClickReload(e);
          }}
        >
          {" "}
          RELOAD GAMES{" "}
        </button>
      </div>
      <div className="c4">
        <SearchBar setCurrentPage={setCurrentPage} />
        <div>
          <select className="hpfilter" onChange={(e) => handleOrderByName(e)}>
            <option selected disabled>
              Order
            </option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
            <option value="0-5">0-5</option>
            <option value="5-0">5-0</option>
          </select>
          <select className="hpfilter" onChange={(e) => handleFilterByGenre(e)}>
            <option selected disabled>
              Genres
            </option>
            {allGenres.map((genre, index) => (
              <option key={index} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <select
            className="hpfilter"
            onChange={(e) => handleFilterByPlatforms(e)}
          >
            <option selected disabled>
              Platforms
            </option>
            {allPlatforms.map((platforms) => (
              <option value={platforms}>{platforms}</option>
            ))}
          </select>
          <select
            className="hpfilter"
            onChange={(e) => handleFilterByCreator(e)}
          >
            <option selected disabled>
              Games
            </option>
            <option value="api">API games</option>
            <option value="user">User games</option>
          </select>
        </div>
        <Paginado
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          videoGamesPerPage={videoGamesPerPage}
          allVideoGames={allVideogames.length}
          paginated={paginated}
        />
      </div>
      <div className="positions">
        {currentVideoGames &&
          currentVideoGames?.map((videogame, index) => {
            console.log(index, videogame);
            return (
              <Card
                createdInDb={videogame.createdInDb}
                key={index}
                name={videogame.name}
                image={videogame.image}
                genres={videogame.genres}
                id={videogame.id}
              />
            );
          })}
      </div>
    </div>
  );
}
