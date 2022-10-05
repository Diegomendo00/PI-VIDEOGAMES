const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  listVideogames,
  videogameDetails,
  getGenres,
  createVideogame,
  listPlatforms,
  deleteVideogame,
  updateVideogame,
} = require("./Functions");

const router = Router();

router.get("/videogames", listVideogames);
router.get("/videogames/:idVideogame", videogameDetails);
router.get("/genres", getGenres);
router.get("/platforms", listPlatforms);
router.post("/videogames", createVideogame);

router.delete("/videogames/delete/:id", deleteVideogame);
router.put("/videogames/update", updateVideogame);

module.exports = router;
