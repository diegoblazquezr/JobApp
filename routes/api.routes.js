const apiController = require('../controllers/api.controllers');
const router = require('express').Router();
const { validateCreateJob, validateUpdateJob, validateDeleteJob } = require("../validators/jobs.validators");

// GET http://localhost::3000/
// router.post("/api/user", apiController.postUser);
// router.put("/api/user", apiController.putUser);
// router.delete("/api/user", apiController.deleteUser);
// router.post("/api/login", apiController.postLogin);
// router.post("/api/logout", apiController.postLogout);
router.get('/', apiController.listJobsController);
router.post('/', validateCreateJob, apiController.createJobController);
router.put('/', validateUpdateJob, apiController.updateJobController);
router.delete('/', validateDeleteJob, apiController.deleteJobController);
// router.post("/api/favorites", apiController.postFavorites);
// router.delete("/api/favorites", apiController.deleteFavorites);
// router.get("/recoverpassword", apiController.recoverPassword);
// router.get("/restorepassword", apiController.restorePassword);

module.exports = router;


// GET http://localhost:3000/api/jobs --> ALL

// PUT http://localhost:3000/api/jobs?title='Twitter embed from website shared to twitter'

// POST http://localhost:3000/api/jobs
// ejemplo para POST:
// {
//     "title": "Need an online database with different users login",
//     "description": "Need a small customized database that will have different levels of users permission based login. database was initially developed in MS Access. Now need a cloud based version.",
//     "skills": "PHP, Python, MySQL, JavaScript",
//     "clientLocation": "United States"
// };