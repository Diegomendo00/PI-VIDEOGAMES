import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

export default function Card({ name, genres, image, id }) {
  return (
    <div className="container">
      <div className="card">
        <div>
          <img className="imag" src={image} alt="not found" />
          <Link to={`/detail/${id}`}>
            <h3 className="name">{name}</h3>
          </Link>
        </div>
        <div>
          {genres?.map((genre, index) => (
            <button className="genresb" key={index}>
              {genre}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
