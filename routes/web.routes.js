const webController = require('../controllers/web.controllers');
const router = require('express').Router();

// GET http://localhost::3000/
router.get("/", webController.getHome);
router.get("/scraper", webController.getScraping);
router.get("/signup", webController.getSignup);
router.get("/login", webController.getLogin);
router.get("/favorites", webController.getFavorites);
router.get("/profile", webController.getProfile);
router.get("/users", webController.getUsers);
router.get("/dashboard", webController.getDashboard);

module.exports = router;
