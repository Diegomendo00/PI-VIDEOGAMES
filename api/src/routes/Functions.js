const axios = require("axios");
const { Genre, Videogame } = require("../db");
const { API_KEY } = process.env;

const getApiInfo = async () => {
  let getInfo = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=40&page=`;
  let apiInfo = [];
  await Promise.all([
    axios.get(getInfo + 1),
    axios.get(getInfo + 2),
    axios.get(getInfo + 3),
  ]).then((responses) => {
    apiInfo = responses[0].data.results
      .concat(responses[1].data.results)
      .concat(responses[2].data.results);
  });
  return apiInfo.map((e) => ({
    id: e.id,
    name: e.name,
    image: e.background_image,
    genres: e.genres?.map((genre) => genre.name),
    rating: e.rating,
  }));
};

const getDbInfo = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllVideogames = async () => {
  let apiInfo = await getApiInfo();
  let dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

const listVideogames = async (req, res) => {
  try {
    const videogames = await getAllVideogames();
    const { name } = req.query;
    if (name) {
      let videogame = videogames.filter((game) =>
        game.name.toLowerCase().includes(name.toLowerCase())
      );
      videogame = videogame.slice(0, 15);
      videogame[0]
        ? res.status(200).json(videogame)
        : res
            .status(404)
            .send(`There are no games with "${name}" on its title`);
    } else {
      res.status(200).json(videogames);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const videogameDetails = async (req, res) => {
  try {
    const { idVideogame } = req.params;
    //Diferencio entre videogames de API y DB porque los de DB tienen genres con otro formato
    if (isNaN(idVideogame)) {
      //es uno de mi DB, ya que yo uso un hash alfanumerico en el id
      const videogameDetails = await Videogame.findOne({
        where: { id: idVideogame },
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });
      res.status(200).json(videogameDetails);
    } else {
      const detailsRequest = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
      );
      const videogameDetails = {
        name: detailsRequest.data.name,
        description: detailsRequest.data.description_raw,
        image: detailsRequest.data.background_image,
        platforms: detailsRequest.data.parent_platforms,
        genres: detailsRequest.data.genres.map((genre) => genre.name),
        rating: detailsRequest.data.rating,
        released: detailsRequest.data.released,
      };
      res.status(200).json(videogameDetails);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = { getAllVideogames, listVideogames, videogameDetails };
