const apiController = require('../controllers/api.controllers');
const router = require('express').Router();
const { validateCreateJob, validateUpdateJob, validateDeleteJob } = require("../validators/jobs.validators");

// router.post("/api/user", apiController.postUser);
// router.put("/api/user", apiController.putUser);
// router.delete("/api/user", apiController.deleteUser);
// router.post("/api/login", apiController.postLogin);
// router.post("/api/logout", apiController.postLogout);


// GET http://localhost:3000/api/jobs --> All Jobs
router.get('/', apiController.readJobsController);
// POST http://localhost:3000/api/jobs
router.post('/', validateCreateJob, apiController.createJobController);
// PUT http://localhost:3000/api/jobs?title='Twitter embed from website shared to twitter'
router.put('/', validateUpdateJob, apiController.updateJobController);
// DELETE http://localhost:3000/api/jobs?title='Twitter embed from website shared to twitter'
router.delete('/', validateDeleteJob, apiController.deleteJobController);

// router.post("/api/favorites", apiController.postFavorites);
// router.delete("/api/favorites", apiController.deleteFavorites);
// router.get("/recoverpassword", apiController.recoverPassword);
// router.get("/restorepassword", apiController.restorePassword);

module.exports = router;