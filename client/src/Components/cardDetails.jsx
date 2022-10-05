import { React, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, clearPage } from "../actions";
import "./cardDetails.css";

export default function CardDetails() {
  const dispatch = useDispatch();
  const { idVideogame } = useParams();
  const videogame = useSelector((state) => state.videogameDetails);

  useEffect(() => {
    dispatch(clearPage());
    dispatch(getDetails(idVideogame));
  }, [dispatch, idVideogame]);

  return videogame && videogame.image ? (
    <div className="conteiner">
      <div className="botonatras">
        <Link to="/home">
          <button className="goback">Go back</button>
        </Link>
      </div>
      <div className="title">
        <h2>{videogame.name}</h2>
        <h3>Release date: {videogame.released}</h3>
        <h3>Rating: {videogame.rating} / 5 </h3>
      </div>

      <div className="imageAndDescription1">
        <img
          className="imagen"
          src={videogame.image}
          alt="videogame"
          width="400px"
          height="200px"
        />
      </div>
      <div className="imageAndDescription">
        <p className="descri">{videogame.description}</p>
        <p>{videogame.createdInDb ? videogame.description : false} </p>
      </div>
      <div>
        {videogame.platforms?.map((platform, index) => {
          let parsedPlatform = platform;
          if (!videogame.createdInDb) {
            parsedPlatform = parsedPlatform.platform.name;
          }
          return (
            <button className="videogames" name={parsedPlatform} key={index}>
              {parsedPlatform}
            </button>
          );
        })}
      </div>

      <div>
        {videogame.genres?.map((genre, index) => {
          let parsedGenre = genre;
          if (videogame.createdInDb) {
            parsedGenre = parsedGenre.name;
          }
          return (
            <button className="genres" name={parsedGenre} key={index}>
              {parsedGenre}
            </button>
          );
        })}
      </div>
    </div>
  ) : (
    <div>
      <img
        className="imge"
        src="https://popcorngame.fr/wp-content/uploads/2019/03/Test-gif-loading.gif"
        alt="not found"
      />
      <h1 className="titl">Loading...</h1>
    </div>
  );
}
