const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { getAllVideogames, listVideogames, videogameDetails } = require("./Functions");

const router = Router();

router.get("/videogames", getAllVideogames);
router.get("/videogames", listVideogames);
router.get("/videogames/:idvideogame", videogameDetails);

module.exports = router;
