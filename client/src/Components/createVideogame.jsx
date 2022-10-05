import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getGenres, createVideogame, getPlatforms } from "../actions";
import "./createVideogame.css";

export default function CreateVideogame() {
  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.genres);
  const allPlatforms = useSelector((state) => state.platforms);
  const history = useHistory();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    image:
      "https://wallpaperscmscwm.azurewebsites.net/Phantom%20Black%20-%20Collection/wide.png?download",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
  });

  function handleSubmit(e) {
    e.preventDefault();
    let validacion = validate(input);
    setErrors(validacion);

    if (Object.keys(validacion).length > 0) {
      alert(
        "Check data: name, description, rating(0-5), platforms and genres are required"
      );
      return;
    }
    dispatch(createVideogame(input));
    alert(`Videogame ${input.name} has been added`);
    setInput({
      name: "",
      image:
        "https://wallpaperscmscwm.azurewebsites.net/Phantom%20Black%20-%20Collection/wide.png?download",
      description: "",
      released: "",
      rating: "",
      platforms: [],
      genres: [],
    });
    history.push("/home");
    window.location.reload();

    function validate(input) {
      let errors = {};

      if (!input.name) {
        errors.name = "Name required";
      }
      if (!input.rating) {
        errors.rating = "Rating required";
      } else if (Number(input.rating) > 5 || Number(input.rating) < 1) {
        errors.rating = "Rating number between 1 / 5";
      }
      if (/[,.]/.test(input.rating)) {
        errors.rating =
          "Wrong format for Rating. Should be a number between 0-5";
      }
      if (!input.released) {
        errors.released = "Released date is Required";
      }
      if (!input.description) {
        errors.description = "Description is Required";
      } else if (input.description.length < 10) {
        errors.description = "Your description is too short.";
      }
      if (input.genres.length < 1) {
        errors.genres = "Select a genre";
      }
      if (input.platforms.length < 1) {
        errors.platforms = "Select a Platform";
      }
      return errors;
    }
  }

  const handleFormChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenres = (e) => {
    e.preventDefault();
    const genre = e.target.value;
    if (!input.genres.includes(genre)) {
      setInput({
        ...input,
        genres: [...input.genres, genre],
      });
    }
    e.target.value = document.getElementById("gen");
  };

  const handleRemoveGenre = (e) => {
    e.preventDefault();
    const genreToRemove = e.target.name;
    setInput({
      ...input,
      genres: input.genres.filter((genre) => genre !== genreToRemove),
    });
    alert(`Genre ${e.target.name} deleted`);
  };

  const handlePlatforms = (e) => {
    e.preventDefault();
    const platform = e.target.value;
    if (!input.platforms.includes(platform)) {
      setInput({
        ...input,
        platforms: [...input.platforms, platform],
      });
    }
    e.target.value = document.getElementById("plat");
  };

  const handleRemovePlatform = (e) => {
    e.preventDefault();
    const platformToRemove = e.target.name;
    setInput({
      ...input,
      platforms: input.platforms.filter(
        (platform) => platform !== platformToRemove
      ),
    });
    alert(`Platform ${e.target.name} deleted`);
  };

  return (
    <div className="fondoform">
      <Link to="/home">
        <button className="goback2">Go back</button>
      </Link>
      <h1 className="tituloform">Create videogame</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="name" className="letraslabel">
            Name
          </label>
          <input
            className="inputname"
            type="text"
            name="name"
            maxLength={50}
            autoComplete="off"
            defaultValue={input.name}
            onChange={(e) => {
              return handleFormChange(e);
            }}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="description" className="letraslabel">
            Description
          </label>
          <textarea
            className="inputdes"
            cols={30}
            rows={8}
            maxLength={300}
            placeholder="Describe your game, 300 characters max"
            type="text"
            name="description"
            autoComplete="off"
            defaultValue={input.description}
            onChange={(e) => handleFormChange(e)}
            required
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="released" className="letraslabel">
            Released date
          </label>
          <input
            className="inputda"
            type="date"
            name="released"
            autoComplete="off"
            defaultValue={input.released}
            onChange={(e) => handleFormChange(e)}
          />
          {errors.released && <p className="error">{errors.released}</p>}
        </div>
        <div>
          <label htmlFor="rating" className="letraslabel">
            Rating
          </label>
          <input
            className="inputda"
            type="number"
            name="rating"
            min={1}
            max={5}
            autoComplete="off"
            defaultValue={input.rating}
            onChange={(e) => handleFormChange(e)}
          />
          {errors.rating && <p className="error">{errors.rating}</p>}
        </div>

        <div className="inputline1">
          <label>Platforms</label>
          <select className="inputplat" onChange={(e) => handlePlatforms(e)}>
            <option id="plat" selected disabled>
              Platforms
            </option>
            {allPlatforms.map((platform) => (
              <option key={platform} defaultValue={platform}>
                {" "}
                {platform}{" "}
              </option>
            ))}
          </select>
          <ul>
            {input.platforms?.map((platform, index) => (
              <li className="lista">
                <button
                  className="goback1"
                  key={index}
                  name={platform}
                  onClick={(e) => handleRemovePlatform(e)}
                >
                  {platform}
                </button>
              </li>
            ))}
            {errors.platforms && <p className="error">{errors.platforms}</p>}
          </ul>
        </div>

        <div className="inputaline2">
          <label>Genres</label>
          <select className="inputgenre" onChange={(e) => handleGenres(e)}>
            <option id="gen" selected disabled>
              Genres
            </option>
            {allGenres.map((genre, index) => (
              <option key={index} defaultValue={genre}>
                {genre}
              </option>
            ))}
          </select>
          <ul>
            {input.genres?.map((genre, index) => (
              <li className="lista">
                <button
                  className="goback1"
                  key={index}
                  name={genre}
                  onClick={(e) => handleRemoveGenre(e)}
                >
                  {genre}
                </button>
              </li>
            ))}
            {errors.genres && <p className="error">{errors.genres}</p>}
          </ul>
        </div>
        <button
          className="goback2"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Create
        </button>
      </form>
    </div>
  );
}
