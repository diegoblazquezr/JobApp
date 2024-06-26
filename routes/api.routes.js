const apiController = require('../controllers/api.controllers');
const router = require('express').Router();

// GET http://localhost::3000/
router.post("/api/user", apiController.postUser);
router.put("/api/user", apiController.putUser);
router.delete("/api/user", apiController.deleteUser);
router.post("/api/login", apiController.postLogin);
router.post("/api/logout", apiController.postLogout);
router.get("/api/search", apiController.getSearch);
router.post("/api/ads", apiController.postAds);
router.put("/api/ads", apiController.putAds);
router.delete("/api/ads", apiController.deleteAds);
router.post("/api/favorites", apiController.postFavorites);
router.delete("/api/favorites", apiController.deleteFavorites);
router.get("/recoverpassword", apiController.recoverPassword);
router.get("/restorepassword", apiController.restorePassword);

module.exports = router;
