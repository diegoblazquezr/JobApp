const { body, param, query } = require('express-validator');

const validateCreateJob = [
    body('title')
        .exists().withMessage('Title of job is required')
        .isString().withMessage('Title should be a string'),
    body('description')
        .exists().withMessage('Job description is required')
        .isString().withMessage('Description should be a string'),
    body('skills')
        .exists().withMessage('Skills are required')
        .isString().withMessage('Skills should be a string'),
    body('client_location')
        .exists().withMessage('Location is required')
        .isString().withMessage('Location should be a string')
];

const validateDeleteJob = [
    query('title').notEmpty().withMessage('Title should exist to delete a job')
];

const validateListJobs = [
    query('skills')
        .notEmpty().withMessage('Skills required')
        .isString().withMessage('Skills should be a string')
];

const validateUpdateJob = [
    body('title')
        .exists().withMessage('Title of job is required')
        .isString().withMessage('Title should be a string'),
    body('description')
        .exists().withMessage('Job description is required')
        .isString().withMessage('Description should be a string'),
    body('skills')
        .exists().withMessage('Skills required')
        .isString().withMessage('Skills should be a string'),
    body('old_title')
        .exists().withMessage('Old title is required')
        .isString().withMessage('Old title should be a string')
];

module.exports = {
    validateCreateJob,
    validateDeleteJob,
    validateListJobs,
    validateUpdateJob
};