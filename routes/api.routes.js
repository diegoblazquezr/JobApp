const apiController = require('../controllers/api.controllers');
const router = require('express').Router();
const { validateCreateJob, validateUpdateJob, validateDeleteJob } = require("../validators/jobs.validators");
const { validateCreateUser, validateUpdateUser, validateDeleteUser } = require("../validators/users.validators");
const { validateCreateFavorite, validateDeleteFavorite } = require("../validators/favorites.validators");

// POST http://localhost:3000/api/user
router.post("/user", validateCreateUser, apiController.createUserController);
// GET http://localhost:3000/api/user
router.get("/user", apiController.readUsersController);
// PUT http://localhost:3000/api/user
router.put("/user", validateUpdateUser, apiController.updateUserController);
// DELETE http://localhost:3000/api/user?email=prueba2@gmail.com
router.delete("/user", validateDeleteUser, apiController.deleteUserController);

// router.post("/api/login", apiController.postLogin);
// router.post("/api/logout", apiController.postLogout);

// POST http://localhost:3000/api/jobs
router.post('/jobs', validateCreateJob, apiController.createJobController);
// GET http://localhost:3000/api/jobs --> All Jobs
router.get('/jobs', apiController.readJobsController);
// PUT http://localhost:3000/api/jobs?title='Twitter embed from website shared to twitter'
router.put('/jobs', validateUpdateJob, apiController.updateJobController);
// DELETE http://localhost:3000/api/jobs?title='Twitter embed from website shared to twitter'
router.delete('/jobs', validateDeleteJob, apiController.deleteJobController);

// POST http://localhost:3000/api/favorites
router.post("/favorites", validateCreateFavorite, apiController.createFavoriteController);
// GET http://localhost:3000/api/favorites
router.get("/favorites", apiController.readFavoritesController);
// DELETE http://localhost:3000/api/favorites?user_id=4&job_id=2
router.delete("/favorites", validateDeleteFavorite, apiController.deleteFavoriteController);

// router.get("/recoverpassword", apiController.recoverPassword);
// router.get("/restorepassword", apiController.restorePassword);

module.exports = router;