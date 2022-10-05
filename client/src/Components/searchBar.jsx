import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideogame } from "../actions";
import "./searchBar.css";

export default function SearchBar({ setCurrentPage }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return alert("Write a videogame's name");
    dispatch(getNameVideogame(name));
    setName("");
    setCurrentPage(1);
  }

  return (
    <div className="style">
      <input
        id="input"
        className="input1"
        type="text"
        autoComplete="off"
        value={name}
        placeholder="Videogame . . ."
        onChange={(e) => handleInputChange(e)}
      />
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
        className="buttonbuscar"
      >
        Search
      </button>
    </div>
  );
}
