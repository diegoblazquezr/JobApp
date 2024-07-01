const jobsController = require('../controllers/jobs.controllers');
const router = require('express').Router();
const { validateCreateJob, validateUpdateJob, validateDeleteJob } = require("../validators/jobs.validators");

// POST http://localhost:3000/api/jobs
router.post('/', validateCreateJob, jobsController.createJobController);
// GET http://localhost:3000/api/jobs --> All Jobs
router.get('/', jobsController.readJobsController);
// PUT http://localhost:3000/api/jobs?title='Twitter embed from website shared to twitter'
router.put('/', validateUpdateJob, jobsController.updateJobController);
// DELETE http://localhost:3000/api/jobs?title='Twitter embed from website shared to twitter'
router.delete('/', validateDeleteJob, jobsController.deleteJobController);

module.exports = router;