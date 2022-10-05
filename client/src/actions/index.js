import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_GENRES = "GET_GENRES";
export const GET_NAME_VIDEOGAME = "GET_NAME_VIDEOGAME";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAR_PAGE = "CLEAR_PAGE";
export const FILTER_BY_GENRE = "FILTER_BY_GENRE";
export const FILTER_BY_CREATOR = "FILTER_BY_CREATOR";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const FILTER_BY_PLATFORM = "FILTER_BY_PLATFORM";

export function getVideogames() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/videogames");
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: json.data,
    });
  };
}

export const getGenres = () => {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/genres`);
    return dispatch({
      type: GET_GENRES,
      payload: json.data,
    });
  };
};

export const getNameVideogame = (name) => {
  return async function (dispatch) {
    try {
      return dispatch({
        type: GET_NAME_VIDEOGAME,
        payload: name,
      });
    } catch (error) {
      return alert("Doesn't exist");
    }
  };
};

export function getDetails(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/videogames/${id}`);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      return error.message;
    }
  };
}

export function clearPage() {
  return {
    type: CLEAR_PAGE,
  };
}

export const filterByGenre = (genre) => {
  return {
    type: FILTER_BY_GENRE,
    payload: genre,
  };
};

export const filterByCreator = (creator) => {
  return {
    type: FILTER_BY_CREATOR,
    payload: creator,
  };
};

// Recibo un orderType, asc o desc y compareProp es la propiedad
// la cual voy a comparar, ya sea name o rating
export const orderByName = (orderType, compareProp) => {
  return {
    type: ORDER_BY_NAME,
    payload: [orderType, compareProp],
  };
};

export const getPlatforms = () => {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/platforms`);
    return dispatch({
      type: GET_PLATFORMS,
      payload: json.data,
    });
  };
};

export function createVideogame(payload) {
  return async function () {
    try {
      const creado = await axios.post(
        "http://localhost:3001/videogames",
        payload
      );
      return creado;
    } catch (error) {
      console.log("mensaje del back:", error.message);
      throw new Error(error);
    }
  };
}

export const filterByPlatform = (platform) => {
  return {
    type: FILTER_BY_PLATFORM,
    payload: platform,
  };
};
