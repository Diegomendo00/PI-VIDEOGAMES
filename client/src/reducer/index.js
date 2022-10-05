import {
  GET_VIDEOGAMES,
  GET_GENRES,
  GET_NAME_VIDEOGAME,
  GET_DETAILS,
  CLEAR_PAGE,
  FILTER_BY_GENRE,
  FILTER_BY_CREATOR,
  ORDER_BY_NAME,
  GET_PLATFORMS,
  FILTER_BY_PLATFORM,
} from "../actions";

const initialState = {
  videogames: [],
  allVideogames: [],
  genres: [],
  platforms: [],
  videogameDetails: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES: {
      let videogames = action.payload;
      videogames.forEach((videogame) => {
        videogame.genres = videogame.createdInDb
          ? videogame.genres.map((genre) => genre.name)
          : videogame.genres;
      });
      return {
        ...state,
        allVideogames: action.payload,
        videogames: action.payload,
      };
    }

    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };

    case GET_NAME_VIDEOGAME: {
      const gameName = state.allVideogames;
      let videoName = gameName.filter((v) => {
        return v.name
          .toLowerCase()
          .trim()
          .includes(action.payload.toLowerCase().trim());
      });
      return {
        ...state,
        videogames: videoName,
      };
    }
    case GET_DETAILS:
      return {
        ...state,
        videogameDetails: action.payload,
      };
    case CLEAR_PAGE:
      return {
        ...state,
        videogameDetails: [],
      };
    case FILTER_BY_GENRE: {
      const allVideogames = state.allVideogames;
      const videogamesByGenres = allVideogames.filter((videogame) =>
        videogame.genres.includes(action.payload)
      );
      return {
        ...state,
        videogames: videogamesByGenres,
      };
    }
    case FILTER_BY_CREATOR: {
      const allVideogames = state.allVideogames;
      const createdByUser = action.payload === "user" ? true : undefined;
      let videogamesByCreator = allVideogames.filter(
        (videogame) => videogame.createdInDb === createdByUser
      );
      return {
        ...state,
        videogames: videogamesByCreator,
      };
    }
    case ORDER_BY_NAME: {
      const sortType = action.payload[0];
      const compareProp = action.payload[1];
      const allVideogames = state.allVideogames;
      let sortedVideogames = [];
      if (sortType === "A-Z" || sortType === "0-5") {
        //Ascendente
        sortedVideogames = allVideogames.sort(function (a, b) {
          if (a[compareProp] > b[compareProp]) {
            return 1;
          }
          if (b[compareProp] > a[compareProp]) {
            return -1;
          }
          return 0;
        });
      } else {
        sortedVideogames = allVideogames.sort(function (a, b) {
          if (a[compareProp] > b[compareProp]) {
            return -1;
          }
          if (b[compareProp] > a[compareProp]) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        videogames: sortedVideogames,
      };
    }
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };
    case FILTER_BY_PLATFORM:
      const platforms = state.allVideogames;
      const filterPlat = platforms.filter((plat) =>
        plat.platforms.includes(action.payload)
      );
      return {
        ...state,
        videogames: filterPlat,
      };

    default:
      return state;
  }
}
