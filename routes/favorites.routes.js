const favoritesController = require('../controllers/favorites.controllers');
const router = require('express').Router();
const { validateCreateFavorite, validateDeleteFavorite } = require("../validators/favorites.validators");


// POST http://localhost:3000/api/favorites
router.post("/", validateCreateFavorite, favoritesController.createFavoriteController);
// GET http://localhost:3000/api/favorites
router.get("/", favoritesController.readFavoritesController);
// DELETE http://localhost:3000/api/favorites?user_id=4&job_id=2
router.delete("/", validateDeleteFavorite, favoritesController.deleteFavoriteController);

module.exports = router;