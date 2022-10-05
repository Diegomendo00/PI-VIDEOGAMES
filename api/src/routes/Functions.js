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
    platforms: e.platforms?.map((plat) => plat.platform.name),
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

    if (isNaN(idVideogame)) {
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
      const details = await axios.get(
        `https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`
      );
      const videogameDetails = {
        name: details.data.name,
        description: details.data.description_raw,
        image: details.data.background_image,
        platforms: details.data.parent_platforms,
        genres: details.data.genres.map((genre) => genre.name),
        rating: details.data.rating,
        released: details.data.released,
      };
      res.status(200).json(videogameDetails);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getGenres = async (req, res) => {
  try {
    const apiGenres = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genres = apiGenres.data.results.map((g) => {
      Genre.findOrCreate({
        where: { name: g.name },
      });
      return g.name;
    });
    res.status(200).json(genres);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createVideogame = async (req, res) => {
  try {
    let {
      name,
      description,
      released,
      rating,
      platforms,
      image,
      createdInDb,
      genres,
    } = req.body;
    if (
      !name ||
      !description ||
      !platforms[0] ||
      !genres[0] ||
      !rating ||
      rating < 0 ||
      rating > 5
    )
      throw new Error(
        "Check data: name, description, rating(0-5), platforms and genres are required"
      );
    const newVideogame = await Videogame.create({
      name,
      description,
      released,
      rating,
      platforms,
      image,
      createdInDb,
    });
    const videogameGenres = await Genre.findAll({
      where: { name: genres },
    });
    videogameGenres.forEach((genre) => {
      newVideogame.addGenre(genre);
    });
    res.status(200).send("Videogame created successfully");
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getPlatforms = async () => {
  const apiPlat = await axios.get(
    `https://api.rawg.io/api/platforms?key=${API_KEY}`
  );
  const apiPlatMap = apiPlat.data.results.map((v) => v.name);
  return apiPlatMap;
};

const listPlatforms = async (req, res) => {
  try {
    const plat = await getPlatforms();
    res.status(200).json(plat);
  } catch (e) {
    res.status(400).send(error.message);
  }
};

const deleteVideogame = async (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      //es uno de mi DB, ya que yo uso un hash alfanumerico en el id
      const deleteResponse = await Videogame.destroy({
        where: { id: id },
      });
      //actualizo mi DB:
      getAllVideogames();
      if (deleteResponse) {
        return res.status(200).json("Videogame deleted successfully");
      } else {
        return res.status(404).send("Videogame not found");
      }
    } else {
      return res.status(404).send("Invalid id");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateVideogame = async (req, res) => {
  try {
    const { id, name, description, rating } = req.body;
    await Videogame.update(
      {
        name,
        description,
        rating,
      },
      { where: { name } }
    );
    res.status(200).send("Videogame updated");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = {
  getAllVideogames,
  listVideogames,
  videogameDetails,
  getGenres,
  createVideogame,
  listPlatforms,
  deleteVideogame,
  updateVideogame,
};
